import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';

// use shared prisma instance

export async function GET(req: Request) {
  try {
    // Extract and verify token
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const user = await verifyJWT(token);

    if (!user || user.role !== 'C_LEVEL') {
      return NextResponse.json({ error: 'Forbidden: C-Level access required' }, { status: 403 });
    }

    const [
      totalPipeline,
      avgLeadVelocity,
      conversionRate,
      activeLeads
    ] = await Promise.all([
      // Total pipeline value
      prisma.lead.aggregate({
        _sum: { estimatedValue: true }
      }),

      // Average lead velocity (days from creation to closed)
      prisma.$queryRaw<Array<{ avg_days: number }>>`
        SELECT
          AVG(EXTRACT(DAY FROM (updated_at - created_at))) as avg_days
        FROM leads
        WHERE status IN ('CLOSED_WON', 'CLOSED_LOST')
      `,

      // Conversion rate
      prisma.lead.groupBy({
        by: ['status'],
        _count: true
      }),

      // Active leads count
      prisma.lead.count({
        where: {
          status: {
            notIn: ['CLOSED_WON', 'CLOSED_LOST']
          }
        }
      })
    ]);

    const totalLeads = conversionRate.reduce((sum, group) => sum + group._count, 0);
    const closedWon = conversionRate.find(g => g.status === 'CLOSED_WON')?._count || 0;
    const conversionPct = totalLeads > 0 ? (closedWon / totalLeads) * 100 : 0;

    return NextResponse.json({
      totalPipeline: totalPipeline._sum.estimatedValue || 0,
      avgLeadVelocity: Math.round(avgLeadVelocity[0]?.avg_days || 0),
      conversionRate: Math.round(conversionPct * 10) / 10,
      activeLeads
    });
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    return NextResponse.json({ error: 'Failed to fetch KPIs' }, { status: 500 });
  }
}