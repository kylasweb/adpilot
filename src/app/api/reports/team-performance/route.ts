import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/auth';
import { UserRole, StaffRoleType } from '@prisma/client';

// using shared prisma instance for serverless compatibility

export async function GET(req: Request) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyJWT(token);
    if (!user || (user.staffRole as { role: StaffRoleType })?.role !== StaffRoleType.C_LEVEL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const agents = await prisma.user.findMany({
      where: {
        assignedLeads: {
          some: {}
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        assignedLeads: {
          select: {
            id: true,
            status: true,
            score: true,
            estimatedValue: true
          }
        }
      }
    });

    const teamData = agents.map(agent => {
      const leads = agent.assignedLeads;
      const qualified = leads.filter(l => l.status === 'QUALIFIED').length;
      const closed = leads.filter(l => l.status === 'CLOSED_WON').length;
      const totalValue = leads
        .filter(l => l.status === 'CLOSED_WON')
        .reduce((sum, l) => sum + (l.estimatedValue || 0), 0);

      // Calculate quota achievement (simplified - would need target data in real scenario)
      const quota = leads.length > 0 ? Math.min(100, Math.round((closed / leads.length) * 100 * 2)) : 0;

      return {
        agent: agent.name,
        leads: leads.length,
        qualified,
        closed,
        value: totalValue,
        quota
      };
    });

    return NextResponse.json(teamData);
  } catch (error) {
    console.error('Error fetching team performance:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}