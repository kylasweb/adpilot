// Get dashboard statistics
export const getDashboardStats = async (): Promise<unknown> => {
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
export const getActiveCampaigns = async (limit: number = 5): Promise<unknown> => {
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
export const getTopCohorts = async (limit: number = 4): Promise<unknown> => {
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
export const getRecentActivity = async (limit: number = 5): Promise<unknown> => {
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