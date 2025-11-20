import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Check, X, Trash } from "lucide-react";

interface UserFiltersProps {
    searchQuery: string;
    roleFilter: string;
    statusFilter: string;
    selectedCount: number;
    onSearchChange: (query: string) => void;
    onRoleChange: (role: string) => void;
    onStatusChange: (status: string) => void;
    onBulkAction: (action: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
    searchQuery,
    roleFilter,
    statusFilter,
    selectedCount,
    onSearchChange,
    onRoleChange,
    onStatusChange,
    onBulkAction
}) => {
    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            className="pl-8 w-64"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>

                    <Select value={roleFilter} onValueChange={onRoleChange}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Roles</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="VIEWER">Viewer</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={onStatusChange}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Status</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                            <SelectItem value="SUSPENDED">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {selectedCount > 0 && (
                <div className="flex items-center gap-2 p-3 bg-adsilo-muted rounded-lg">
                    <span className="text-sm font-medium">{selectedCount} selected</span>
                    <div className="flex gap-2 ml-auto">
                        <Button size="sm" variant="outline" onClick={() => onBulkAction('activate')}>
                            <Check className="h-4 w-4 mr-1" /> Activate
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => onBulkAction('deactivate')}>
                            <X className="h-4 w-4 mr-1" /> Deactivate
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onBulkAction('delete')}>
                            <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserFilters;
