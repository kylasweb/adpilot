// Settings service to fetch data from the API

// Get user settings
export const getUserSettings = async (): Promise<unknown> => {
    const response = await fetch('/api/settings', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user settings: ${response.statusText}`);
    }

    return response.json();
};

// Update user profile
export const updateUserProfile = async (data: {
    name: string;
    email: string;
}): Promise<unknown> => {
    const response = await fetch('/api/settings/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    return response.json();
};

// Update password
export const updatePassword = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}): Promise<unknown> => {
    const response = await fetch('/api/settings/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update password: ${response.statusText}`);
    }

    return response.json();
};

// Update organization settings
export const updateOrganizationSettings = async (data: {
    name: string;
    website?: string;
}): Promise<unknown> => {
    const response = await fetch('/api/settings/organization', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update organization settings: ${response.statusText}`);
    }

    return response.json();
};

// Delete account
export const deleteAccount = async (): Promise<unknown> => {
    const response = await fetch('/api/settings/account', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to delete account: ${response.statusText}`);
    }

    return response.json();
};