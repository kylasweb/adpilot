export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    role: 'ADMIN' | 'USER' | 'VIEWER';
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    createdAt: string;
    organization?: { name: string };
    _count?: { campaigns: number; projects: number };
}

export interface UserFormData {
    email: string;
    name: string;
    password: string;
    role: string;
    status: string;
    avatarUrl: string;
}
