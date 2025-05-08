// import { User, ProjectRole } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        name: string;
      };
      projectRole?: ProjectRole; // Current user's role in the project context
    }
  }
}