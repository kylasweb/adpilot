import { z } from 'zod';

// Schema for user profile update
export const UserProfileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
});

// Schema for password update
export const PasswordUpdateSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Schema for organization settings
export const OrganizationSettingsSchema = z.object({
    name: z.string().min(1, 'Organization name is required'),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
});