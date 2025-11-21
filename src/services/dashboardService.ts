export type DashboardStats = {
    totalCampaigns: number;
    activeCampaigns: number;
    completedCampaigns: number;
    totalCohorts: number;
    totalBudget: number;
    avgROAS: number;
    avgCTR: number;
};

type ApiListResponse<T> = {
    data: T[];
    meta?: {
        total: number;
        page: number;
        limit: number;
        total_pages: number;
    };
};

// Get dashboard statistics
export const getDashboardStats = async (): Promise<DashboardStats> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/dashboard/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch dashboard stats: ${response.statusText}`);
    }

    return response.json();
};

// Get active campaigns
export type CampaignSummary = {
    id: string;
    name: string;
    objective?: string | null;
    status: string;
    budget: number;
};

export const getActiveCampaigns = async (limit: number = 5): Promise<ApiListResponse<CampaignSummary>> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/campaigns?limit=${limit}&status=ACTIVE`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch active campaigns: ${response.statusText}`);
    }

    return response.json();
};

// Get top cohorts
export type CohortSummary = {
    id: string;
    name: string;
    audienceSize: number;
};

export const getTopCohorts = async (limit: number = 4): Promise<ApiListResponse<CohortSummary>> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/cohorts?limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch top cohorts: ${response.statusText}`);
    }

    return response.json();
};

// Get recent activity
export type RecentActivityItem = {
    id: string | number;
    action: string;
    target: string;
    user: string;
    time: string;
    icon?: string;
    iconClass?: string;
};

export const getRecentActivity = async (limit: number = 5): Promise<RecentActivityItem[]> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/activity/recent`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch recent activity: ${response.statusText}`);
    }

    return response.json();
};