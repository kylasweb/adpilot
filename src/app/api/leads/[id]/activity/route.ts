import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { User } from '@/types/auth.types';
import { PrismaClient, UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getLeadFilter } from '@/lib/leadUtils';

// use shared prisma client for serverless functions

export async function POST(req: Request, context: any) {
  const { params } = context;
  // Only POST is supported

  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyJWT(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;
    const body = await req.json();
    const { type, action, details, metadata } = body;

    // Check if user can access this lead
    const lead = await prisma.lead.findFirst({
      where: {
        id: id as string,
        ...getLeadFilter({ id: user.id as string, role: user.role as UserRole })
      }
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found or access denied' }, { status: 404 });
    }

    const activity = await prisma.leadActivity.create({
      data: {
        leadId: id as string,
        type,
        action,
        details,
        performedBy: (user as unknown as User).id,
        metadata
      }
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}