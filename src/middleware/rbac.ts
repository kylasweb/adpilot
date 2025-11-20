import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extended request type with user info
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
        staffRole?: 'STAFF' | 'C_LEVEL' | 'ADMIN' | 'MANAGER';
    };
}

// Middleware to check if user is authenticated
export const requireAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    // In production, this would validate JWT token
    // For now, we'll assume user is set by previous middleware
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    next();
};

// Middleware to check staff role
export const requireStaffRole = (allowedRoles: ('STAFF' | 'C_LEVEL' | 'ADMIN' | 'MANAGER')[]) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        try {
            // Fetch user's staff role from database
            const staffRole = await prisma.staffRole.findUnique({
                where: { userId: req.user.id }
            });

            if (!staffRole) {
                return res.status(403).json({
                    error: 'Access denied: No staff role assigned',
                    required: allowedRoles
                });
            }

            // Check if user's role is in allowed roles
            if (!allowedRoles.includes(staffRole.role)) {
                return res.status(403).json({
                    error: 'Access denied: Insufficient permissions',
                    userRole: staff Role.role,
                    required: allowedRoles
                });
            }

            // Add staff role to request for use in route handlers
            req.user.staffRole = staffRole.role;
            next();
        } catch (error) {
            console.error('Error checking staff role:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
};

// Middleware to check C-Level access (for strategic reports)
export const requireCLevel = requireStaffRole(['C_LEVEL', 'ADMIN']);

// Middleware to check if user can access specific lead
export const canAccessLead = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const leadId = req.params.id || req.params.leadId;

        if (!leadId) {
            return next(); // No specific lead, continue to general access check
        }

        const staffRole = await prisma.staffRole.findUnique({
            where: { userId: req.user.id }
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
            return res.status(404).json({ error: 'Lead not found' });
        }

        if (lead.assignedTo !== req.user.id) {
            return res.status(403).json({
                error: 'Access denied: Lead not assigned to you',
                leadId,
                assignedTo: lead.assignedTo
            });
        }

        next();
    } catch (error) {
        console.error('Error checking lead access:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Middleware for lead filtering based on role
export const filterLeadsByRole = async (req: AuthenticatedRequest) => {
    if (!req.user) {
        return {};
    }

    const staffRole = await prisma.staffRole.findUnique({
        where: { userId: req.user.id }
    });

    // C-Level and Admins see all leads
    if (staffRole && ['C_LEVEL', 'ADMIN', 'MANAGER'].includes(staffRole.role)) {
        return {};
    }

    // Staff only see their assigned leads
    return {
        assignedTo: req.user.id
    };
};

// Log access for audit trail
export const logAccess = (resource: string) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user) {
            console.log(`[AUDIT] ${new Date().toISOString()} - User ${req.user.email} accessed ${resource} - Method: ${req.method} - Path: ${req.path}`);

            // In production, this should write to a database audit log
            // await prisma.auditLog.create({
            //   data: {
            //     userId: req.user.id,
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
