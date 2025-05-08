import { z } from 'zod';
import { ProjectRole, ProjectStatus } from '@prisma/client';

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Project name is required').max(100),
    description: z.string().optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime().optional(),
    members: z.array(z.object({
      userId: z.string().uuid(),
      role: z.string()
    })).optional()
  })
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().uuid()
  }),
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    status: z.nativeEnum(ProjectStatus).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional()
  })
});

export const projectMemberSchema = z.object({
  params: z.object({
    id: z.string().uuid()
  }),
  body: z.object({
    userId: z.string().uuid(),
    role: z.nativeEnum(ProjectRole)
  })
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
export type ProjectMemberSchema = z.infer<typeof projectMemberSchema>;