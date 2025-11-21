// Analytics service to fetch data from the API

// Get performance overview data
export const getPerformanceOverview = async (filters: {
    dateRange?: string;
    campaignId?: string;
    platform?: string;
} = {}): Promise<unknown> => {
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

// Get campaign metrics
export const getCampaignMetrics = async (filters: {
    dateRange?: string;
    campaignId?: string;
    platform?: string;
} = {}): Promise<unknown> => {
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

// Get audience insights
export const getAudienceInsights = async (filters: {
    dateRange?: string;
    campaignId?: string;
    platform?: string;
} = {}): Promise<unknown> => {
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