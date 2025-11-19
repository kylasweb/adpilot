import { Router } from 'express';
import { authorize } from '../middleware/authorize';
import { verifyDatabaseSchema, getTableDetails } from '../utils/verify-database-schema';

const router = Router();

// Apply authorization middleware to all routes
router.use(authorize());

// Check database schema
router.get('/tables', async (req, res) => {
    try {
        const schemaInfo = await verifyDatabaseSchema();

        if (schemaInfo) {
            res.json({
                success: true,
                data: schemaInfo
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to verify database schema'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database schema verification error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get detailed table information
router.get('/tables/details', async (req, res) => {
    try {
        const tableDetails = await getTableDetails();

        if (tableDetails) {
            res.json({
                success: true,
                data: tableDetails
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to get table details'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Table details error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;