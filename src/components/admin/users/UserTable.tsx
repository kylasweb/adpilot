import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Users, Edit, Trash, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { User } from './types';

interface UserTableProps {
    users: User[];
    loading: boolean;
    selectedUsers: string[];
    page: number;
    totalPages: number;
    onSelectUser: (userId: string, selected: boolean) => void;
    onSelectAll: (selected: boolean) => void;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
    onPageChange: (page: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
    users,
    loading,
    selectedUsers,
    page,
    totalPages,
    onSelectUser,
    onSelectAll,
    onEdit,
    onDelete,
    onPageChange
}) => {
    const getRoleBadge = (role: string) => {
        const variants: Record<string, string> = {
            ADMIN: 'bg-purple-100 text-purple-800',
            USER: 'bg-blue-100 text-blue-800',
            VIEWER: 'bg-gray-100 text-gray-800'
        };
        return <Badge className={variants[role]}>{role}</Badge>;
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, string> = {
            ACTIVE: 'bg-green-100 text-green-800',
            INACTIVE: 'bg-yellow-100 text-yellow-800',
            SUSPENDED: 'bg-red-100 text-red-800'
        };
        return <Badge className={variants[status]}>{status}</Badge>;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-adsilo-primary" />
            </div>
        );
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">
                            <Checkbox
                                checked={selectedUsers.length === users.length && users.length > 0}
                                onCheckedChange={onSelectAll}
                            />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-12 text-adsilo-text-muted">
                                No users found
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedUsers.includes(user.id)}
                                        onCheckedChange={(checked) => onSelectUser(user.id, !!checked)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-adsilo-primary/10 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-adsilo-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-adsilo-text-muted">{user.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{getRoleBadge(user.role)}</TableCell>
                                <TableCell>{getStatusBadge(user.status)}</TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        <div>{user._count?.campaigns || 0} campaigns</div>
                                        <div className="text-adsilo-text-muted">{user._count?.projects || 0} projects</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-adsilo-text-muted">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => onEdit(user)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => onDelete(user.id)}
                                        >
                                            <Trash className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-adsilo-text-muted">
                        Page {page} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => onPageChange(Math.max(1, page - 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserTable;
