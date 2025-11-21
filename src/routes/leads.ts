import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import type { AuthRequest } from '@/types/express-types';
import { PrismaClient } from '@prisma/client';
import {
    canAccessLead,
    filterLeadsByRole,
    logAccess
} from '../middleware/rbac.js';
import { authorize as requireAuth } from '../middleware/authorize.js';

const router = express.Router();
const prisma = new PrismaClient();

// Apply authentication to all routes
router.use(requireAuth());

// GET /api/leads - Get all leads (filtered by role)
router.get('/', logAccess('leads'), async (req: import('express').Request, res: Response, next: NextFunction) => {
    try {
        const { status, source, urgency, minScore, search, page = '1', limit = '20' } = req.query;

        // Build filter based on user role
        const roleFilter = await filterLeadsByRole(req as AuthRequest);

        const where: any = {
            ...roleFilter
        };

        // Add query filters
        if (status) where.status = status;
        if (source) where.source = source;
        if (urgency) where.urgency = urgency;
        if (minScore) where.score = { gte: parseInt(minScore as string) };
        if (search) {
            where.OR = [
                { name: { contains: search as string, mode: 'insensitive' } },
                { company: { contains: search as string, mode: 'insensitive' } },
                { email: { contains: search as string, mode: 'insensitive' } },
                { phone: { contains: search as string } }
            ];
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const [leads, total] = await Promise.all([
            prisma.lead.findMany({
                where,
                include: {
                    ivrTranscripts: {
                        orderBy: { callDate: 'desc' },
                        take: 1
                    },
                    scores: {
                        orderBy: { createdAt: 'desc' },
                        take: 1
                    },
                    assignedToUser: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: [
                    { score: 'desc' },
                    { createdAt: 'desc' }
                ],
                skip,
                take: limitNum
            }),
            prisma.lead.count({ where })
        ]);

        res.json({
            data: leads,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
};

<<<<<<< HEAD
// GET /api/leads/stats - Get lead statistics
router.get('/stats', logAccess('lead-stats'), async (req: import('express').Request, res: Response, next: NextFunction) => {
=======
// GET /api/leads - Get all leads (filtered by role)
router.get('/', logAccess('leads') as any, getLeadsHandler as any);

const getLeadStatsHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
>>>>>>> origin/nextjs-migration
    try {
        const roleFilter = await filterLeadsByRole(req as AuthRequest);

        const [
            totalLeads,
            qualifiedLeads,
            avgScore,
            totalValue
        ] = await Promise.all([
            prisma.lead.count({ where: roleFilter }),
            prisma.lead.count({
                where: { ...roleFilter, status: 'QUALIFIED' }
            }),
            prisma.lead.aggregate({
                where: roleFilter,
                _avg: { score: true }
            }),
            prisma.lead.aggregate({
                where: roleFilter,
                _sum: { estimatedValue: true }
            })
        ]);

        res.json({
            totalLeads,
            qualifiedLeads,
            avgScore: Math.round(avgScore._avg.score || 0),
            totalValue: totalValue._sum.estimatedValue || 0
        });
    } catch (error) {
        console.error('Error fetching lead stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};

<<<<<<< HEAD
// GET /api/leads/:id - Get single lead
router.get('/:id', canAccessLead, logAccess('lead-detail'), async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
=======
// GET /api/leads/stats - Get lead statistics
router.get('/stats', logAccess('lead-stats') as any, getLeadStatsHandler as any);

const getLeadByIdHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
>>>>>>> origin/nextjs-migration
    try {
        const { id } = req.params;

        const lead = await prisma.lead.findUnique({
            where: { id },
            include: {
                ivrTranscripts: {
                    orderBy: { callDate: 'desc' }
                },
                scores: {
                    orderBy: { createdAt: 'desc' }
                },
                activities: {
                    orderBy: { createdAt: 'desc' },
                    take: 50
                },
                assignedToUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!lead) {
            res.status(404).json({ error: 'Lead not found' });
<<<<<<< HEAD
=======
            return;
>>>>>>> origin/nextjs-migration
        }

        res.json(lead);
    } catch (error) {
        console.error('Error fetching lead:', error);
        res.status(500).json({ error: 'Failed to fetch lead' });
    }
};

<<<<<<< HEAD
// POST /api/leads - Create new lead
router.post('/', async (req: import('express').Request, res: Response, next: NextFunction) => {
=======
// GET /api/leads/:id - Get single lead
router.get('/:id', canAccessLead as any, logAccess('lead-detail') as any, getLeadByIdHandler as any);

const createLeadHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
>>>>>>> origin/nextjs-migration
    try {
        const {
            name,
            email,
            phone,
            company,
            title,
            source,
            urgency,
            accountType,
            industry,
            companySize,
            estimatedValue,
            fairGoMemory
        } = req.body;

        // Validate required fields
        if (!name || !phone || !source) {
            res.status(400).json({
                error: 'Missing required fields: name, phone, source'
            });
            return;
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                phone,
                company,
                title,
                source,
                urgency: urgency || 'MEDIUM',
                accountType,
                industry,
                companySize,
                estimatedValue: estimatedValue ? parseFloat(estimatedValue) : null,
                fairGoMemory,
                status: 'NEW'
            }
        });

        // Create initial activity
        await prisma.leadActivity.create({
            data: {
                leadId: lead.id,
                type: 'NOTE',
                action: 'Lead created',
                details: `Lead created from ${source}`,
                performedBy: (req as AuthRequest).user?.id
            }
        });

        res.status(201).json(lead);
    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({ error: 'Failed to create lead' });
    }
};

<<<<<<< HEAD
// PUT /api/leads/:id - Update lead
router.put('/:id', canAccessLead, async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
=======
// POST /api/leads - Create new lead
router.post('/', createLeadHandler as any);

const updateLeadHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
>>>>>>> origin/nextjs-migration
    try {
        const { id } = req.params;
        const updateData = req.body;

        const lead = await prisma.lead.update({
            where: { id },
            data: updateData
        });

        // Log activity
        await prisma.leadActivity.create({
            data: {
                leadId: id,
                type: 'NOTE',
                action: 'Lead updated',
                details: `Fields updated: ${Object.keys(updateData).join(', ')}`,
                performedBy: (req as AuthRequest).user?.id
            }
        });

        res.json(lead);
    } catch (error) {
        console.error('Error updating lead:', error);
        res.status(500).json({ error: 'Failed to update lead' });
    }
};

<<<<<<< HEAD
// POST /api/leads/:id/score - Update lead score
router.post('/:id/score', canAccessLead, async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
=======
// PUT /api/leads/:id - Update lead
router.put('/:id', canAccessLead as any, updateLeadHandler as any);

const updateLeadScoreHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
>>>>>>> origin/nextjs-migration
    try {
        const { id } = req.params;
        const { score, factors, confidence, notes } = req.body;

        if (!score || score < 0 || score > 100) {
            res.status(400).json({ error: 'Score must be between 0 and 100' });
<<<<<<< HEAD
=======
            return;
>>>>>>> origin/nextjs-migration
        }

        // Create score record
        const leadScore = await prisma.leadScore.create({
            data: {
                leadId: id,
                score,
                ivrUrgency: factors?.ivrUrgency,
                accountType: factors?.accountType,
                engagement: factors?.engagement,
                companySize: factors?.companySize,
                industry: factors?.industry,
                confidence,
                calculatedBy: (req as AuthRequest).user?.id,
                notes
            }
        });

        // Update lead's current score
        await prisma.lead.update({
            where: { id },
            data: { score }
        });

        // Log activity
        await prisma.leadActivity.create({
            data: {
                leadId: id,
                type: 'SCORE_UPDATE',
                action: 'Score updated',
                details: `Score changed to ${score}`,
                performedBy: (req as AuthRequest).user?.id
            }
        });

        res.json(leadScore);
    } catch (error) {
        console.error('Error updating score:', error);
        res.status(500).json({ error: 'Failed to update score' });
    }
};

<<<<<<< HEAD
// POST /api/leads/:id/ivr-transcript - Add IVR transcript
router.post('/:id/ivr-transcript', async (req: import('express').Request, res: Response, next: NextFunction) => {
=======
// POST /api/leads/:id/score - Update lead score
router.post('/:id/score', canAccessLead as any, updateLeadScoreHandler as any);

const addIvrTranscriptHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
>>>>>>> origin/nextjs-migration
    try {
        const { id } = req.params;
        const {
            callDate,
            duration,
            transcript,
            sentiment,
            intent,
            entities,
            callerId,
            agentId,
            recordingUrl
        } = req.body;

        const ivrTranscript = await prisma.iVRTranscript.create({
            data: {
                leadId: id,
                callDate: new Date(callDate),
                duration,
                transcript,
                sentiment: sentiment || 'NEUTRAL',
                intent,
                entities,
                callerId,
                agentId,
                recordingUrl
            }
        });

        // Log activity
        await prisma.leadActivity.create({
            data: {
                leadId: id,
                type: 'CALL',
                action: 'IVR call completed',
                details: `Duration: ${duration}s, Sentiment: ${sentiment}`,
                performedBy: agentId || 'AI_SYSTEM'
            }
        });

        res.status(201).json(ivrTranscript);
    } catch (error) {
        console.error('Error creating IVR transcript:', error);
        res.status(500).json({ error: 'Failed to create transcript' });
    }
};

<<<<<<< HEAD
// POST /api/leads/:id/activity - Add activity
router.post('/:id/activity', canAccessLead, async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
=======
// POST /api/leads/:id/ivr-transcript - Add IVR transcript
router.post('/:id/ivr-transcript', addIvrTranscriptHandler as any);

const addActivityHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
>>>>>>> origin/nextjs-migration
    try {
        const { id } = req.params;
        const { type, action, details, metadata } = req.body;

        const activity = await prisma.leadActivity.create({
            data: {
                leadId: id,
                type,
                action,
                details,
                performedBy: (req as AuthRequest).user?.id,
                metadata
            }
        });

        res.status(201).json(activity);
    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({ error: 'Failed to create activity' });
    }
};

<<<<<<< HEAD
// DELETE /api/leads/:id - Delete lead (soft delete)
router.delete('/:id', canAccessLead, async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
=======
// POST /api/leads/:id/activity - Add activity
router.post('/:id/activity', canAccessLead as any, addActivityHandler as any);

const deleteLeadHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
>>>>>>> origin/nextjs-migration
    try {
        const { id } = req.params;

        await prisma.lead.update({
            where: { id },
            data: { status: 'CLOSED_LOST' }
        });

        res.json({ message: 'Lead archived successfully' });
    } catch (error) {
        console.error('Error deleting lead:', error);
        res.status(500).json({ error: 'Failed to delete lead' });
    }
};

// DELETE /api/leads/:id - Delete lead (soft delete)
router.delete('/:id', canAccessLead as any, deleteLeadHandler as any);

export default router;
