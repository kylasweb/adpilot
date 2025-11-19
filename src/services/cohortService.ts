import { CreateCohortInput, UpdateCohortInput } from '../schemas/cohort';

export interface Cohort {
    id: string;
    name: string;
    description?: string;
    criteria?: string;
    audienceSize: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

// Get all cohorts
export const getCohorts = async (params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
}): Promise<{ data: Cohort[]; meta: any }> => {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.sort) searchParams.append('sort', params.sort);
    if (params.order) searchParams.append('order', params.order);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/cohorts?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch cohorts: ${response.statusText}`);
    }

    return response.json();
};

// Get cohort by ID
export const getCohortById = async (id: string): Promise<Cohort> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/cohorts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch cohort: ${response.statusText}`);
    }

    return response.json();
};

// Create new cohort
export const createCohort = async (data: CreateCohortInput): Promise<Cohort> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/cohorts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to create cohort: ${response.statusText}`);
    }

    return response.json();
};

// Update cohort
export const updateCohort = async (id: string, data: UpdateCohortInput): Promise<Cohort> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/cohorts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update cohort: ${response.statusText}`);
    }

    return response.json();
};

// Delete cohort
export const deleteCohort = async (id: string): Promise<void> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/cohorts/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete cohort: ${response.statusText}`);
    }
};