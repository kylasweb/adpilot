import { UserRole } from '@prisma/client';

export function getLeadFilter(user: { id: string; role: UserRole }) {
  // Implement based on user role and permissions
  // For now, return empty filter
  return {};
}