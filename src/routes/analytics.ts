import { Router } from 'express';
import { authorize } from '../middleware/authorize';
import {
    getPerformanceOverview,
    getCampaignMetrics,
    getAudienceInsights
} from '../controllers/analytics';

const router = Router();

// Apply authorization middleware to all routes
router.use(authorize());

// Get performance overview data
router.get('/performance',
    getPerformanceOverview
);

// Get campaign metrics
router.get('/campaigns',
    getCampaignMetrics
);

// Get audience insights
router.get('/audience',
    getAudienceInsights
);

export default router;