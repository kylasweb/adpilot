/**
 * Server-side Database Client
 * 
 * This file creates a Prisma client instance that is only accessible on the server-side.
 * It ensures that database credentials are never exposed to client-side code.
 */

import { PrismaClient } from '@prisma/client';

// Declare global type for Prisma client (for Next.js hot reloading)
declare global {
    var prisma: PrismaClient | undefined;
}

// Create Prisma client instance (server-side only)
export const serverDb: PrismaClient = globalThis.prisma || new PrismaClient();

// In development, store the Prisma client globally to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = serverDb;
}

// Ensure we're only running on the server
if (typeof window !== 'undefined') {
    throw new Error('Server-side database client cannot be used on the client-side');
}

export default serverDb;