import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/billing/:userId - Get subscription for a user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const subscription = await (prisma as any).subscription.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                },
                invoices: {
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });

        if (!subscription) {
            return res.json({
                userId,
                plan: 'FREE',
                status: 'ACTIVE',
                invoices: []
            });
        }

        res.json(subscription);
    } catch (error) {
        console.error('Error fetching subscription:', error);
        res.status(500).json({ error: 'Failed to fetch subscription' });
    }
});

// GET /api/billing/invoices/:userId - Get invoices for a user
router.get('/invoices/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = '1', limit = '20' } = req.query;

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const subscription = await (prisma as any).subscription.findUnique({
            where: { userId }
        });

        if (!subscription) {
            return res.json({
                invoices: [],
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total: 0,
                    totalPages: 0
                }
            });
        }

        const [invoices, total] = await Promise.all([
            (prisma as any).invoice.findMany({
                where: { subscriptionId: subscription.id },
                skip,
                take: limitNum,
                orderBy: { createdAt: 'desc' }
            }),
            (prisma as any).invoice.count({
                where: { subscriptionId: subscription.id }
            })
        ]);

        res.json({
            invoices,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});

// GET /api/billing/usage/:userId - Get usage metrics
router.get('/usage/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const stats = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                _count: {
                    select: {
                        campaigns: true,
                        cohorts: true,
                        creatives: true,
                        projects: true
                    }
                }
            }
        });

        if (!stats) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get subscription plan (with type assertion until migration runs)
        const subscription = await (prisma as any).subscription?.findUnique({
            where: { userId },
            select: { plan: true }
        });

        const plan = subscription?.plan || 'FREE';
        const limits = {
            FREE: { campaigns: 5, cohorts: 3, creatives: 10, projects: 2 },
            STARTER: { campaigns: 20, cohorts: 10, creatives: 50, projects: 10 },
            PROFESSIONAL: { campaigns: 100, cohorts: 50, creatives: 500, projects: 50 },
            ENTERPRISE: { campaigns: -1, cohorts: -1, creatives: -1, projects: -1 }
        };

        const currentLimits = limits[plan as keyof typeof limits] || limits.FREE;

        res.json({
            usage: stats._count,
            limits: currentLimits,
            plan
        });
    } catch (error) {
        console.error('Error fetching usage:', error);
        res.status(500).json({ error: 'Failed to fetch usage' });
    }
});

export default router;
