import { Router } from 'express';
import { authorize } from '../middleware/authorize';
import { testDatabaseConnection, getDatabaseInfo } from '../utils/test-db-connection';

const router = Router();

// Apply authorization middleware to all routes
router.use(authorize());

// Test database connection
router.get('/connection', async (req, res) => {
    try {
        const isConnected = await testDatabaseConnection();

        if (isConnected) {
            res.json({
                success: true,
                message: 'Database connection successful'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Database connection failed'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database connection test error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get database info
router.get('/info', async (req, res) => {
    try {
        const dbInfo = await getDatabaseInfo();

        if (dbInfo) {
            res.json({
                success: true,
                data: dbInfo
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to get database info'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database info error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;