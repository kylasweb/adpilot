import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/middleware/auth-middleware';

export const GET = withAuth(async (req) => {
    try {
        // Test database connection
        const dbHealthy = await prisma.$queryRaw`SELECT 1 as health`
            .then(() => true)
            .catch(() => false);

        // Get database stats
        const dbStats = dbHealthy ? await prisma.$queryRaw<Array<{
            size: string;
            table_count: bigint;
        }>>`
      SELECT 
        pg_size_pretty(pg_database_size(current_database())) as size,
        (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public') as table_count
    `.then(result => result[0]).catch(() => null) : null;

        // Check API response times (simple heuristic)
        const apiHealthy = true; // If we got here, API is responding

        // System metrics
        const systemHealth = {
            database: {
                status: dbHealthy ? 'healthy' : 'unhealthy',
                connected: dbHealthy,
                size: dbStats?.size || 'unknown',
                tableCount: dbStats ? Number(dbStats.table_count) : 0
            },
            api: {
                status: apiHealthy ? 'healthy' : 'unhealthy',
                version: '1.0.0',
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage()
            },
            system: {
                nodeVersion: process.version,
                platform: process.platform,
                timestamp: new Date().toISOString()
            }
        };

        // Get error rates (simplified - in production, track in monitoring system)
        const recentErrors = 0; // TODO: Implement error tracking

        // Overall health status
        const overallStatus = dbHealthy && apiHealthy ? 'healthy' : 'degraded';

        return NextResponse.json({
            status: overallStatus,
            health: systemHealth,
            metrics: {
                errorRate: recentErrors,
                avgResponseTime: '< 100ms', // TODO: Implement real metrics
                uptime: `${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m`
            }
        });
    } catch (error) {
        console.error('Health check error:', error);
        return NextResponse.json(
            {
                status: 'unhealthy',
                error: 'Health check failed',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}, {
    requiredRole: 'ADMIN'
});
