export interface Project {
    id: string;
    name: string;
    description?: string;
    status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
    startDate: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
    _count?: {
        tasks: number;
        members: number;
    };
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    projectId: string;
    assigneeId?: string;
    creatorId: string;
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
    assignee?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface ProjectFormData {
    name: string;
    description: string;
    status: string;
    startDate: string;
    endDate: string;
}

export interface TaskFormData {
    title: string;
    description: string;
    status: string;
    priority: string;
    assigneeId: string;
    dueDate: string;
}
