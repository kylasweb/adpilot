import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { prisma } from '../lib/prisma';
import { serverOnly } from '../utils/server-only';
import {
    UserProfileSchema,
    PasswordUpdateSchema,
    OrganizationSettingsSchema
} from '../schemas/settings';
import bcrypt from 'bcryptjs';

// Get user settings
export const getUserSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                organization: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!user) {
            throw new ApiError(404, 'NOT_FOUND', 'User not found');
        }

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                organization: user.organization,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Validate request body
        const validationResult = UserProfileSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid user data');
        }

        const { name, email } = validationResult.data;

        // Check if email is already taken by another user
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
                NOT: {
                    id: req.user.id
                }
            }
        });

        if (existingUser) {
            throw new ApiError(400, 'INVALID_DATA', 'Email is already taken');
        }

        // Update user
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                name,
                email,
                updatedAt: new Date()
            },
            select: {
                id: true,
                name: true,
                email: true,
                organization: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                organization: user.organization,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update user password
export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Validate request body
        const validationResult = PasswordUpdateSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid password data');
        }

        const { currentPassword, newPassword } = validationResult.data;

        // Get current user with password
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                password: true
            }
        });

        if (!user) {
            throw new ApiError(404, 'NOT_FOUND', 'User not found');
        }

        // Check current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new ApiError(400, 'INVALID_CREDENTIALS', 'Current password is incorrect');
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update password
        await prisma.user.update({
            where: { id: req.user.id },
            data: {
                password: hashedPassword,
                updatedAt: new Date()
            }
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        next(error);
    }
};

// Update organization settings
export const updateOrganizationSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Validate request body
        const validationResult = OrganizationSettingsSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid organization data');
        }

        const { name, website } = validationResult.data;

        // Update organization
        const organization = await prisma.organization.upsert({
            where: { userId: req.user.id },
            update: {
                name,
                website: website || null,
                updatedAt: new Date()
            },
            create: {
                name,
                website: website || null,
                userId: req.user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        res.json({
            organization: {
                id: organization.id,
                name: organization.name,
                website: organization.website,
                createdAt: organization.createdAt,
                updatedAt: organization.updatedAt,
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete user account
export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Delete user and all related data (cascading)
        await prisma.user.delete({
            where: { id: req.user.id }
        });

        // Clear session/token on frontend
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        next(error);
    }
};