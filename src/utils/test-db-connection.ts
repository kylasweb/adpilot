/**
 * Database Connection Test
 * 
 * This utility tests the secure database connection.
 */

import { prisma } from '../lib/prisma';
import { isServer } from './server-only';

/**
 * Test database connection
 * @returns Promise<boolean> indicating if connection was successful
 */
export async function testDatabaseConnection(): Promise<boolean> {
    // Ensure we're only running on the server
    if (!isServer()) {
        console.warn('Database connection test can only be run on the server-side');
        return false;
    }

    try {
        // Test the connection
        await prisma.$connect();

        // Run a simple query to verify
        await prisma.$queryRaw`SELECT 1`;

        console.log('✅ Database connection test passed');
        return true;
    } catch (error) {
        console.error('❌ Database connection test failed:', error);
        return false;
    } finally {
        try {
            await prisma.$disconnect();
        } catch (error) {
            // Ignore disconnect errors
        }
    }
}

/**
 * Get database info (server-side only)
 * @returns Promise<object> with database information
 */
export async function getDatabaseInfo(): Promise<{ version: string; tables: string[] } | null> {
    // Ensure we're only running on the server
    if (!isServer()) {
        throw new Error('Database info can only be accessed on the server-side');
    }

    try {
        // Get database version
        const versionResult: any = await prisma.$queryRaw`SELECT version()`;
        const version = versionResult[0].version;

        // Get table list
        const tablesResult: any = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

        const tables = tablesResult.map((row: any) => row.table_name);

        return { version, tables };
    } catch (error) {
        console.error('Error getting database info:', error);
        return null;
    }
}