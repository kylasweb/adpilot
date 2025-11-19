import { Router } from 'express';
import { authorize } from '../middleware/authorize';
import {
    getUserSettings,
    updateUserProfile,
    updatePassword,
    updateOrganizationSettings,
    deleteAccount
} from '../controllers/settings';

const router = Router();

// Apply authorization middleware to all routes
router.use(authorize());

// Get user settings
router.get('/',
    getUserSettings
);

// Update user profile
router.put('/profile',
    updateUserProfile
);

// Update password
router.put('/password',
    updatePassword
);

// Update organization settings
router.put('/organization',
    updateOrganizationSettings
);

// Delete account
router.delete('/account',
    deleteAccount
);

export default router;