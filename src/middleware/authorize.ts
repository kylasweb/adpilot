import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';

interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export const authorize = (allowedRoles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract token from authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        throw ApiError.unauthorized('No token provided');
      }

      const token = authHeader.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JWTPayload;

      // Fetch user from database to get role information
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) {
        throw ApiError.unauthorized('User not found');
      }

      // Set user info in request with role information
      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      };

      // If roles are specified, check project-specific permissions
      if (allowedRoles && req.params.id) {
        const projectMember = await prisma.projectMember.findUnique({
          where: {
            projectId_userId: {
              projectId: req.params.id,
              userId: user.id
            }
          }
        });

        if (!projectMember || (allowedRoles && !allowedRoles.includes(projectMember.role))) {
          throw ApiError.forbidden('Insufficient permissions for this operation');
        }

        // Set project role in request for downstream use
        req.projectRole = projectMember?.role;
      }

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        next(ApiError.unauthorized('Invalid token'));
      } else if (error instanceof ApiError) {
        next(error);
      } else {
        next(ApiError.internal('Authentication error'));
      }
    }
  };
};

// Middleware to check if user has required project role
export const requireProjectRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        throw ApiError.unauthorized('User not authenticated');
      }

      const projectMember = await prisma.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId,
            userId
          }
        }
      });

      if (!projectMember || (allowedRoles && !allowedRoles.includes(projectMember.role))) {
        throw ApiError.forbidden('Insufficient project permissions');
      }

      req.projectRole = projectMember?.role;
      next();
    } catch (error) {
      next(error instanceof ApiError ? error : ApiError.internal());
    }
  };
};