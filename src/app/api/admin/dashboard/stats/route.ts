import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/middleware/auth-middleware';

export const GET = withAuth(async (req) => {
    try {
        // Get statistics in parallel
        const [
            totalUsers,
            activeUsers,
            totalCampaigns,
            activeCampaigns,
            totalLeads,
            qualifiedLeads,
            totalProjects,
            activeProjects,
            recentUsers,
            recentLeads
        ] = await Promise.all([
            // User stats
            prisma.user.count(),
            prisma.user.count({ where: { status: 'ACTIVE' } }),

            // Campaign stats
            prisma.campaign.count(),
            prisma.campaign.count({ where: { status: 'ACTIVE' } }),

            // Lead stats
            prisma.lead.count(),
            prisma.lead.count({ where: { status: 'QUALIFIED' } }),

            // Project stats
            prisma.project.count(),
            prisma.project.count({ where: { status: 'ACTIVE' } }),

            // Recent activity
            prisma.user.count({
                where: {
                    createdAt: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
                    }
                }
            }),
            prisma.lead.count({
                where: {
                    createdAt: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
                    }
                }
            })
        ]);

        // Calculate growth percentages (mock for demonstration)
        // In production, compare with previous period
        const stats = {
            users: {
                total: totalUsers,
                active: activeUsers,
                inactive: totalUsers - activeUsers,
                growth: ((recentUsers / (totalUsers || 1)) * 100).toFixed(1),
                recentSignups: recentUsers
            },
            campaigns: {
                total: totalCampaigns,
                active: activeCampaigns,
                draft: totalCampaigns - activeCampaigns,
                completed: 0 // TODO: Add completed campaigns count
            },
            leads: {
                total: totalLeads,
                qualified: qualifiedLeads,
                new: totalLeads - qualifiedLeads,
                growth: ((recentLeads / (totalLeads || 1)) * 100).toFixed(1),
                recentLeads
            },
            projects: {
                total: totalProjects,
                active: activeProjects,
                completed: 0 // TODO: Add completed count
            },
            system: {
                databaseConnected: true,
                apiVersion: '1.0.0',
                uptime: process.uptime(),
                timestamp: new Date().toISOString()
            }
        };

        return NextResponse.json({ stats });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard statistics' },
            { status: 500 }
        );
    }
}, {
    requiredRole: 'ADMIN'
});
