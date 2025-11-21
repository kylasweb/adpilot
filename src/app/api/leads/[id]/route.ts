import { NextResponse } from 'next/server';
import { PrismaClient, LeadStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '../../../../lib/auth';

// use shared prisma instance

export async function GET(req: Request, context: any) {
  const { params } = context;
  const id = params.id;

  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await verifyJWT(token);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const lead = await prisma.lead.findUnique({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        status: true,
        source: true,
        score: true,
        estimatedValue: true,
        createdAt: true,
        updatedAt: true,
        assignedTo: true,
        activities: {
          select: { id: true, type: true, createdAt: true },
          orderBy: { createdAt: 'desc' }
        },
        _count: { select: { activities: true } }
      }
    });

    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
  }
}

export async function PUT(req: Request, context: any) {
  const { params } = context;
  const id = params.id;

  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await verifyJWT(token);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, email, phone, company, status, source, score, estimatedValue, assignedToId } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (company !== undefined) updateData.company = company;
    if (status) updateData.status = status as LeadStatus;
    if (source) updateData.source = source;
    if (score !== undefined) updateData.score = score;
    if (estimatedValue !== undefined) updateData.estimatedValue = estimatedValue;
    if (assignedToId !== undefined) updateData.assignedToId = assignedToId;

    const lead = await prisma.lead.update({
      where: { id: id as string },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        status: true,
        source: true,
        score: true,
        estimatedValue: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(lead);
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  const { params } = context;
  const id = params.id;

  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await verifyJWT(token);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await prisma.lead.delete({ where: { id: id as string } });

    return NextResponse.json({ message: 'Lead deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    console.error('Error deleting lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
// duplicate block removed