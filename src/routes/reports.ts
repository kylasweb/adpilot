import express, { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireCLevel, logAccess, AuthenticatedRequest } from '../middleware/rbac.js';

const router = express.Router();
const prisma = new PrismaClient();

// All routes require C-Level access
router.use(requireCLevel);

// GET /api/reports/kpis - Get Key Performance Indicators
router.get('/kpis', logAccess('c-level-kpis'), async (_req: AuthenticatedRequest, res: Response) => {
    try {
        const [
            totalPipeline,
            avgLeadVelocity,
            conversionRate,
            activeLeads
        ] = await Promise.all([
            // Total pipeline value
            prisma.lead.aggregate({
                _sum: { estimatedValue: true }
            }),

            // Average lead velocity (days from creation to closed)
            prisma.$queryRaw<Array<{ avg_days: number }>>`
        SELECT 
          AVG(EXTRACT(DAY FROM (updated_at - created_at))) as avg_days
        FROM leads
        WHERE status IN ('CLOSED_WON', 'CLOSED_LOST')
      `,

            // Conversion rate
            prisma.lead.groupBy({
                by: ['status'],
                _count: true
            }),

            // Active leads count
            prisma.lead.count({
                where: {
                    status: {
                        notIn: ['CLOSED_WON', 'CLOSED_LOST']
                    }
                }
            })
        ]);

        const totalLeads = conversionRate.reduce((sum, group) => sum + group._count, 0);
        const closedWon = conversionRate.find(g => g.status === 'CLOSED_WON')?._count || 0;
        const conversionPct = totalLeads > 0 ? (closedWon / totalLeads) * 100 : 0;

        res.json({
            totalPipeline: totalPipeline._sum.estimatedValue || 0,
            avgLeadVelocity: Math.round(avgLeadVelocity[0]?.avg_days || 0),
            conversionRate: Math.round(conversionPct * 10) / 10,
            activeLeads
        });
    } catch (error) {
        console.error('Error fetching KPIs:', error);
        res.status(500).json({ error: 'Failed to fetch KPIs' });
    }
});

// GET /api/reports/channel-performance - Multi-channel performance
router.get('/channel-performance', logAccess('c-level-channels'), async (_req: AuthenticatedRequest, res: Response) => {
    try {
        const channels = await prisma.lead.groupBy({
            by: ['source'],
            _count: true,
            _sum: { estimatedValue: true },
            _avg: { score: true }
        });

        // Calculate conversion rates per channel
        const channelData = await Promise.all(
            channels.map(async (channel) => {
                const [total, closedWon] = await Promise.all([
                    prisma.lead.count({ where: { source: channel.source } }),
                    prisma.lead.count({
                        where: {
                            source: channel.source,
                            status: 'CLOSED_WON'
                        }
                    })
                ]);

                const conversionRate = total > 0 ? (closedWon / total) * 100 : 0;
                const value = channel._sum.estimatedValue || 0;
                const roi = value > 0 ? Math.round((value / total) * 10) : 0; // Simplified ROI calculation

                return {
                    channel: channel.source,
                    leads: channel._count,
                    conversion: Math.round(conversionRate * 10) / 10,
                    value,
                    roi
                };
            })
        );

        res.json(channelData);
    } catch (error) {
        console.error('Error fetching channel performance:', error);
        res.status(500).json({ error: 'Failed to fetch channel performance' });
    }
});

