import { Response, NextFunction } from 'express';
import type { AuthRequest } from '@/types/express-types';
import { PrismaClient, ProjectRole, ProjectStatus } from '@prisma/client';
import { ApiError } from '../utils/ApiError';

const prisma = new PrismaClient();

// Get all projects with pagination and filters
type GetProjectsQuery = {
  page?: string;
  limit?: string;
  status?: string;
  sort?: string;
  order?: 'asc' | 'desc';
};

type MemberPayload = {
  userId: string;
  role?: ProjectRole;
};

type CreateProjectBody = {
  name: string;
  description?: string | null;
  startDate: string | number | Date;
  endDate?: string | null;
  members?: MemberPayload[];
};

type UpdateProjectBody = Partial<{
  name: string;
  description: string | null;
  status: ProjectStatus;
  startDate: string | number | Date;
  endDate: string | null;
}>;

export const getProjects = async (req: AuthRequest<Record<string, never>, any, undefined, GetProjectsQuery>, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
    }

    const { page = 1, limit = 20, status, sort = 'created_at', order = 'desc' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      members: {
        some: {
          userId: req.user.id
        }
      },
      ...(status && { status: status as any })
    };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          members: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              },
              role: true
            }
          },
          _count: {
            select: {
              tasks: true
            }
          }
        },
        orderBy: {
          [sort as string]: order
        },
        skip,
        take: Number(limit)
      }),
      prisma.project.count({ where })
    ]);

    res.json({
      data: projects,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        total_pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    return next(error);
  }
};

// Get project by ID
export const getProjectById = async (req: AuthRequest<{ id: string }, any, undefined>, res: Response, next: NextFunction) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            role: true
          }
        },
        _count: {
          select: {
            tasks: true
          }
        }
      }
    });

    if (!project) {
      throw ApiError.notFound('Project not found');
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

// Create new project
export const createProject = async (req: AuthRequest<Record<string, never>, any, CreateProjectBody>, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
    }

    const { name, description, startDate, endDate, members = [] } = req.body || {};

    // Add creator as owner
    members.push({
      userId: req.user.id,
      role: ProjectRole.OWNER
    });

    const project = await prisma.project.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        members: {
          create: members.map(m => ({ user: { connect: { id: m.userId } }, role: (m.role as ProjectRole) || ProjectRole.MEMBER }))
        }
      },
      include: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            role: true
          }
        }
      }
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Update project
export const updateProject = async (req: AuthRequest<{ id: string }, any, UpdateProjectBody>, res: Response, next: NextFunction) => {
  try {
    const { name, description, status, startDate, endDate } = req.body || {};

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(status && { status }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) })
      },
      include: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            role: true
          }
        }
      }
    });

    res.json(project);
  } catch (error) {
    next(error);
  }
};

// Delete project
export const deleteProject = async (req: AuthRequest<{ id: string }, any, undefined>, res: Response, next: NextFunction) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Add project member
export const addProjectMember = async (req: AuthRequest<{ id: string }, any, { userId: string; role: ProjectRole }>, res: Response, next: NextFunction) => {
  try {
    const { userId, role } = req.body;

    const projectMember = await prisma.projectMember.create({
      data: {
        projectId: req.params.id,
        userId,
        role
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(projectMember);
  } catch (error) {
    next(error);
  }
};

// Update project member role
export const updateProjectMember = async (req: AuthRequest<{ id: string; userId: string }, any, { role: ProjectRole }>, res: Response, next: NextFunction) => {
  try {
    const { role } = req.body;

    const projectMember = await prisma.projectMember.update({
      where: {
        projectId_userId: {
          projectId: req.params.id,
          userId: req.params.userId
        }
      },
      data: { role },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json(projectMember);
  } catch (error) {
    next(error);
  }
};

// Remove project member
export const removeProjectMember = async (req: AuthRequest<{ id: string; userId: string }, any, undefined>, res: Response, next: NextFunction) => {
  try {
    await prisma.projectMember.delete({
      where: {
        projectId_userId: {
          projectId: req.params.id,
          userId: req.params.userId
        }
      }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};