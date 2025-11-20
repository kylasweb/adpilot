import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Helper function to wrap async route handlers
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// GET /api/billing/:userId - Get subscription for a user
router.get('/:userId', asyncHandler(async (req: Request, res: Response) => {
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
}));

// GET /api/billing/invoices/:userId - Get invoices for a user
router.get('/invoices/:userId', asyncHandler(async (req: Request, res: Response) => {
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
}));

// GET /api/billing/usage/:userId - Get usage metrics
router.get('/usage/:userId', asyncHandler(async (req: Request, res: Response) => {
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
}));

export default router;