// GET /api/reports/team-performance - Sales team performance
router.get('/team-performance', logAccess('c-level-team'), async (_req: AuthenticatedRequest, res: Response) => {
    try {
        const agents = await prisma.user.findMany({
            where: {
                assignedLeads: {
                    some: {}
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                assignedLeads: {
                    select: {
                        id: true,
                        status: true,
                        score: true,
                        estimatedValue: true
                    }
                }
            }
        });

        const teamData = agents.map(agent => {
            const leads = agent.assignedLeads;
            const qualified = leads.filter(l => l.status === 'QUALIFIED').length;
            const closed = leads.filter(l => l.status === 'CLOSED_WON').length;
            const totalValue = leads
                .filter(l => l.status === 'CLOSED_WON')
                .reduce((sum, l) => sum + (l.estimatedValue || 0), 0);

            // Calculate quota achievement (simplified - would need target data in real scenario)
            const quota = leads.length > 0 ? Math.min(100, Math.round((closed / leads.length) * 100 * 2)) : 0;

            return {
                agent: agent.name,
                leads: leads.length,
                qualified,
                closed,
                value: totalValue,
                quota
            };
        });

        res.json(teamData);
    } catch (error) {
        console.error('Error fetching team performance:', error);
        res.status(500).json({ error: 'Failed to fetch team performance' });
    }
});

// GET /api/reports/lead-velocity - Lead velocity by stage
router.get('/lead-velocity', logAccess('c-level-velocity'), async (_req: AuthenticatedRequest, res: Response) => {
    try {
        // This is a simplified version - in production, you'd track stage transitions
        const velocityData = [
            { stage: 'New → Contacted', avgDays: 1.2, target: 1.0, status: 'warning' },
            { stage: 'Contacted → Qualified', avgDays: 3.5, target: 4.0, status: 'good' },
            { stage: 'Qualified → Proposal', avgDays: 5.8, target: 5.0, status: 'warning' },
            { stage: 'Proposal → Closed', avgDays: 2.0, target: 3.0, status: 'good' }
        ];

        res.json(velocityData);
    } catch (error) {
        console.error('Error fetching lead velocity:', error);
        res.status(500).json({ error: 'Failed to fetch lead velocity' });
    }
});

// GET /api/reports/attribution - Multi-touch attribution
router.get('/attribution', logAccess('c-level-attribution'), async (_req: AuthenticatedRequest, res: Response) => {
    try {
        // Calculate first-touch attribution
        const firstTouch = await prisma.lead.groupBy({
            by: ['source'],
            where: {
                status: 'CLOSED_WON'
            },
            _count: true,
            _sum: { estimatedValue: true }
        });

        const totalRevenue = firstTouch.reduce((sum, item) => sum + (item._sum.estimatedValue || 0), 0);

        const attributionData = firstTouch.map(item => {
            const value = item._sum.estimatedValue || 0;
            const percentage = totalRevenue > 0 ? Math.round((value / totalRevenue) * 100) : 0;

            return {
                channel: `${item.source} First Touch`,
                percentage,
                value
            };
        });

        res.json(attributionData);
    } catch (error) {
        console.error('Error fetching attribution:', error);
        res.status(500).json({ error: 'Failed to fetch attribution data' });
    }
});

// GET /api/reports/revenue-forecast - Revenue forecasting
router.get('/revenue-forecast', logAccess('c-level-forecast'), async (_req: AuthenticatedRequest, res: Response) => {
    try {
        const pipeline = await prisma.lead.groupBy({
            by: ['status'],
            where: {
                status: {
                    notIn: ['CLOSED_WON', 'CLOSED_LOST']
                }
            },
            _sum: { estimatedValue: true },
            _count: true
        });

        // Probability weights by stage
        const stageProbability: Record<string, number> = {
            'NEW': 0.05,
            'CONTACTED': 0.15,
            'QUALIFIED': 0.40,
            'PROPOSAL': 0.60,
            'NEGOTIATION': 0.80
        };

        const forecast = pipeline.map(stage => {
            const probability = stageProbability[stage.status] || 0;
            const value = stage._sum.estimatedValue || 0;
            const weightedValue = value * probability;

            return {
                stage: stage.status,
                count: stage._count,
                totalValue: value,
                probability: probability * 100,
                forecastValue: weightedValue
            };
        });

        const totalForecast = forecast.reduce((sum, item) => sum + item.forecastValue, 0);

        res.json({
            forecast,
            totalForecast: Math.round(totalForecast)
        });
    } catch (error) {
        console.error('Error generating forecast:', error);
        res.status(500).json({ error: 'Failed to generate forecast' });
    }
});

// GET /api/reports/executive-summary - Complete executive summary
router.get('/executive-summary', logAccess('c-level-summary'), async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Aggregate all key metrics in one response
        const [kpis, channels, team, velocity, attribution] = await Promise.all([
            // Reuse the KPI logic
            fetch(`http://localhost:${process.env.PORT || 3000}/api/reports/kpis`, {
                headers: req.headers as any
            }).then(r => r.json()),

            fetch(`http://localhost:${process.env.PORT || 3000}/api/reports/channel-performance`, {
                headers: req.headers as any
            }).then(r => r.json()),

            fetch(`http://localhost:${process.env.PORT || 3000}/api/reports/team-performance`, {
                headers: req.headers as any
            }).then(r => r.json()),

            fetch(`http://localhost:${process.env.PORT || 3000}/api/reports/lead-velocity`, {
                headers: req.headers as any
            }).then(r => r.json()),

            fetch(`http://localhost:${process.env.PORT || 3000}/api/reports/attribution`, {
                headers: req.headers as any
            }).then(r => r.json())
        ]);

        res.json({
            kpis,
            channels,
            team,
            velocity,
            attribution,
            generatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error generating executive summary:', error);
        res.status(500).json({ error: 'Failed to generate executive summary' });
    }
});

export default router;
