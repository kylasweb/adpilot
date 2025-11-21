import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { prisma } from '../lib/prisma';
import { serverOnly } from '../utils/server-only';
import { AnalyticsFilterSchema } from '../schemas/analytics';

// Get performance overview data
export const getPerformanceOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Parse and validate query parameters
        const filterResult = AnalyticsFilterSchema.safeParse(req.query);
        if (!filterResult.success) {
            throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid filter parameters');
        }

        const { dateRange, campaignId, platform } = filterResult.data;

        // Get user's campaigns
        const campaigns = await prisma.campaign.findMany({
            where: {
                userId: req.user.id,
                ...(campaignId && { id: campaignId })
            },
            select: {
                id: true,
                name: true,
                budget: true,
                status: true,
                startDate: true,
                endDate: true,
            }
        });

        // Calculate performance metrics
        const campaignIds = campaigns.map((c: { id: string }) => c.id);

        // Get impressions, clicks, conversions data
        const performanceData: any[] = await prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        SUM(impressions) as impressions,
        SUM(clicks) as clicks,
        SUM(conversions) as conversions
      FROM campaign_performance 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY DATE(created_at)
      ORDER BY date
    `;

        // Get campaign ROAS data
        const campaignRoasData: any[] = await prisma.$queryRaw`
      SELECT 
        c.name,
        SUM(cp.spend) as total_spend,
        SUM(cp.conversions * 50) as total_value
      FROM campaigns c
      JOIN campaign_performance cp ON c.id = cp.campaign_id
      WHERE c.id IN (${campaignIds})
      GROUP BY c.id, c.name
    `;

        // Calculate ROAS for each campaign
        const roasData = campaignRoasData.map((data: any) => ({
            name: data.name,
            value: data.total_spend > 0 ? parseFloat((data.total_value / data.total_spend).toFixed(2)) : 0
        }));

        // Get placement distribution data
        const placementData: any[] = await prisma.$queryRaw`
      SELECT 
        platform,
        COUNT(*) as count
      FROM campaign_performance 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY platform
    `;

        // Format placement data as percentages
        const totalPlacements = placementData.reduce((sum: number, item: any) => sum + item.count, 0);
        const placementDistribution = placementData.map((item: any) => ({
            name: item.platform,
            value: parseFloat(((item.count / totalPlacements) * 100).toFixed(0))
        }));

        // Calculate summary statistics
        const totalImpressions = performanceData.reduce((sum: number, day: any) => sum + parseInt(day.impressions), 0);
        const totalClicks = performanceData.reduce((sum: number, day: any) => sum + parseInt(day.clicks), 0);
        const totalConversions = performanceData.reduce((sum: number, day: any) => sum + parseInt(day.conversions), 0);

        const ctr = totalImpressions > 0 ? parseFloat(((totalClicks / totalImpressions) * 100).toFixed(2)) : 0;
        const avgRoas = roasData.length > 0
            ? parseFloat((roasData.reduce((sum: number, item: any) => sum + item.value, 0) / roasData.length).toFixed(2))
            : 0;

        res.json({
            performanceTrends: performanceData,
            campaignRoas: roasData,
            placementDistribution,
            summary: {
                totalImpressions,
                totalClicks,
                totalConversions,
                ctr,
                avgRoas
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get campaign metrics
export const getCampaignMetrics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Parse and validate query parameters
        const filterResult = AnalyticsFilterSchema.safeParse(req.query);
        if (!filterResult.success) {
            throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid filter parameters');
        }

        const { dateRange, campaignId, platform } = filterResult.data;

        // Get user's campaigns with performance data
        const campaigns = await prisma.campaign.findMany({
            where: {
                userId: req.user.id,
                ...(campaignId && { id: campaignId })
            },
            include: {
                performance: {
                    where: {
                        ...(platform && { platform })
                    }
                }
            }
        });

        // Calculate metrics for each campaign
        const campaignMetrics = campaigns.map((campaign: any) => {
            const totalImpressions = campaign.performance.reduce((sum: number, perf: any) => sum + perf.impressions, 0);
            const totalClicks = campaign.performance.reduce((sum: number, perf: any) => sum + perf.clicks, 0);
            const totalConversions = campaign.performance.reduce((sum: number, perf: any) => sum + perf.conversions, 0);
            const totalSpend = campaign.performance.reduce((sum: number, perf: any) => sum + perf.spend, 0);

            const ctr = totalImpressions > 0 ? parseFloat(((totalClicks / totalImpressions) * 100).toFixed(2)) : 0;
            const cpc = totalClicks > 0 ? parseFloat((totalSpend / totalClicks).toFixed(2)) : 0;
            const conversionRate = totalClicks > 0 ? parseFloat(((totalConversions / totalClicks) * 100).toFixed(2)) : 0;
            const cpa = totalConversions > 0 ? parseFloat((totalSpend / totalConversions).toFixed(2)) : 0;
            const roas = totalSpend > 0 ? parseFloat(((totalConversions * 50) / totalSpend).toFixed(2)) : 0; // Assuming $50 value per conversion

            return {
                id: campaign.id,
                name: campaign.name,
                impressions: totalImpressions,
                clicks: totalClicks,
                ctr,
                cpc,
                conversions: totalConversions,
                conversionRate,
                cpa,
                roas
            };
        });

        res.json({
            campaignMetrics
        });
    } catch (error) {
        next(error);
    }
};

// Get audience insights
export const getAudienceInsights = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'UNAUTHORIZED', 'Authentication required');
        }

        // Parse and validate query parameters
        const filterResult = AnalyticsFilterSchema.safeParse(req.query);
        if (!filterResult.success) {
            throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid filter parameters');
        }

        const { dateRange, campaignId, platform } = filterResult.data;

        // Get user's campaigns
        const campaigns = await prisma.campaign.findMany({
            where: {
                userId: req.user.id,
                ...(campaignId && { id: campaignId })
            }
        });

        // Get audience data
        const campaignIds = campaigns.map((c: { id: string }) => c.id);
        const audienceData: any[] = await prisma.$queryRaw`
      SELECT 
        age_group,
        gender,
        location,
        interests,
        COUNT(*) as count
      FROM campaign_audience 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY age_group, gender, location, interests
      ORDER BY count DESC
      LIMIT 20
    `;

        // Get demographic breakdown
        const demographics: any[] = await prisma.$queryRaw`
      SELECT 
        age_group,
        gender,
        COUNT(*) as count
      FROM campaign_audience 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY age_group, gender
      ORDER BY count DESC
    `;

        // Get top interests
        const interests: any[] = await prisma.$queryRaw`
      SELECT 
        interests,
        COUNT(*) as count
      FROM campaign_audience 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY interests
      ORDER BY count DESC
      LIMIT 10
    `;

        // Get geographic distribution
        const locations: any[] = await prisma.$queryRaw`
      SELECT 
        location,
        COUNT(*) as count
      FROM campaign_audience 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY location
      ORDER BY count DESC
      LIMIT 10
    `;

        res.json({
            audienceData,
            demographics,
            interests,
            locations
        });
    } catch (error) {
        next(error);
    }
};