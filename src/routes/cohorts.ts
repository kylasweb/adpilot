import { Router, RequestHandler } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { authorize } from '../middleware/authorize';
import {
    getCohorts,
    getCohortById,
    createCohort,
    updateCohort,
    deleteCohort
} from '../controllers/cohorts';
import {
    createCohortSchema,
    updateCohortSchema
} from '../schemas/cohort';

const router = Router();

// Get all cohorts (with pagination and filters)
router.get('/',
    authorize(),
    getCohorts
);

// Get specific cohort
router.get('/:id',
    authorize(),
    getCohortById as RequestHandler
);

// Create new cohort
router.post('/',
    authorize(),
    validateRequest(createCohortSchema),
    createCohort
);

// Update cohort
router.put('/:id',
    authorize(),
    validateRequest(updateCohortSchema),
    updateCohort
);

// Delete cohort
router.delete('/:id',
    authorize(),
    deleteCohort
);

export default router;