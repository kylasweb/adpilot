import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, LeadStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '../../../lib/auth';

// Use shared prisma client from server-db to avoid spawning clients in serverless

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyJWT(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const assignedTo = searchParams.get('assignedTo');

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    // Search by name or email
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Filter by status
    if (status && status !== 'ALL') {
      where.status = status as LeadStatus;
    }

    // Filter by source
    if (source && source !== 'ALL') {
      where.source = source;
    }

    // Filter by assigned user
    if (assignedTo && assignedTo !== 'ALL') {
      where.assignedTo = assignedTo;
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limitNum,
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
          _count: {
            select: {
              activities: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.lead.count({ where })
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyJWT(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, company, source, status = 'NEW', estimatedValue, assignedTo } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Check if lead already exists
    const existingLead = await prisma.lead.findFirst({
      where: { email }
    });

    if (existingLead) {
      return NextResponse.json({ error: 'Lead with this email already exists' }, { status: 409 });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        company,
        source,
        status: status as LeadStatus,
        estimatedValue: estimatedValue ? parseFloat(estimatedValue) : null,
        assignedTo
      },
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

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}