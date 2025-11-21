// Analytics service to fetch data from the API

export type PerformanceTrend = {
    date: string;
    impressions: number;
    clicks: number;
    conversions: number;
};

export type PlacementEntry = { name: string; value: number; percent: number };

export type CampaignRoasEntry = { name: string; value: number };

export type PerformanceOverviewResponse = {
    summary: {
        totalImpressions?: number;
        totalClicks?: number;
        ctr?: number;
        totalConversions?: number;
    };
    performanceTrends: PerformanceTrend[];
    placementDistribution: PlacementEntry[];
    campaignRoas: CampaignRoasEntry[];
};

// Get performance overview data
export const getPerformanceOverview = async (filters: {
    dateRange?: string;
    campaignId?: string;
    platform?: string;
} = {}): Promise<PerformanceOverviewResponse> => {
    const searchParams = new URLSearchParams();

    if (filters.dateRange) searchParams.append('dateRange', filters.dateRange);
    if (filters.campaignId) searchParams.append('campaignId', filters.campaignId);
    if (filters.platform) searchParams.append('platform', filters.platform);

    const response = await fetch(`/api/analytics/performance?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch performance overview: ${response.statusText}`);
    }

    return response.json();
};

export type CampaignMetricsEntry = {
    id: string;
    name: string;
    impressions?: number;
    clicks?: number;
    ctr?: number;
    cpc?: number;
    conversions?: number;
    conversionRate?: number;
    cpa?: number;
    roas?: number;
};

export type CampaignMetricsResponse = {
    campaignMetrics: CampaignMetricsEntry[];
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
    };
};

// Get campaign metrics
export const getCampaignMetrics = async (filters: {
    dateRange?: string;
    campaignId?: string;
    platform?: string;
} = {}): Promise<CampaignMetricsResponse> => {
    const searchParams = new URLSearchParams();

    if (filters.dateRange) searchParams.append('dateRange', filters.dateRange);
    if (filters.campaignId) searchParams.append('campaignId', filters.campaignId);
    if (filters.platform) searchParams.append('platform', filters.platform);

    const response = await fetch(`/api/analytics/campaigns?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch campaign metrics: ${response.statusText}`);
    }

    return response.json();
};

export type AudienceInsightsResponse = {
    ageDistribution: { name: string; value: number }[];
    genderDistribution: { name: string; value: number }[];
    deviceUsage: { name: string; value: number }[];
    interestCategories: { name: string; value: number }[];
    summary: { keyDemographics: string[]; recommendations: string[] };
};

// Get audience insights
export const getAudienceInsights = async (filters: {
    dateRange?: string;
    campaignId?: string;
    platform?: string;
} = {}): Promise<AudienceInsightsResponse> => {
    const searchParams = new URLSearchParams();

    if (filters.dateRange) searchParams.append('dateRange', filters.dateRange);
    if (filters.campaignId) searchParams.append('campaignId', filters.campaignId);
    if (filters.platform) searchParams.append('platform', filters.platform);

    const response = await fetch(`/api/analytics/audience?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch audience insights: ${response.statusText}`);
    }

    return response.json();
};