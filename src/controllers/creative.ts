import { Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { serverOnly } from '../utils/server-only';
import type { AuthRequest } from '@/types/express-types';
import {
    CreateCreativeSchema,
    UpdateCreativeSchema,
    CreativeFilterSchema
} from '../schemas/creative';

// Get all creatives with filtering and pagination
export const getCreatives = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Parse and validate query parameters
        const filterResult = CreativeFilterSchema.safeParse(req.query);
        if (!filterResult.success) {
            throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid filter parameters');
        }

        const { search, type, campaignId, sortBy } = filterResult.data;

        // Build where clause
        const where: Prisma.CreativeWhereInput = {
            userId: req.user.id,
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { tags: { has: search } }
                ]
            }),
            ...(type && { type }),
            ...(campaignId && { campaignId })
        };

        // Build orderBy clause
        let orderBy: Prisma.CreativeOrderByWithRelationInput = { createdAt: 'desc' };
        if (sortBy === 'oldest') {
            orderBy = { createdAt: 'asc' };
        } else if (sortBy === 'alphabetical') {
            orderBy = { title: 'asc' };
        }

        // Get paginated results
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [creatives, total] = await Promise.all([
            prisma.creative.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    campaign: {
                        select: {
                            name: true
                        }
                    }
                }
            }),
            prisma.creative.count({ where })
        ]);

        // Transform data for frontend
        const transformedCreatives = creatives.map(creative => ({
            id: creative.id,
            title: creative.title,
            type: creative.type,
            size: creative.size,
            campaignId: creative.campaignId,
            campaignName: creative.campaign?.name || null,
            lastUpdated: creative.updatedAt.toISOString(),
            previewUrl: creative.previewUrl,
            tags: creative.tags,
            createdAt: creative.createdAt.toISOString(),
            updatedAt: creative.updatedAt.toISOString()
        }));

        res.json({
            data: transformedCreatives,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get a single creative by ID
export const getCreativeById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        const { id } = req.params;

        const creative = await prisma.creative.findUnique({
            where: {
                id,
                userId: req.user.id
            },
            include: {
                campaign: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!creative) {
            throw new ApiError(404, 'NOT_FOUND', 'Creative not found');
        }

        // Transform data for frontend
        const transformedCreative = {
            id: creative.id,
            title: creative.title,
            type: creative.type,
            size: creative.size,
            campaignId: creative.campaignId,
            campaignName: creative.campaign?.name || null,
            lastUpdated: creative.updatedAt.toISOString(),
            previewUrl: creative.previewUrl,
            tags: creative.tags,
            createdAt: creative.createdAt.toISOString(),
            updatedAt: creative.updatedAt.toISOString()
        };

        res.json(transformedCreative);
    } catch (error) {
        next(error);
    }
};

// Create a new creative
export const createCreative = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Validate request body
        const validationResult = CreateCreativeSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid creative data');
        }

        const { title, type, size, campaignId, tags } = validationResult.data;

        // Verify campaign belongs to user if provided
        if (campaignId) {
            const campaign = await prisma.campaign.findFirst({
                where: {
                    id: campaignId,
                    userId: req.user.id
                }
            });

            if (!campaign) {
                throw new ApiError(400, 'INVALID_DATA', 'Campaign not found or does not belong to user');
            }
        }

        // Create creative
        const creative = await prisma.creative.create({
            data: {
                title,
                type,
                size,
                previewUrl: '', // This would be set when the actual asset is uploaded
                tags: tags || [],
                userId: req.user.id,
                campaignId
            }
        });

        res.status(201).json({
            id: creative.id,
            title: creative.title,
            type: creative.type,
            size: creative.size,
            campaignId: creative.campaignId,
            lastUpdated: creative.updatedAt.toISOString(),
            previewUrl: creative.previewUrl,
            tags: creative.tags,
            createdAt: creative.createdAt.toISOString(),
            updatedAt: creative.updatedAt.toISOString()
        });
    } catch (error) {
        next(error);
    }
};

// Update a creative
export const updateCreative = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        const { id } = req.params;

        // Validate request body
        const validationResult = UpdateCreativeSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid creative data');
        }

        const updateData = validationResult.data;

        // Verify creative belongs to user
        const existingCreative = await prisma.creative.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!existingCreative) {
            throw new ApiError(404, 'NOT_FOUND', 'Creative not found');
        }

        // Verify campaign belongs to user if provided
        if (updateData.campaignId) {
            const campaign = await prisma.campaign.findFirst({
                where: {
                    id: updateData.campaignId,
                    userId: req.user.id
                }
            });

            if (!campaign) {
                throw new ApiError(400, 'INVALID_DATA', 'Campaign not found or does not belong to user');
            }
        }

        // Update creative
        const creative = await prisma.creative.update({
            where: { id },
            data: {
                ...updateData,
                updatedAt: new Date()
            }
        });

        res.json({
            id: creative.id,
            title: creative.title,
            type: creative.type,
            size: creative.size,
            campaignId: creative.campaignId,
            lastUpdated: creative.updatedAt.toISOString(),
            previewUrl: creative.previewUrl,
            tags: creative.tags,
            createdAt: creative.createdAt.toISOString(),
            updatedAt: creative.updatedAt.toISOString()
        });
    } catch (error) {
        next(error);
    }
};

// Delete a creative
export const deleteCreative = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        const { id } = req.params;

        const creative = await prisma.creative.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!creative) {
            throw new ApiError(404, 'NOT_FOUND', 'Creative not found');
        }

        // Delete creative
        await prisma.creative.delete({
            where: { id }
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};