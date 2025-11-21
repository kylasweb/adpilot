import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { StaffRoleType } from '@prisma/client';

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

    // This is a simplified version - in production, you'd track stage transitions
    const velocityData = [
      { stage: 'New → Contacted', avgDays: 1.2, target: 1.0, status: 'warning' },
      { stage: 'Contacted → Qualified', avgDays: 3.5, target: 4.0, status: 'good' },
      { stage: 'Qualified → Proposal', avgDays: 5.8, target: 5.0, status: 'warning' },
      { stage: 'Proposal → Closed', avgDays: 2.0, target: 3.0, status: 'good' }
    ];

    return NextResponse.json(velocityData);
  } catch (error) {
    console.error('Error in lead-velocity:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}