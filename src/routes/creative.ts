import { Router } from 'express';
import { authorize } from '../middleware/authorize';
import {
    getCreatives,
    getCreativeById,
    createCreative,
    updateCreative,
    deleteCreative
} from '../controllers/creative';

const router = Router();

// Apply authorization middleware to all routes
router.use(authorize());

// Get all creatives with filtering and pagination
router.get('/',
    getCreatives
);

// Create a new creative
router.post('/',
    createCreative
);

// Get a single creative by ID
router.get('/:id',
    getCreativeById
);

// Update a creative
router.put('/:id',
    updateCreative
);

// Delete a creative
router.delete('/:id',
    deleteCreative
);

export default router;