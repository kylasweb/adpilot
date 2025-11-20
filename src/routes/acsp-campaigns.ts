import express, { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, logAccess, AuthenticatedRequest } from '../middleware/rbac.js';

const router = express.Router();
const prisma = new PrismaClient();

// Apply authentication
router.use(requireAuth);

// GET /api/acsp-campaigns - Get all campaigns
router.get('/', logAccess('campaigns'), async (req: AuthenticatedRequest, res: Response) => {
    try {
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
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
});

// GET /api/acsp-campaigns/stats - Get campaign statistics
router.get('/stats', logAccess('campaign-stats'), async (req: AuthenticatedRequest, res: Response) => {
    try {
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
    } catch (error) {
        console.error('Error fetching campaign stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// GET /api/acsp-campaigns/:id - Get single campaign
router.get('/:id', logAccess('campaign-detail'), async (req: AuthenticatedRequest, res: Response) => {
    try {
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
    } catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({ error: 'Failed to fetch campaign' });
    }
});

// POST /api/acsp-campaigns - Create new campaign
router.post('/', async (req: AuthenticatedRequest, res: Response) => {
    try {
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
                createdBy: req.user!.id
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
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ error: 'Failed to create campaign' });
    }
});

// PUT /api/acsp-campaigns/:id - Update campaign
router.put('/:id', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const campaign = await prisma.aCSPCampaign.update({
            where: { id },
            data: updateData
        });

        res.json(campaign);
    } catch (error) {
        console.error('Error updating campaign:', error);
        res.status(500).json({ error: 'Failed to update campaign' });
    }
});

// POST /api/acsp-campaigns/:id/launch - Launch campaign
router.post('/:id/launch', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        const campaign = await prisma.aCSPCampaign.update({
            where: { id },
            data: { status: 'ACTIVE' }
        });

        res.json({ message: 'Campaign launched successfully', campaign });
    } catch (error) {
        console.error('Error launching campaign:', error);
        res.status(500).json({ error: 'Failed to launch campaign' });
    }
});

// POST /api/acsp-campaigns/:id/pause - Pause campaign
router.post('/:id/pause', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        const campaign = await prisma.aCSPCampaign.update({
            where: { id },
            data: { status: 'PAUSED' }
        });

        res.json({ message: 'Campaign paused successfully', campaign });
    } catch (error) {
        console.error('Error pausing campaign:', error);
        res.status(500).json({ error: 'Failed to pause campaign' });
    }
});

// POST /api/acsp-campaigns/:id/leads - Add leads to campaign
router.post('/:id/leads', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { leadIds } = req.body;

        if (!Array.isArray(leadIds) || leadIds.length === 0) {
            return res.status(400).json({ error: 'leadIds must be a non-empty array' });
        }

        await prisma.campaignLead.createMany({
            data: leadIds.map((leadId: string) => ({
                campaignId: id,
                leadId
            })),
            skipDuplicates: true
        });

        const campaign = await prisma.aCSPCampaign.update({
            where: { id },
            data: {
                totalContacts: {
                    increment: leadIds.length
                }
            },
            include: {
                _count: {
                    select: { leads: true }
                }
            }
        });

        res.json({ message: `Added ${leadIds.length} leads to campaign`, campaign });
    } catch (error) {
        console.error('Error adding leads to campaign:', error);
        res.status(500).json({ error: 'Failed to add leads to campaign' });
    }
});

// POST /api/acsp-campaigns/:id/contact-result - Record contact result
router.post('/:id/contact-result', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { leadId, status, result, notes } = req.body;

        await prisma.campaignLead.update({
            where: {
                campaignId_leadId: {
                    campaignId: id,
                    leadId
                }
            },
            data: {
                status,
                result,
                notes,
                contactedAt: new Date()
            }
        });

        const isSuccess = status === 'SUCCESS';
        await prisma.aCSPCampaign.update({
            where: { id },
            data: {
                completedContacts: { increment: 1 },
                successfulContacts: { increment: isSuccess ? 1 : 0 }
            }
        });

        const campaign = await prisma.aCSPCampaign.findUnique({
            where: { id }
        });

        if (campaign && campaign.completedContacts > 0) {
            const successRate = (campaign.successfulContacts / campaign.completedContacts) * 100;
            await prisma.aCSPCampaign.update({
                where: { id },
                data: { successRate }
            });
        }

        res.json({ message: 'Contact result recorded successfully' });
    } catch (error) {
        console.error('Error recording contact result:', error);
        res.status(500).json({ error: 'Failed to record contact result' });
    }
});

// DELETE /api/acsp-campaigns/:id - Delete campaign
router.delete('/:id', async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.aCSPCampaign.update({
            where: { id },
            data: { status: 'ARCHIVED' }
        });

        res.json({ message: 'Campaign archived successfully' });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({ error: 'Failed to delete campaign' });
    }
});

export default router;
