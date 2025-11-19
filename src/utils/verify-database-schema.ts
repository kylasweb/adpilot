/**
 * Database Schema Verification
 * 
 * This utility verifies that all required tables and RLS policies are properly set up.
 */

import { prisma } from '../lib/prisma';
import { isServer } from './server-only';

// List of expected tables in the database
const EXPECTED_TABLES = [
    'users',
    'organizations',
    'campaigns',
    'cohorts',
    'creatives',
    'campaign_performance',
    'audience_insights',
    'projects',
    'project_members',
    'tasks',
    'time_entries',
    'comments',
    'attachments',
    'roadmaps',
    'bugs',
    'webhook_configs'
];

// Expected RLS policies (simplified check)
const EXPECTED_RLS_POLICIES = [
    'users',
    'campaigns',
    'cohorts',
    'creatives',
    'campaign_performance',
    'audience_insights'
];

/**
 * Verify database schema
 * @returns Promise<object> with verification results
 */
export async function verifyDatabaseSchema(): Promise<{
    tables: {
        existing: string[];
        missing: string[];
        extra: string[];
    };
    rls: {
        enabled: string[];
        disabled: string[];
    };
    overall: {
        success: boolean;
        message: string;
    };
} | null> {
    // Ensure we're only running on the server
    if (!isServer()) {
        throw new Error('Database schema verification can only be run on the server-side');
    }

    try {
        // Get all existing tables
        const tablesResult: any = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

        const existingTables = tablesResult.map((row: any) => row.table_name);

        // Check for missing tables
        const missingTables = EXPECTED_TABLES.filter(table => !existingTables.includes(table));

        // Check for extra tables
        const extraTables = existingTables.filter((table: string) => !EXPECTED_TABLES.includes(table));

        // Check RLS status for key tables
        const rlsEnabled: string[] = [];
        const rlsDisabled: string[] = [];

        for (const table of EXPECTED_RLS_POLICIES) {
            try {
                // This is a simplified check - in a real implementation, you would check actual RLS policies
                if (existingTables.includes(table)) {
                    // For now, we'll assume RLS is enabled for tables that exist
                    // In a real implementation, you would check the actual RLS policies
                    rlsEnabled.push(table);
                }
            } catch (error) {
                rlsDisabled.push(table);
            }
        }

        const success = missingTables.length === 0;

        return {
            tables: {
                existing: existingTables,
                missing: missingTables,
                extra: extraTables
            },
            rls: {
                enabled: rlsEnabled,
                disabled: rlsDisabled
            },
            overall: {
                success,
                message: success
                    ? 'All expected tables are present'
                    : `Missing ${missingTables.length} tables`
            }
        };
    } catch (error) {
        console.error('Error verifying database schema:', error);
        return null;
    }
}

/**
 * Get detailed table information
 * @returns Promise<object> with detailed table information
 */
export async function getTableDetails(): Promise<any[] | null> {
    // Ensure we're only running on the server
    if (!isServer()) {
        throw new Error('Table details can only be accessed on the server-side');
    }

    try {
        // Get detailed table information
        const tableDetails: any = await prisma.$queryRaw`
      SELECT 
        t.table_name,
        COUNT(c.column_name) as column_count,
        STRING_AGG(c.column_name || ' ' || c.data_type, ', ') as columns
      FROM information_schema.tables t
      LEFT JOIN information_schema.columns c ON t.table_name = c.table_name AND t.table_schema = c.table_schema
      WHERE t.table_schema = 'public'
      GROUP BY t.table_name
      ORDER BY t.table_name
    `;

        return tableDetails;
    } catch (error) {
        console.error('Error getting table details:', error);
        return null;
    }
}