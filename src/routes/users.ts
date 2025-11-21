import { Router, Request, Response } from 'express';
import { PrismaClient, UserRole, UserStatus } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/users - List all users with pagination and filtering
router.get('/', (async (req: Request, res: Response) => {
    try {
        const {
            page = '1',
            limit = '10',
            search = '',
            role,
            status
        } = req.query;

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const where: any = {};

        // Search by name or email
        if (search) {
            where.OR = [
                { name: { contains: search as string, mode: 'insensitive' } },
                { email: { contains: search as string, mode: 'insensitive' } }
            ];
        }

        // Filter by role
        if (role && role !== 'ALL') {
            where.role = role as UserRole;
        }

        // Filter by status
        if (status && status !== 'ALL') {
            where.status = status as UserStatus;
        }

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limitNum,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    avatarUrl: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    organization: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            campaigns: true,
                            projects: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count({ where })
        ]);

        res.json({
            users,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}) as any);

// GET /api/users/:id - Get a single user
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                organization: {
                    select: {
                        id: true,
                        name: true,
                        website: true
                    }
                },
                _count: {
                    select: {
                        campaigns: true,
                        projects: true,
                        cohorts: true,
                        creatives: true
                    }
                }
            }
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}) as any);

// POST /api/users - Create a new user
router.post('/', (async (req: Request, res: Response) => {
    try {
        const { email, name, password, role = 'USER', status = 'ACTIVE', avatarUrl } = req.body;

        // Validation
        if (!email || !name || !password) {
            res.status(400).json({ error: 'Email, name, and password are required' });
            return;
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            res.status(409).json({ error: 'User with this email already exists' });
            return;
        }

        // In production, hash the password before storing
        // For now, storing as-is (SHOULD BE HASHED!)
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password, // TODO: Hash this in production!
                role: role as UserRole,
                status: status as UserStatus,
                avatarUrl
            },
            select: {
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true
            }
        });

        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}) as any);

// PUT /api/users/:id - Update a user
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, name, role, status, avatarUrl } = req.body;

        const updateData: any = {};

        if (email) updateData.email = email;
        if (name) updateData.name = name;
        if (role) updateData.role = role as UserRole;
        if (status) updateData.status = status as UserStatus;
        if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true
            }
        });

        res.json(user);
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
}) as any);

// DELETE /api/users/:id - Delete a user
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: { id }
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}) as any);

// POST /api/users/bulk-action - Bulk actions on users
router.post('/bulk-action', (async (req: Request, res: Response) => {
    try {
        const { action, userIds } = req.body;

        if (!action || !userIds || !Array.isArray(userIds)) {
            res.status(400).json({ error: 'Action and userIds array are required' });
            return;
        }

        let result;

        switch (action) {
            case 'activate':
                result = await prisma.user.updateMany({
                    where: { id: { in: userIds } },
                    data: { status: UserStatus.ACTIVE }
                });
                break;

            case 'deactivate':
                result = await prisma.user.updateMany({
                    where: { id: { in: userIds } },
                    data: { status: UserStatus.INACTIVE }
                });
                break;

            case 'suspend':
                result = await prisma.user.updateMany({
                    where: { id: { in: userIds } },
                    data: { status: UserStatus.SUSPENDED }
                });
                break;

            case 'delete':
                result = await prisma.user.deleteMany({
                    where: { id: { in: userIds } }
                });
                break;

            default:
                res.status(400).json({ error: 'Invalid action' });
                return;
        }

        res.json({
            message: `Bulk ${action} completed successfully`,
            count: result.count
        });
    } catch (error) {
        console.error('Error performing bulk action:', error);
        res.status(500).json({ error: 'Failed to perform bulk action' });
    }
}) as any);

export default router;
