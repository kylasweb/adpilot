// Creative service to fetch data from the API

// Get all creatives with filtering and pagination
export const getCreatives = async (params: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    campaignId?: string;
    sortBy?: string;
} = {}): Promise<any> => {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.type) searchParams.append('type', params.type);
    if (params.campaignId) searchParams.append('campaignId', params.campaignId);
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/creative?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch creatives: ${response.statusText}`);
    }

    return response.json();
};

// Get a single creative by ID
export const getCreativeById = async (id: string): Promise<any> => {
    const response = await fetch(`/api/creative/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch creative: ${response.statusText}`);
    }

    return response.json();
};

// Create a new creative
export const createCreative = async (data: {
    title: string;
    type: string;
    size: string;
    campaignId?: string;
    tags?: string[];
}): Promise<any> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/creative`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to create creative: ${response.statusText}`);
    }

    return response.json();
};

// Update a creative
export const updateCreative = async (id: string, data: {
    title?: string;
    type?: string;
    size?: string;
    campaignId?: string;
    tags?: string[];
}): Promise<any> => {
    const response = await fetch(`/api/creative/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update creative: ${response.statusText}`);
    }

    return response.json();
};

// Delete a creative
export const deleteCreative = async (id: string): Promise<void> => {
    const response = await fetch(`/api/creative/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to delete creative: ${response.statusText}`);
    }
};