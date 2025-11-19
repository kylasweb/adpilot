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
        const campaignIds = campaigns.map(c => c.id);

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
        const campaignMetrics = campaigns.map(campaign => {
            const totalImpressions = campaign.performance.reduce((sum, perf) => sum + perf.impressions, 0);
            const totalClicks = campaign.performance.reduce((sum, perf) => sum + perf.clicks, 0);
            const totalConversions = campaign.performance.reduce((sum, perf) => sum + perf.conversions, 0);
            const totalSpend = campaign.performance.reduce((sum, perf) => sum + perf.spend, 0);

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
            },
            select: {
                id: true
            }
        });

        const campaignIds = campaigns.map(c => c.id);

        // Get age distribution data
        const ageData: any[] = await prisma.$queryRaw`
      SELECT 
        age_range as name,
        COUNT(*) as value
      FROM audience_insights 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY age_range
      ORDER BY value DESC
    `;

        // Get gender distribution data
        const genderData: any[] = await prisma.$queryRaw`
      SELECT 
        gender as name,
        COUNT(*) as value
      FROM audience_insights 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY gender
    `;

        // Get device usage data
        const deviceData: any[] = await prisma.$queryRaw`
      SELECT 
        device_type as name,
        COUNT(*) as value
      FROM audience_insights 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY device_type
    `;

        // Get interest categories data
        const interestData: any[] = await prisma.$queryRaw`
      SELECT 
        interest as name,
        COUNT(*) as value
      FROM audience_insights 
      WHERE campaign_id IN (${campaignIds})
      GROUP BY interest
      ORDER BY value DESC
      LIMIT 10
    `;

        // Calculate percentages for age distribution
        const totalAge = ageData.reduce((sum: number, item: any) => sum + item.value, 0);
        const ageDistribution = ageData.map((item: any) => ({
            name: item.name,
            value: parseFloat(((item.value / totalAge) * 100).toFixed(0))
        }));

        // Calculate percentages for gender distribution
        const totalGender = genderData.reduce((sum: number, item: any) => sum + item.value, 0);
        const genderDistribution = genderData.map((item: any) => ({
            name: item.name,
            value: parseFloat(((item.value / totalGender) * 100).toFixed(0))
        }));

        // Calculate percentages for device usage
        const totalDevice = deviceData.reduce((sum: number, item: any) => sum + item.value, 0);
        const deviceUsage = deviceData.map((item: any) => ({
            name: item.name,
            value: parseFloat(((item.value / totalDevice) * 100).toFixed(0))
        }));

        // Calculate percentages for interest categories
        const totalInterest = interestData.reduce((sum: number, item: any) => sum + item.value, 0);
        const interestCategories = interestData.map((item: any) => ({
            name: item.name,
            value: parseFloat(((item.value / totalInterest) * 100).toFixed(0))
        }));

        // Generate key demographics and recommendations
        const sortedAge = [...ageDistribution].sort((a, b) => b.value - a.value);
        const primaryAgeGroup = sortedAge[0]?.name || 'N/A';

        const sortedGender = [...genderDistribution].sort((a, b) => b.value - a.value);
        const primaryGender = sortedGender[0]?.name || 'N/A';

        const sortedDevice = [...deviceUsage].sort((a, b) => b.value - a.value);
        const primaryDevice = sortedDevice[0]?.name || 'N/A';

        const sortedInterest = [...interestCategories].sort((a, b) => b.value - a.value);
        const topInterests = sortedInterest.slice(0, 2).map(item => item.name);

        res.json({
            ageDistribution,
            genderDistribution,
            deviceUsage,
            interestCategories,
            summary: {
                keyDemographics: [
                    `Core audience: ${primaryAgeGroup} (${sortedAge[0]?.value || 0}%)`,
                    `Predominant gender: ${primaryGender} (${sortedGender[0]?.value || 0}%)`,
                    `Primary device: ${primaryDevice} (${sortedDevice[0]?.value || 0}%)`
                ],
                recommendations: [
                    `Optimize creative for ${primaryDevice.toLowerCase()} users`,
                    `Create content tailored to ${primaryAgeGroup} demographic`,
                    `Focus on interests like ${topInterests.join(' and ')}`
                ]
            }
        });
    } catch (error) {
        next(error);
    }
};