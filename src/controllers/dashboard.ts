import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { prisma } from '../lib/prisma';
import { serverOnly } from '../utils/server-only';

// Get dashboard statistics
export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Get user's campaigns stats
        const [totalCampaigns, activeCampaigns, completedCampaigns] = await Promise.all([
            prisma.campaign.count({
                where: { userId: req.user.id }
            }),
            prisma.campaign.count({
                where: {
                    userId: req.user.id,
                    status: 'ACTIVE'
                }
            }),
            prisma.campaign.count({
                where: {
                    userId: req.user.id,
                    status: 'COMPLETED'
                }
            })
        ]);

        // Get user's cohorts stats
        const totalCohorts = await prisma.cohort.count({
            where: { userId: req.user.id }
        });

        // Calculate total budget spent (simplified)
        const campaigns = await prisma.campaign.findMany({
            where: { userId: req.user.id },
            select: { budget: true }
        });

        const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);

        res.json({
            totalCampaigns,
            activeCampaigns,
            completedCampaigns,
            totalCohorts,
            totalBudget: parseFloat(totalBudget.toFixed(2)),
            avgROAS: 3.2, // This would come from actual performance data
            avgCTR: 2.8 // This would come from actual performance data
        });
    } catch (error) {
        next(error);
    }
};

// Get recent activity
export const getRecentActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // For now, we'll return mock activity data
        // In a real implementation, this would come from actual user actions
        const activity = [
            {
                id: '1',
                action: 'Campaign Created',
                target: 'Summer Sale 2023',
                user: req.user.name,
                time: '1 hour ago',
                icon: 'Plus',
                iconClass: 'bg-green-100 text-green-600',
            },
            {
                id: '2',
                action: 'Cohort Updated',
                target: 'High-Value Customers',
                user: req.user.name,
                time: '3 hours ago',
                icon: 'Users',
                iconClass: 'bg-blue-100 text-blue-600',
            },
            {
                id: '3',
                action: 'Campaign Edited',
                target: 'Brand Awareness Q3',
                user: req.user.name,
                time: '5 hours ago',
                icon: 'Edit',
                iconClass: 'bg-amber-100 text-amber-600',
            },
            {
                id: '4',
                action: 'Schedule Updated',
                target: 'Product Launch',
                user: req.user.name,
                time: '1 day ago',
                icon: 'Calendar',
                iconClass: 'bg-purple-100 text-purple-600',
            }
        ];

        res.json(activity);
    } catch (error) {
        next(error);
    }
};