import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyJWT(token);
    if (!user || (user as unknown as { role: UserRole }).role !== UserRole.ADMIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { action, userIds } = await req.json();

    if (!action || !userIds || !Array.isArray(userIds)) {
      return NextResponse.json({ error: 'Action and userIds array required' }, { status: 400 });
    }

    let count = 0;

    switch (action) {
      case 'activate':
        const activateResult = await prisma.user.updateMany({
          where: { id: { in: userIds }, status: 'INACTIVE' },
          data: { status: 'ACTIVE' }
        });
        count = activateResult.count;
        break;

      case 'deactivate':
        const deactivateResult = await prisma.user.updateMany({
          where: { id: { in: userIds }, status: 'ACTIVE' },
          data: { status: 'INACTIVE' }
        });
        count = deactivateResult.count;
        break;

      case 'suspend':
        const suspendResult = await prisma.user.updateMany({
          where: { id: { in: userIds }, status: { not: 'SUSPENDED' } },
          data: { status: 'SUSPENDED' }
        });
        count = suspendResult.count;
        break;

      case 'delete':
        const deleteResult = await prisma.user.deleteMany({
          where: { id: { in: userIds } }
        });
        count = deleteResult.count;
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ message: `${count} users ${action}d successfully` });
  } catch (error) {
    console.error('Error performing bulk action:', error);
    return NextResponse.json({ error: 'Failed to perform bulk action' }, { status: 500 });
  }
}