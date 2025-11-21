import 'express';

declare module 'express' {
    export interface Request {
        user?: {
            id: string;
            email: string;
            name: string;
            role: string;
            staffRole?: 'ADMIN' | 'STAFF' | 'C_LEVEL' | 'MANAGER';
        };
        projectRole?: string;
    }
}
