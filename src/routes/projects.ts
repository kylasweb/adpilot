import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { authorize } from '../middleware/authorize';
// import { ProjectRole } from '@prisma/client';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember,
  updateProjectMember
} from '../controllers/projects';
import {
  createProjectSchema,
  updateProjectSchema,
  projectMemberSchema
} from '../schemas/project';

const router = Router();

// Get all projects (with pagination and filters)
router.get('/', 
  authorize(),
  getProjects
);

// Get specific project
router.get('/:id',
  authorize(),
  getProjectById as RequestHandler
);

// Create new project
router.post('/',
  authorize(),
  validateRequest(createProjectSchema),
  createProject
);

// Update project
router.put('/:id',
  authorize([ProjectRole.OWNER, ProjectRole.ADMIN]),
  validateRequest(updateProjectSchema),
  updateProject
);

// Delete project
router.delete('/:id',
  authorize(),
  deleteProject
);

// Add project member
router.post('/:id/members',
  authorize([ProjectRole.OWNER, ProjectRole.ADMIN]),
  validateRequest(projectMemberSchema),
  addProjectMember
);

// Update project member role
router.put('/:id/members/:userId',
  authorize([ProjectRole.OWNER, ProjectRole.ADMIN]),
  validateRequest(projectMemberSchema),
  updateProjectMember
);

// Remove project member
router.delete('/:id/members/:userId',
  authorize([ProjectRole.OWNER, ProjectRole.ADMIN]),
  removeProjectMember
);

export default router;