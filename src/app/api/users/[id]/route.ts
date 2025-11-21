import { NextResponse } from 'next/server';
import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';

// use shared prisma instance

export async function GET(req: Request, context: any) {
  const { params } = context;
  const { id } = params;

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    // Verify JWT token
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const user = await verifyJWT(token);

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get a single user
    const foundUser = await prisma.user.findUnique({
      where: { id },
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
            cohorts: true,
            creatives: true
          }
        }
      }
    });

    if (!foundUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(foundUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: Request, context: any) {
  const { params } = context;
  const { id } = params;
    const { email, name, role, status, avatarUrl } = await req.json();

    const updateData: any = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (role) updateData.role = role as UserRole;
    if (status) updateData.status = status as UserStatus;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          avatarUrl: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return NextResponse.json(updatedUser);
    } catch (error) {
      if ((error as any).code === 'P2025') {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      console.error('Error updating user', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  export async function DELETE(req: Request, context: any) {
    const { params } = context;
    const { id } = params;

      try {
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ message: 'User deleted successfully' });
      } catch (error) {
        if ((error as any).code === 'P2025') {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        console.error('Error deleting user', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
      }
    }
// end default
// top-level catch can be removed; each method handles its own errors