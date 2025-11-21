import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getLeadFilter } from '@/lib/leadUtils';
import { User } from '@prisma/client';

export async function POST(req: Request, context: any) {
  const { params } = context;
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyJWT(token) as User;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { score, factors, confidence, notes } = await req.json();

    if (!score || score < 0 || score > 100) {
      return NextResponse.json({ error: 'Score must be between 0 and 100' }, { status: 400 });
    }

    // Check if lead is accessible
    const lead = await prisma.lead.findFirst({
      where: { id: id as string, ...getLeadFilter(user) }
    });
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found or access denied' }, { status: 404 });
    }

    // Create score record
    const leadScore = await prisma.leadScore.create({
      data: {
        leadId: id as string,
        score,
        ivrUrgency: factors?.ivrUrgency,
        accountType: factors?.accountType,
        engagement: factors?.engagement,
        companySize: factors?.companySize,
        industry: factors?.industry,
        confidence,
        calculatedBy: user.id,
        notes
      }
    });

    // Update lead's current score
    await prisma.lead.update({
      where: { id: id as string },
      data: { score }
    });

    // Log activity
    await prisma.leadActivity.create({
      data: {
        leadId: id as string,
        type: 'SCORE_UPDATE',
        action: 'Score updated',
        details: `Score changed to ${score}`,
        performedBy: user.id
      }
    });

    return NextResponse.json(leadScore, { status: 201 });
  } catch (error) {
    console.error('Error updating lead score:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}