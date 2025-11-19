import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { prisma } from '../lib/prisma';
import { serverOnly } from '../utils/server-only';
import {
    createCohortSchema,
    updateCohortSchema
} from '../schemas/cohort';

// Get all cohorts with pagination and filters
export const getCohorts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        const { page = 1, limit = 20, sort = 'createdAt', order = 'desc' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const where = {
            userId: req.user.id
        };

        const [cohorts, total] = await Promise.all([
            prisma.cohort.findMany({
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
            prisma.cohort.count({ where })
        ]);

        res.json({
            data: cohorts,
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

// Get cohort by ID
export const getCohortById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cohort = await prisma.cohort.findUnique({
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

        if (!cohort) {
            throw ApiError.notFound('Cohort not found');
        }

        // Check if user has permission to access this cohort
        if (!req.user || cohort.userId !== req.user.id) {
            throw new ApiError(403, 'FORBIDDEN', 'You do not have permission to access this cohort');
        }

        return res.json(cohort);
    } catch (error) {
        next(error);
    }
};

// Create new cohort
export const createCohort = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        const { name, description, criteria, audienceSize } = req.body;

        const cohort = await prisma.cohort.create({
            data: {
                name,
                description,
                criteria,
                audienceSize: parseInt(audienceSize),
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

        res.status(201).json(cohort);
    } catch (error) {
        next(error);
    }
};

// Update cohort
export const updateCohort = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, criteria, audienceSize } = req.body;

        // First, check if cohort exists and user has permission
        const existingCohort = await prisma.cohort.findUnique({
            where: { id: req.params.id }
        });

        if (!existingCohort) {
            throw ApiError.notFound('Cohort not found');
        }

        if (!req.user || existingCohort.userId !== req.user.id) {
            throw new ApiError(403, 'FORBIDDEN', 'You do not have permission to update this cohort');
        }

        const cohort = await prisma.cohort.update({
            where: { id: req.params.id },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                ...(criteria && { criteria }),
                ...(audienceSize && { audienceSize: parseInt(audienceSize) })
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

        res.json(cohort);
    } catch (error) {
        next(error);
    }
};

// Delete cohort
export const deleteCohort = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // First, check if cohort exists and user has permission
        const existingCohort = await prisma.cohort.findUnique({
            where: { id: req.params.id }
        });

        if (!existingCohort) {
            throw ApiError.notFound('Cohort not found');
        }

        if (!req.user || existingCohort.userId !== req.user.id) {
            throw new ApiError(403, 'FORBIDDEN', 'You do not have permission to delete this cohort');
        }

        await prisma.cohort.delete({
            where: { id: req.params.id }
        });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};