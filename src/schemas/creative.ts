import { z } from 'zod';

// Schema for creative assets
export const CreativeSchema = z.object({
    id: z.string(),
    title: z.string(),
    type: z.enum(['Image', 'Video', 'Carousel', 'Story']),
    size: z.string(),
    campaignId: z.string().optional(),
    campaignName: z.string().optional(),
    lastUpdated: z.string(),
    previewUrl: z.string(),
    tags: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Schema for creative creation
export const CreateCreativeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    type: z.enum(['Image', 'Video', 'Carousel', 'Story']),
    size: z.string(),
    campaignId: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

// Schema for creative update
export const UpdateCreativeSchema = z.object({
    title: z.string().min(1, 'Title is required').optional(),
    type: z.enum(['Image', 'Video', 'Carousel', 'Story']).optional(),
    size: z.string().optional(),
    campaignId: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

// Schema for creative filters
export const CreativeFilterSchema = z.object({
    search: z.string().optional(),
    type: z.enum(['Image', 'Video', 'Carousel', 'Story']).optional(),
    campaignId: z.string().optional(),
    sortBy: z.enum(['newest', 'oldest', 'alphabetical']).optional(),
});