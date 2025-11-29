import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateToken, generateRefreshToken } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password, role = 'USER' } = body;

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Password strength validation
        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters long' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role as UserRole,
                status: 'ACTIVE'
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                avatarUrl: true,
                createdAt: true
            }
        });

        // Generate tokens
        const [token, refreshToken] = await Promise.all([
            generateToken({
                ...user,
                organizationId: undefined
            }),
            generateRefreshToken(user.id)
        ]);

        // Create response
        const response = NextResponse.json(
            {
                user,
                token
            },
            { status: 201 }
        );

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
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
