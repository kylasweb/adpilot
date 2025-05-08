import { Request, Response, NextFunction } from 'express';
import { PrismaClient, ProjectRole } from '@prisma/client';
import { ApiError } from '../utils/ApiError';

const prisma = new PrismaClient();

// Get all projects with pagination and filters
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

    return res.json({
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
export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
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

    return res.json(project);
  } catch (error) {
    next(error);
  }
};

// Create new project
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, startDate, endDate, members = [] } = req.body;

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
          create: members
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

    return res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Update project
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, status, startDate, endDate } = req.body;

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

    return res.json(project);
  } catch (error) {
    next(error);
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id }
    });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Add project member
export const addProjectMember = async (req: Request, res: Response, next: NextFunction) => {
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

    return res.status(201).json(projectMember);
  } catch (error) {
    next(error);
  }
};

// Update project member role
export const updateProjectMember = async (req: Request, res: Response, next: NextFunction) => {
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

    return res.json(projectMember);
  } catch (error) {
    next(error);
  }
};

// Remove project member
export const removeProjectMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.projectMember.delete({
      where: {
        projectId_userId: {
          projectId: req.params.id,
          userId: req.params.userId
        }
      }
    });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};