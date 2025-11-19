import { Router } from 'express';
import { authorize } from '../middleware/authorize';
import {
    getDashboardStats,
    getRecentActivity
} from '../controllers/dashboard';

const router = Router();

// Get dashboard statistics
router.get('/stats',
    authorize(),
    getDashboardStats
);

// Get recent activity
router.get('/activity/recent',
    authorize(),
    getRecentActivity
);

export default router;