import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getLeadFilter } from '@/lib/leadUtils';
import { User, LeadStatus } from '@prisma/client';

export async function GET(req: Request) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyJWT(token) as User;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await prisma.lead.groupBy({
      by: ['status'],
      _count: { status: true },
      where: { ...getLeadFilter(user) }
    });

    const totalLeads = stats.reduce((sum, stat) => sum + stat._count.status, 0);
    const conversionRate = totalLeads > 0 ? (stats.find(s => s.status === ('converted' as LeadStatus))?._count.status || 0) / totalLeads * 100 : 0;

    return NextResponse.json({
      data: {
        totalLeads,
        statusBreakdown: stats,
        conversionRate: Math.round(conversionRate * 100) / 100
      }
    });
  } catch (error) {
    console.error('Error fetching lead stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}