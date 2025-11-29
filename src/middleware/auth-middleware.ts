import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export interface AuthenticatedRequest extends NextRequest {
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        organizationId?: string;
    };
}

/**
 * Middleware to protect API routes with authentication
 * Usage: Wrap your route handler with this middleware
 */
export async function withAuth(
    handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
    options?: {
        requiredRole?: 'ADMIN' | 'USER' | 'VIEWER';
    }
) {
    return async (req: NextRequest) => {
        try {
            // Get token from Authorization header or cookie
            const authHeader = req.headers.get('authorization');
            const token = authHeader?.replace('Bearer ', '') ||
                req.cookies.get('auth_token')?.value;

            if (!token) {
                return NextResponse.json(
                    { error: 'Authentication required' },
                    { status: 401 }
                );
            }

            // Verify token
            const payload = await verifyJWT(token);
            const userId = payload.sub as string;

            // Get user from database to ensure they still exist and are active
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    status: true,
                    organization: {
                        select: {
                            id: true
                        }
                    }
                }
            });

            if (!user) {
                return NextResponse.json(
                    { error: 'User not found' },
                    { status: 404 }
                );
            }

            // Check if user is active
            if (user.status !== 'ACTIVE') {
                return NextResponse.json(
                    { error: 'Account is not active' },
                    { status: 403 }
                );
            }

            // Check role if required
            if (options?.requiredRole) {
                if (user.role !== options.requiredRole && user.role !== 'ADMIN') {
                    return NextResponse.json(
                        { error: 'Insufficient permissions' },
                        { status: 403 }
                    );
                }
            }

            // Attach user to request
            const authenticatedReq = req as AuthenticatedRequest;
            authenticatedReq.user = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                organizationId: user.organization?.id
            };

            // Call the handler
            return handler(authenticatedReq);
        } catch (error) {
            console.error('Auth middleware error:', error);
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 401 }
            );
        }
    };
}

/**
 * Helper to extract user from authenticated request
 */
export function getAuthUser(req: AuthenticatedRequest) {
    return req.user;
}
