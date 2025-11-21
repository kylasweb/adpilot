import { Response, NextFunction } from 'express';
import type { AuthRequest } from '@/types/express-types';
import { ApiError } from '../utils/ApiError';
import { prisma } from '../lib/prisma';
import { serverOnly } from '../utils/server-only';
import {
    createCampaignSchema,
    updateCampaignSchema
} from '../schemas/campaign';

// Get all campaigns with pagination and filters
type GetCampaignsQuery = {
    page?: string;
    limit?: string;
    status?: string;
    sort?: string;
    order?: 'asc' | 'desc';
};

type CreateCampaignBody = {
    name: string;
    description?: string | null;
    objective?: string | null;
    budget: string | number;
    startDate: string | number | Date;
    endDate?: string | null;
    status?: string;
};

type UpdateCampaignBody = Partial<{
    name: string;
    description: string | null;
    objective: string | null;
    budget: string | number;
    startDate: string | number | Date;
    endDate: string | null;
    status: string;
}>;

export const getCampaigns = async (req: AuthRequest<Record<string, never>, any, undefined, GetCampaignsQuery>, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        const { page = 1, limit = 20, status, sort = 'createdAt', order = 'desc' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const where = {
            userId: req.user.id,
            ...(status && { status: status as string })
        };

        const [campaigns, total] = await Promise.all([
            prisma.campaign.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                },
                orderBy: {
                    [sort as string]: order
                },
                skip,
                take: Number(limit)
            }),
            prisma.campaign.count({ where })
        ]);

        res.json({
            data: campaigns,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                total_pages: Math.ceil(total / Number(limit))
            }
        });
    } catch (error) {
        return next(error);
    }
};

// Get campaign by ID
export const getCampaignById = async (req: AuthRequest<{ id: string }, any, undefined>, res: Response, next: NextFunction) => {
    try {
        const campaign = await prisma.campaign.findUnique({
            where: { id: req.params.id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!campaign) {
            throw ApiError.notFound('Campaign not found');
        }

        // Check if user has permission to access this campaign
        if (!req.user || campaign.userId !== req.user.id) {
            throw new ApiError(403, 'FORBIDDEN', 'You do not have permission to access this campaign');
        }

        res.json(campaign);
    } catch (error) {
        next(error);
    }
};

// Create new campaign
export const createCampaign = async (req: AuthRequest<Record<string, never>, any, CreateCampaignBody>, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        const { name, description, objective, budget, startDate, endDate, status } = req.body;

        const campaign = await prisma.campaign.create({
            data: {
                name,
                description,
                objective,
                budget: typeof budget === 'string' ? parseFloat(budget) : (budget as number),
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                status,
                userId: req.user.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(201).json(campaign);
    } catch (error) {
        next(error);
    }
};

// Update campaign
export const updateCampaign = async (req: AuthRequest<{ id: string }, any, UpdateCampaignBody>, res: Response, next: NextFunction) => {
    try {
        const { name, description, objective, budget, status, startDate, endDate } = req.body || {};

        // First, check if campaign exists and user has permission
        const existingCampaign = await prisma.campaign.findUnique({
            where: { id: req.params.id }
        });

        if (!existingCampaign) {
            throw ApiError.notFound('Campaign not found');
        }

        if (!req.user || existingCampaign.userId !== req.user.id) {
            throw new ApiError(403, 'FORBIDDEN', 'You do not have permission to update this campaign');
        }

        const campaign = await prisma.campaign.update({
            where: { id: req.params.id },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                ...(objective && { objective }),
                ...(budget && { budget: typeof budget === 'string' ? parseFloat(budget) : (budget as number) }),
                ...(status && { status }),
                ...(startDate && { startDate: new Date(startDate) }),
                ...(endDate && { endDate: new Date(endDate) })
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.json(campaign);
    } catch (error) {
        next(error);
    }
};

// Delete campaign
export const deleteCampaign = async (req: AuthRequest<{ id: string }, any, undefined>, res: Response, next: NextFunction) => {
    try {
        // First, check if campaign exists and user has permission
        const existingCampaign = await prisma.campaign.findUnique({
            where: { id: req.params.id }
        });

        if (!existingCampaign) {
            throw ApiError.notFound('Campaign not found');
        }

        if (!req.user || existingCampaign.userId !== req.user.id) {
            throw new ApiError(403, 'FORBIDDEN', 'You do not have permission to delete this campaign');
        }

        await prisma.campaign.delete({
            where: { id: req.params.id }
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};