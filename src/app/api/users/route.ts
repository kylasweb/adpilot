import { NextResponse } from 'next/server';
import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';

// use shared prisma instance

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const token = authHeader.substring(7);
    const user = await verifyJWT(token);
    if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const limit = url.searchParams.get('limit') ?? '10';
    const search = url.searchParams.get('search') ?? '';
    const role = url.searchParams.get('role');
    const status = url.searchParams.get('status');

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    if (role && role !== 'ALL') where.role = role as UserRole;
    if (status && status !== 'ALL') where.status = status as UserStatus;

    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take: limitNum, select: { id: true, email: true, name: true, avatarUrl: true, role: true, status: true, createdAt: true, updatedAt: true, organization: { select: { id: true, name: true } }, _count: { select: { campaigns: true, projects: true } } }, orderBy: { createdAt: 'desc' } }),
      prisma.user.count({ where })
    ]);

    return NextResponse.json({ users, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
      const authHeader = req.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const token = authHeader.substring(7);
      const user = await verifyJWT(token);
      if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

      const body = await req.json();
      const { email, name, password, role = 'USER', status = 'ACTIVE', avatarUrl } = body;
      if (!email || !name || !password) return NextResponse.json({ error: 'Email, name, and password are required' }, { status: 400 });

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });

      const newUser = await prisma.user.create({ data: { email, name, password, role: role as UserRole, status: status as UserStatus, avatarUrl }, select: { id: true, email: true, name: true, avatarUrl: true, role: true, status: true, createdAt: true, updatedAt: true } });

      return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}