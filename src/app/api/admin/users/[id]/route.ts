import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth, getAuthUser } from '@/middleware/auth-middleware';
import bcrypt from 'bcryptjs';

// GET /api/admin/users/[id] - Get user by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    return withAuth(async (req) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: params.id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatarUrl: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    organization: {
                        select: {
                            id: true,
                            name: true,
                            website: true
                        }
                    },
                    _count: {
                        select: {
                            campaigns: true,
                            projects: true,
                            assignedLeads: true
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

            return NextResponse.json({ user });
        } catch (error) {
            console.error('Get user error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch user' },
                { status: 500 }
            );
        }
    }, { requiredRole: 'ADMIN' })(request);
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    return withAuth(async (req) => {
        try {
            const body = await request.json();
            const { name, email, role, status, avatarUrl } = body;

            // Validate inputs
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return NextResponse.json(
                        { error: 'Invalid email format' },
                        { status: 400 }
                    );
                }

                // Check if email is already taken by another user
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email,
                        NOT: { id: params.id }
                    }
                });

                if (existingUser) {
                    return NextResponse.json(
                        { error: 'Email already in use' },
                        { status: 409 }
                    );
                }
            }

            // Update user
            const updatedUser = await prisma.user.update({
                where: { id: params.id },
                data: {
                    ...(name && { name }),
                    ...(email && { email }),
                    ...(role && { role }),
                    ...(status && { status }),
                    ...(avatarUrl !== undefined && { avatarUrl })
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatarUrl: true,
                    role: true,
                    status: true,
                    updatedAt: true
                }
            });

            return NextResponse.json({ user: updatedUser });
        } catch (error) {
            console.error('Update user error:', error);
            return NextResponse.json(
                { error: 'Failed to update user' },
                { status: 500 }
            );
        }
    }, { requiredRole: 'ADMIN' })(request);
}

// DELETE /api/admin/users/[id] - Delete/deactivate user
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    return withAuth(async (req) => {
        try {
            const currentUser = getAuthUser(req);

            // Prevent self-deletion
            if (currentUser.id === params.id) {
                return NextResponse.json(
                    { error: 'Cannot delete your own account' },
                    { status: 400 }
                );
            }

            // Soft delete by setting status to INACTIVE
            const deletedUser = await prisma.user.update({
                where: { id: params.id },
                data: { status: 'INACTIVE' },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    status: true
                }
            });

            return NextResponse.json({
                message: 'User deactivated successfully',
                user: deletedUser
            });
        } catch (error) {
            console.error('Delete user error:', error);
            return NextResponse.json(
                { error: 'Failed to delete user' },
                { status: 500 }
            );
        }
    }, { requiredRole: 'ADMIN' })(request);
}
