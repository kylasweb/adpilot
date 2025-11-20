import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the AuthenticatedRequest type
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        staffRole?: 'ADMIN' | 'STAFF' | 'C_LEVEL' | 'MANAGER';
    };
}

// Middleware to check staff role
export const requireStaffRole = (allowedRoles: ('STAFF' | 'C_LEVEL' | 'ADMIN' | 'MANAGER')[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Cast req to access user property
        const authReq = req as AuthenticatedRequest;

        if (!authReq.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        try {
            // Fetch user's staff role from database
            const staffRole = await prisma.staffRole.findUnique({
                where: { userId: authReq.user.id }
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
                    userRole: staffRole.role,
                    required: allowedRoles
                });
            }

            // Add staff role to request for use in route handlers
            authReq.user.staffRole = staffRole.role;
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
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Cast req to access user property
    const authReq = req as AuthenticatedRequest;

    if (!authReq.user) {
        return res.status(401).json({ error: 'Authentication required' });
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
            return res.status(404).json({ error: 'Lead not found' });
        }

        if (lead.assignedTo !== authReq.user.id) {
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
export const filterLeadsByRole = async (req: Request) => {
    // Cast req to access user property
    const authReq = req as AuthenticatedRequest;

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
    return async (req: Request, res: Response, next: NextFunction) => {
        // Cast req to access user property
        const authReq = req as AuthenticatedRequest;

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