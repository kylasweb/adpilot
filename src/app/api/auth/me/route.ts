import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        // Get token from Authorization header or cookie
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '') ||
            request.cookies.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Verify token
        const payload = await verifyJWT(token);
        const userId = payload.sub as string;

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                avatarUrl: true,
                createdAt: true,
                updatedAt: true,
                organization: {
                    select: {
                        id: true,
                        name: true,
                        website: true
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

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}
