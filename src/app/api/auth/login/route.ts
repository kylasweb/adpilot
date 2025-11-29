import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateToken, generateRefreshToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user in database
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
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
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check if user is active
        if (user.status !== 'ACTIVE') {
            return NextResponse.json(
                { error: 'Account is not active' },
                { status: 403 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;

        // Generate tokens
        const [token, refreshToken] = await Promise.all([
            generateToken({
                ...userWithoutPassword,
                organizationId: user.organization?.id
            }),
            generateRefreshToken(user.id)
        ]);

        // Create response with httpOnly cookies
        const response = NextResponse.json({
            user: userWithoutPassword,
            token
        });

        // Set cookies (httpOnly for security)
        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 hour
            path: '/'
        });

        response.cookies.set('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/api/auth'
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
