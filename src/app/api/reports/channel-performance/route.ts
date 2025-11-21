import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';

// use shared prisma client for serverless

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

    const channels = await prisma.lead.groupBy({
      by: ['source'],
      _count: true,
      _sum: { estimatedValue: true },
      _avg: { score: true }
    });

    // Calculate conversion rates per channel
    const channelData = await Promise.all(
      channels.map(async (channel) => {
        const [total, closedWon] = await Promise.all([
          prisma.lead.count({ where: { source: channel.source } }),
          prisma.lead.count({
            where: {
              source: channel.source,
              status: 'CLOSED_WON'
            }
          })
        ]);

        const conversionRate = total > 0 ? (closedWon / total) * 100 : 0;
        const value = channel._sum.estimatedValue || 0;
        const roi = value > 0 ? Math.round((value / total) * 10) : 0; // Simplified ROI calculation

        return {
          channel: channel.source,
          leads: channel._count,
          conversion: Math.round(conversionRate * 10) / 10,
          value,
          roi
        };
      })
    );

    return NextResponse.json(channelData);
  } catch (error) {
    console.error('Error fetching channel performance:', error);
    return NextResponse.json({ error: 'Failed to fetch channel performance' }, { status: 500 });
  }
}