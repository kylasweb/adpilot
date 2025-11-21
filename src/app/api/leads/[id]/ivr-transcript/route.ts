import { NextResponse } from 'next/server';
import { verifyJWT } from '../../../../../lib/auth';
import { canAccessLead } from '../../../../../middleware/rbac';
import { getLeadFilter } from '../../../../../lib/leadUtils';
import { UserRole } from '@prisma/client';
import { prisma } from '../../../../../lib/prisma';

export async function POST(req: Request, context: any) {
  const { params } = context;

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
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid lead ID' }, { status: 400 });
    }

    // Check access: C_LEVEL and ADMIN can access all leads, others only their assigned leads
    const staffRole = await prisma.staffRole.findUnique({
      where: { userId: (user as unknown as { id: string }).id }
    });

    let hasAccess = false;
    if (staffRole && ['C_LEVEL', 'ADMIN'].includes(staffRole.role)) {
      hasAccess = true;
    } else {
      const lead = await prisma.lead.findUnique({
        where: { id: id as string }
      });
      if (lead && lead.assignedTo === user.id) {
        hasAccess = true;
      }
    }

    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await req.json();
    const { callDate, duration, transcript, sentiment, intent, entities, callerId, agentId, recordingUrl } = body;

    const ivrTranscript = await prisma.iVRTranscript.create({
      data: {
        leadId: id as string,
        callDate: new Date(callDate),
        duration,
        transcript,
        sentiment,
        intent,
        entities,
        callerId,
        agentId,
        recordingUrl,
      }
    });

    // Log activity
    await prisma.leadActivity.create({
      data: {
        leadId: id as string,
        type: 'NOTE',
        action: 'ivr-transcript',
        details: `IVR transcript created: ${ivrTranscript.id}`,
        performedBy: (user as unknown as { id: string }).id,
      }
    });

    return NextResponse.json(ivrTranscript, { status: 201 });
  } catch (error) {
    console.error('Error creating IVR transcript:', error);
    return NextResponse.json({ error: 'Failed to create IVR transcript' }, { status: 500 });
  }
}