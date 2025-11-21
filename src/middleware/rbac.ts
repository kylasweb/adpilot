import { Response, NextFunction } from 'express';
import type { AuthRequest } from '@/types/express-types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware to check staff role
export const requireStaffRole = (allowedRoles: ('STAFF' | 'C_LEVEL' | 'ADMIN' | 'MANAGER')[]) => {
    return async (req: import('express').Request, res: Response, next: NextFunction) => {
        // Cast Request to AuthRequest for access to user property
        const authReq = req as AuthRequest;

        if (!authReq.user) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        try {
            // Fetch user's staff role from database
            const staffRole = await prisma.staffRole.findUnique({
                where: { userId: authReq.user.id }
            });

            if (!staffRole) {
                res.status(403).json({
                    error: 'Access denied: No staff role assigned',
                    required: allowedRoles
                });
                return;
            }

            // Check if user's role is in allowed roles
            if (!allowedRoles.includes(staffRole.role)) {
                res.status(403).json({
                    error: 'Access denied: Insufficient permissions',
                    userRole: staffRole.role,
                    required: allowedRoles
                });
                return;
            }

            // Add staff role to request for use in route handlers
            authReq.user.staffRole = staffRole.role;
            next();
        } catch (error) {
            console.error('Error checking staff role:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    };
};

// Middleware to check C-Level access (for strategic reports)
export const requireCLevel = requireStaffRole(['C_LEVEL', 'ADMIN']);

// Middleware to check if user can access specific lead
export const canAccessLead = async (
    req: import('express').Request,
    res: Response,
    next: NextFunction
) => {
    // Cast Request to AuthRequest for access to user property
    const authReq = req as AuthRequest;

    if (!authReq.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }

    try {
        const leadId = req.params.id || req.params.leadId;

        if (!leadId) {
            return next(); // No specific lead, continue to general access check
        }

        const staffRole = await prisma.staffRole.findUnique({
            where: { userId: authReq.user.id }
        });

        // C-Level and Admins can access all leads
        if (staffRole && ['C_LEVEL', 'ADMIN'].includes(staffRole.role)) {
            return next();
        }

        // Staff can only access leads assigned to them
        const lead = await prisma.lead.findUnique({
            where: { id: leadId }
        });

        if (!lead) {
            res.status(404).json({ error: 'Lead not found' });
            return;
        }

        if (lead.assignedTo !== authReq.user.id) {
            res.status(403).json({
                error: 'Access denied: Lead not assigned to you',
                leadId,
                assignedTo: lead.assignedTo
            });
            return;
        }

        next();
    } catch (error) {
        console.error('Error checking lead access:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};

// Middleware for lead filtering based on role
export const filterLeadsByRole = async (req: import('express').Request) => {
    // Cast Request to AuthRequest for access to user property
    const authReq = req as AuthRequest;

    if (!authReq.user) {
        return {};
    }

    const staffRole = await prisma.staffRole.findUnique({
        where: { userId: authReq.user.id }
    });

    // C-Level and Admins see all leads
    if (staffRole && ['C_LEVEL', 'ADMIN', 'MANAGER'].includes(staffRole.role)) {
        return {};
    }

    // Staff only see their assigned leads
    return {
        assignedTo: authReq.user.id
    };
};

// Log access for audit trail
export const logAccess = (resource: string) => {
    return async (req: import('express').Request, res: Response, next: NextFunction) => {
        // Cast Request to AuthRequest for access to user property
        const authReq = req as AuthRequest;

        if (authReq.user) {
            console.log(`[AUDIT] ${new Date().toISOString()} - User ${authReq.user.email} accessed ${resource} - Method: ${req.method} - Path: ${req.path}`);

            // In production, this should write to a database audit log
            // await prisma.auditLog.create({
            //   data: {
            //     userId: authReq.user.id,
            //     resource,
            //     action: req.method,
            //     path: req.path,
            //     ip: req.ip
            //   }
            // });
        }
        next();
    };
};