import { z } from 'zod';

export const createCohortSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Cohort name is required',
            invalid_type_error: 'Cohort name must be a string'
        }).min(1, 'Cohort name cannot be empty').max(100, 'Cohort name cannot exceed 100 characters'),

        description: z.string({
            invalid_type_error: 'Description must be a string'
        }).max(500, 'Description cannot exceed 500 characters').optional(),

        criteria: z.string({
            invalid_type_error: 'Criteria must be a string'
        }).max(1000, 'Criteria cannot exceed 1000 characters').optional(),

        audienceSize: z.string({
            required_error: 'Audience size is required',
            invalid_type_error: 'Audience size must be a number'
        }).refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
            message: 'Audience size must be a valid non-negative number'
        })
    })
});

export const updateCohortSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Cohort name must be a string'
        }).min(1, 'Cohort name cannot be empty').max(100, 'Cohort name cannot exceed 100 characters').optional(),

        description: z.string({
            invalid_type_error: 'Description must be a string'
        }).max(500, 'Description cannot exceed 500 characters').optional(),

        criteria: z.string({
            invalid_type_error: 'Criteria must be a string'
        }).max(1000, 'Criteria cannot exceed 1000 characters').optional(),

        audienceSize: z.string({
            invalid_type_error: 'Audience size must be a number'
        }).refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
            message: 'Audience size must be a valid non-negative number'
        }).optional()
    })
});

export type CreateCohortInput = z.infer<typeof createCohortSchema>['body'];
export type UpdateCohortInput = z.infer<typeof updateCohortSchema>['body'];