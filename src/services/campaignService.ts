import { CreateCampaignInput, UpdateCampaignInput } from '../schemas/campaign';

export interface Campaign {
    id: string;
    name: string;
    description?: string;
    objective?: string;
    budget: number;
    status: string;
    startDate: string;
    endDate?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

// Get all campaigns
export const getCampaigns = async (params: {
    page?: number;
    limit?: number;
    status?: string;
    sort?: string;
    order?: string;
}): Promise<{ data: Campaign[]; meta: any }> => {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.status) searchParams.append('status', params.status);
    if (params.sort) searchParams.append('sort', params.sort);
    if (params.order) searchParams.append('order', params.order);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/campaigns?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch campaigns: ${response.statusText}`);
    }

    return response.json();
};

// Get campaign by ID
export const getCampaignById = async (id: string): Promise<Campaign> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/campaigns/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch campaign: ${response.statusText}`);
    }

    return response.json();
};

// Create new campaign
export const createCampaign = async (data: CreateCampaignInput): Promise<Campaign> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/campaigns`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to create campaign: ${response.statusText}`);
    }

    return response.json();
};

// Update campaign
export const updateCampaign = async (id: string, data: UpdateCampaignInput): Promise<Campaign> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/campaigns/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update campaign: ${response.statusText}`);
    }

    return response.json();
};

// Delete campaign
export const deleteCampaign = async (id: string): Promise<void> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/campaigns/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete campaign: ${response.statusText}`);
    }
};