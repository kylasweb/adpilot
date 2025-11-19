import { z } from 'zod';

export const createCampaignSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Campaign name is required',
            invalid_type_error: 'Campaign name must be a string'
        }).min(1, 'Campaign name cannot be empty').max(100, 'Campaign name cannot exceed 100 characters'),

        description: z.string({
            invalid_type_error: 'Description must be a string'
        }).max(500, 'Description cannot exceed 500 characters').optional(),

        objective: z.string({
            invalid_type_error: 'Objective must be a string'
        }).max(200, 'Objective cannot exceed 200 characters').optional(),

        budget: z.string({
            required_error: 'Budget is required',
            invalid_type_error: 'Budget must be a number'
        }).refine((val) => !isNaN(parseFloat(val)), {
            message: 'Budget must be a valid number'
        }),

        startDate: z.string({
            required_error: 'Start date is required'
        }).datetime({
            message: 'Start date must be a valid ISO date string'
        }),

        endDate: z.string({
            invalid_type_error: 'End date must be a valid ISO date string'
        }).datetime({
            message: 'End date must be a valid ISO date string'
        }).optional(),

        status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED'], {
            invalid_type_error: 'Status must be one of: DRAFT, ACTIVE, PAUSED, COMPLETED, ARCHIVED'
        }).default('DRAFT')
    })
});

export const updateCampaignSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Campaign name must be a string'
        }).min(1, 'Campaign name cannot be empty').max(100, 'Campaign name cannot exceed 100 characters').optional(),

        description: z.string({
            invalid_type_error: 'Description must be a string'
        }).max(500, 'Description cannot exceed 500 characters').optional(),

        objective: z.string({
            invalid_type_error: 'Objective must be a string'
        }).max(200, 'Objective cannot exceed 200 characters').optional(),

        budget: z.string({
            invalid_type_error: 'Budget must be a number'
        }).refine((val) => !isNaN(parseFloat(val)), {
            message: 'Budget must be a valid number'
        }).optional(),

        startDate: z.string({
            invalid_type_error: 'Start date must be a valid ISO date string'
        }).datetime({
            message: 'Start date must be a valid ISO date string'
        }).optional(),

        endDate: z.string({
            invalid_type_error: 'End date must be a valid ISO date string'
        }).datetime({
            message: 'End date must be a valid ISO date string'
        }).optional(),

        status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED'], {
            invalid_type_error: 'Status must be one of: DRAFT, ACTIVE, PAUSED, COMPLETED, ARCHIVED'
        }).optional()
    })
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>['body'];
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>['body'];