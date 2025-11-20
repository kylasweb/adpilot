// import { User, ProjectRole } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        staffRole?: 'ADMIN' | 'STAFF' | 'C_LEVEL' | 'MANAGER';
      };
      projectRole?: string; // Current user's role in the project context
    }
  }
}