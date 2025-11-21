import express, { Request, Response, NextFunction } from 'express';
import type { AuthRequest } from '@/types/express-types';
import { PrismaClient } from '@prisma/client';
import { authorize } from '../middleware/authorize';

const router = express.Router();
const prisma = new PrismaClient();

// Apply authentication middleware to all routes
router.use(authorize());

// Helper function to wrap async route handlers
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// Simple logging middleware for this route
const logAccess = (resource: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authReq = req as AuthRequest;
        if (authReq.user) {
            console.log(`[AUDIT] ${new Date().toISOString()} - User ${authReq.user.email} accessed ${resource} - Method: ${req.method} - Path: ${req.path}`);
        }
        next();
    };
};

// GET /api/acsp-campaigns - Get all campaigns
router.get('/', logAccess('campaigns'), asyncHandler(async (req: Request, res: Response) => {
    const { status, type, page = '1', limit = '20' } = req.query;

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [campaigns, total] = await Promise.all([
        prisma.aCSPCampaign.findMany({
            where,
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        leads: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limitNum
        }),
        prisma.aCSPCampaign.count({ where })
    ]);

    res.json({
        data: campaigns,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages: Math.ceil(total / limitNum)
        }
    });
}));

// GET /api/acsp-campaigns/stats - Get campaign statistics
router.get('/stats', logAccess('campaign-stats'), asyncHandler(async (req: Request, res: Response) => {
    const [
        activeCampaigns,
        totalCalls,
        avgSuccessRate
    ] = await Promise.all([
        prisma.aCSPCampaign.count({ where: { status: 'ACTIVE' } }),
        prisma.aCSPCampaign.aggregate({
            _sum: { totalContacts: true }
        }),
        prisma.aCSPCampaign.aggregate({
            _avg: { successRate: true }
        })
    ]);

    const successfulContacts = await prisma.aCSPCampaign.aggregate({
        _sum: { successfulContacts: true }
    });

    res.json({
        activeCampaigns,
        totalCalls: totalCalls._sum.totalContacts || 0,
        successRate: avgSuccessRate._avg.successRate || 0,
        leadsConverted: successfulContacts._sum.successfulContacts || 0
    });
}));

// GET /api/acsp-campaigns/:id - Get single campaign
router.get('/:id', logAccess('campaign-detail'), asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const campaign = await prisma.aCSPCampaign.findUnique({
        where: { id },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            leads: {
                include: {
                    lead: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            score: true
                        }
                    }
                }
            }
        }
    });

    if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(campaign);
}));

// POST /api/acsp-campaigns - Create new campaign
router.post('/', asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        type,
        targetSegment,
        goal,
        scriptInstructions,
        maxContactsPerDay,
        priority,
        leadIds
    } = req.body;

    if (!name || !type || !targetSegment) {
        return res.status(400).json({
            error: 'Missing required fields: name, type, targetSegment'
        });
    }

    // Cast req to access user
    const authReq = req as AuthRequest;

    const campaign = await prisma.aCSPCampaign.create({
        data: {
            name,
            type,
            targetSegment,
            goal,
            scriptInstructions,
            maxContactsPerDay,
            priority,
            status: 'DRAFT',
            createdBy: authReq.user!.id
        }
    });

    // Add leads to campaign if provided
    if (leadIds && Array.isArray(leadIds) && leadIds.length > 0) {
        await prisma.campaignLead.createMany({
            data: leadIds.map((leadId: string) => ({
                campaignId: campaign.id,
                leadId
            }))
        });

        // Update campaign contact count
        await prisma.aCSPCampaign.update({
            where: { id: campaign.id },
            data: { totalContacts: leadIds.length }
        });
    }

    res.status(201).json(campaign);
}));

// PUT /api/acsp-campaigns/:id - Update campaign
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const campaign = await prisma.aCSPCampaign.update({
        where: { id },
        data: updateData
    });

    res.json(campaign);
}));

// POST /api/acsp-campaigns/:id/launch - Launch campaign
router.post('/:id/launch', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const campaign = await prisma.aCSPCampaign.update({
        where: { id },
        data: { status: 'ACTIVE' }
    });

    res.json({ message: 'Campaign launched successfully', campaign });
}));

// POST /api/acsp-campaigns/:id/pause - Pause campaign
router.post('/:id/pause', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const campaign = await prisma.aCSPCampaign.update({
        where: { id },
        data: { status: 'PAUSED' }
    });

    res.json({ message: 'Campaign paused successfully', campaign });
}));

// POST /api/acsp-campaigns/:id/leads - Add leads to campaign
router.post('/:id/leads', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { leadIds } = req.body;

    if (!leadIds || !Array.isArray(leadIds)) {
        return res.status(400).json({ error: 'leadIds array is required' });
    }

    // Add leads to campaign
    await prisma.campaignLead.createMany({
        data: leadIds.map((leadId: string) => ({
            campaignId: id,
            leadId
        })),
        skipDuplicates: true
    });

    // Update campaign contact count
    const campaign = await prisma.aCSPCampaign.findUnique({
        where: { id },
        select: { totalContacts: true }
    });

    if (campaign) {
        await prisma.aCSPCampaign.update({
            where: { id },
            data: { totalContacts: campaign.totalContacts + leadIds.length }
        });
    }

    res.json({ message: `${leadIds.length} leads added to campaign` });
}));

// POST /api/acsp-campaigns/:id/contact-result - Record contact result
router.post('/:id/contact-result', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { leadId, status, notes } = req.body;

    // Validate required fields
    if (!leadId || !status) {
        return res.status(400).json({
            error: 'Missing required fields: leadId, status'
        });
    }

    // Update campaign lead status
    const campaignLead = await prisma.campaignLead.update({
        where: {
            campaignId_leadId: {
                campaignId: id,
                leadId
            }
        },
        data: {
            status,
            contactedAt: new Date(),
            notes
        }
    });

    // Update campaign stats
    if (status === 'SUCCESSFUL') {
        await prisma.aCSPCampaign.update({
            where: { id },
            data: {
                successfulContacts: {
                    increment: 1
                }
            }
        });
    }

    res.json({ message: 'Contact result recorded', campaignLead });
}));

// DELETE /api/acsp-campaigns/:id - Delete campaign
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.aCSPCampaign.delete({
        where: { id }
    });

    res.json({ message: 'Campaign deleted successfully' });
}));

export default router;