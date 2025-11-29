import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRefreshToken, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        // Get refresh token from cookie or body
        const refreshToken = request.cookies.get('refresh_token')?.value ||
            (await request.json()).refreshToken;

        if (!refreshToken) {
            return NextResponse.json(
                { error: 'Refresh token required' },
                { status: 401 }
            );
        }

        // Verify refresh token
        const payload = await verifyRefreshToken(refreshToken);
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
                organization: {
                    select: {
                        id: true,
                        name: true
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

        // Generate new access token
        const newToken = await generateToken({
            ...user,
            organizationId: user.organization?.id
        });

        // Create response
        const response = NextResponse.json({
            token: newToken
        });

        // Update auth token cookie
        response.cookies.set('auth_token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 hour
            path: '/'
        });

        return response;
    } catch (error) {
        console.error('Token refresh error:', error);
        return NextResponse.json(
            { error: 'Invalid or expired refresh token' },
            { status: 401 }
        );
    }
}
