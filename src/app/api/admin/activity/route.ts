import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth, getAuthUser } from '@/middleware/auth-middleware';

export const GET = withAuth(async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const type = searchParams.get('type'); // Filter by activity type

        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = {};
        if (type) {
            where.type = type;
        }

        // Get lead activities (as proxy for system activity)
        // In production, you'd have a dedicated activity/audit log table
        const [activities, total] = await Promise.all([
            prisma.leadActivity.findMany({
                where,
                skip,
                take: limit,
                include: {
                    lead: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.leadActivity.count({ where })
        ]);

        // Format activities for display
        const formattedActivities = activities.map(activity => ({
            id: activity.id,
            type: activity.type,
            action: activity.action,
            details: activity.details,
            performedBy: activity.performedBy,
            lead: activity.lead,
            metadata: activity.metadata,
            timestamp: activity.createdAt
        }));

        return NextResponse.json({
            activities: formattedActivities,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Activity log error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch activity log' },
            { status: 500 }
        );
    }
}, {
    requiredRole: 'ADMIN'
});
