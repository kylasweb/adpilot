import { Router, RequestHandler } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { authorize } from '../middleware/authorize';
import {
    getCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign
} from '../controllers/campaigns';
import {
    createCampaignSchema,
    updateCampaignSchema
} from '../schemas/campaign';

const router = Router();

// Get all campaigns (with pagination and filters)
router.get('/',
    authorize(),
    getCampaigns
);

// Get specific campaign
router.get('/:id',
    authorize(),
    getCampaignById as RequestHandler
);

// Create new campaign
router.post('/',
    authorize(),
    validateRequest(createCampaignSchema),
    createCampaign
);

// Update campaign
router.put('/:id',
    authorize(),
    validateRequest(updateCampaignSchema),
    updateCampaign
);

// Delete campaign
router.delete('/:id',
    authorize(),
    deleteCampaign
);

export default router;