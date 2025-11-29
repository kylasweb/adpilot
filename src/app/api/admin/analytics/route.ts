import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/middleware/auth-middleware';

export const GET = withAuth(async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const period = searchParams.get('period') || '7d'; // 7d, 30d, 90d

        // Calculate date range
        const periodMap: Record<string, number> = {
            '7d': 7,
            '30d': 30,
            '90d': 90
        };
        const days = periodMap[period] || 7;
        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        // Get user growth data
        const users = await prisma.user.groupBy({
            by: ['createdAt'],
            _count: { id: true },
            where: {
                createdAt: { gte: startDate }
            },
            orderBy: { createdAt: 'asc' }
        });

        // Get campaign performance
        const campaigns = await prisma.campaign.findMany({
            where: {
                startDate: { gte: startDate }
            },
            select: {
                id: true,
                name: true,
                status: true,
                budget: true,
                performance: {
                    select: {
                        impressions: true,
                        clicks: true,
                        conversions: true,
                        spend: true
                    }
                }
            },
            take: 20
        });

        // Aggregate campaign metrics
        const campaignMetrics = campaigns.reduce((acc, campaign) => {
            const totals = campaign.performance.reduce((sum, perf) => ({
                impressions: sum.impressions + perf.impressions,
                clicks: sum.clicks + perf.clicks,
                conversions: sum.conversions + perf.conversions,
                spend: sum.spend + perf.spend
            }), { impressions: 0, clicks: 0, conversions: 0, spend: 0 });

            return {
                totalImpressions: acc.totalImpressions + totals.impressions,
                totalClicks: acc.totalClicks + totals.clicks,
                totalConversions: acc.totalConversions + totals.conversions,
                totalSpend: acc.totalSpend + totals.spend,
                campaigns: acc.campaigns + 1
            };
        }, { totalImpressions: 0, totalClicks: 0, totalConversions: 0, totalSpend: 0, campaigns: 0 });

        // Get lead funnel data
        const leadsByStatus = await prisma.lead.groupBy({
            by: ['status'],
            _count: { id: true },
            where: {
                createdAt: { gte: startDate }
            }
        });

        // Get top performing campaigns
        const topCampaigns = campaigns.slice(0, 10).map(c => {
            const performance = c.performance.reduce((sum, p) => ({
                impressions: sum.impressions + p.impressions,
                clicks: sum.clicks + p.clicks,
                conversions: sum.conversions + p.conversions,
                spend: sum.spend + p.spend
            }), { impressions: 0, clicks: 0, conversions: 0, spend: 0 });

            return {
                id: c.id,
                name: c.name,
                status: c.status,
                budget: c.budget,
                ...performance,
                ctr: performance.impressions > 0
                    ? ((performance.clicks / performance.impressions) * 100).toFixed(2)
                    : '0',
                conversionRate: performance.clicks > 0
                    ? ((performance.conversions / performance.clicks) * 100).toFixed(2)
                    : '0'
            };
        });

        return NextResponse.json({
            period,
            userGrowth: users.map(u => ({
                date: u.createdAt,
                count: u._count.id
            })),
            campaignMetrics: {
                ...campaignMetrics,
                avgCTR: campaignMetrics.totalImpressions > 0
                    ? ((campaignMetrics.totalClicks / campaignMetrics.totalImpressions) * 100).toFixed(2)
                    : '0',
                avgConversionRate: campaignMetrics.totalClicks > 0
                    ? ((campaignMetrics.totalConversions / campaignMetrics.totalClicks) * 100).toFixed(2)
                    : '0'
            },
            leadFunnel: leadsByStatus.map(l => ({
                status: l.status,
                count: l._count.id
            })),
            topCampaigns
        });
    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics data' },
            { status: 500 }
        );
    }
}, {
    requiredRole: 'ADMIN'
});
