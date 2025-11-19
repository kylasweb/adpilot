/**
 * Database Configuration
 * 
 * This file contains server-side only database configuration.
 * The DATABASE_URL is only accessible on the server-side and 
 * will not be exposed to client-side code.
 */

// Server-side only database configuration
export const databaseConfig = {
    url: process.env.DATABASE_URL || '',
};

// Ensure the database URL is set
if (!databaseConfig.url) {
    throw new Error('DATABASE_URL is not set in environment variables');
}

// Function to get database URL (server-side only)
export function getDatabaseUrl(): string {
    if (typeof window !== 'undefined') {
        // This code is running on the client-side
        throw new Error('Database URL is not accessible on the client-side');
    }

    return databaseConfig.url;
}