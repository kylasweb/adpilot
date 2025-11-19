import { z } from 'zod';

// Schema for performance trends data
export const PerformanceTrendSchema = z.object({
    date: z.string(),
    impressions: z.number(),
    clicks: z.number(),
    conversions: z.number(),
});

// Schema for campaign metrics
export const CampaignMetricSchema = z.object({
    id: z.string(),
    name: z.string(),
    impressions: z.number(),
    clicks: z.number(),
    ctr: z.number(), // Click-through rate
    cpc: z.number(), // Cost per click
    conversions: z.number(),
    conversionRate: z.number(),
    cpa: z.number(), // Cost per acquisition
    roas: z.number(), // Return on ad spend
});

// Schema for audience demographics
export const AudienceDemographicSchema = z.object({
    name: z.string(),
    value: z.number(),
});

// Schema for analytics data
export const AnalyticsDataSchema = z.object({
    performanceTrends: z.array(PerformanceTrendSchema),
    campaignMetrics: z.array(CampaignMetricSchema),
    ageDistribution: z.array(AudienceDemographicSchema),
    genderDistribution: z.array(AudienceDemographicSchema),
    deviceUsage: z.array(AudienceDemographicSchema),
    interestCategories: z.array(AudienceDemographicSchema),
    summary: z.object({
        keyDemographics: z.array(z.string()),
        recommendations: z.array(z.string()),
    }),
});

// Schema for analytics filters
export const AnalyticsFilterSchema = z.object({
    dateRange: z.string().optional(),
    campaignId: z.string().optional(),
    platform: z.string().optional(),
});