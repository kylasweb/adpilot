'use client'

import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Plus } from "lucide-react";
import { toast } from "sonner";
import UserTable from "@/components/admin/users/UserTable";
import UserDialogs from "@/components/admin/users/UserDialogs";
import UserFilters from "@/components/admin/users/UserFilters";
import { User, UserFormData } from "@/components/admin/users/types";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    password: '',
    role: 'USER',
    status: 'ACTIVE',
    avatarUrl: ''
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search: searchQuery,
        ...(roleFilter !== 'ALL' && { role: roleFilter }),
        ...(statusFilter !== 'ALL' && { status: statusFilter })
      });

      const response = await fetch(`/api/users?${params}`);
      const data = await response.json();

      setUsers(data.users || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchQuery, roleFilter, statusFilter]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create user');

      toast.success('User created successfully');
      setShowCreateDialog(false);
      setFormData({ email: '', name: '', password: '', role: 'USER', status: 'ACTIVE', avatarUrl: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          avatarUrl: formData.avatarUrl
        })
      });

      if (!response.ok) throw new Error('Failed to update user');

      toast.success('User updated successfully');
      setShowEditDialog(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete user');

      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) {
      toast.error('Please select users first');
      return;
    }

    try {
      const response = await fetch('/api/users/bulk-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userIds: selectedUsers })
      });

      if (!response.ok) throw new Error('Bulk action failed');

      toast.success(`Bulk ${action} completed successfully`);
      setSelectedUsers([]);
      fetchUsers();
    } catch (error) {
      console.error('Error performing bulk action:', error);
      toast.error(`Failed to ${action} users`);
    }
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      password: '',
      role: user.role,
      status: user.status,
      avatarUrl: user.avatarUrl || ''
    });
    setShowEditDialog(true);
  };

  const handleSelectUser = (userId: string, selected: boolean) => {
    setSelectedUsers(prev =>
      selected ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedUsers(selected ? users.map(u => u.id) : []);
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-adsilo-text-secondary mt-1">
                Manage system users and permissions
              </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-adsilo-border shadow-sm mt-6">
          <CardHeader>
            <div>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Users
              </CardTitle>
              <CardDescription>Manage and monitor user accounts</CardDescription>
            </div>

            <UserFilters
              searchQuery={searchQuery}
              roleFilter={roleFilter}
              statusFilter={statusFilter}
              selectedCount={selectedUsers.length}
              onSearchChange={setSearchQuery}
              onRoleChange={setRoleFilter}
              onStatusChange={setStatusFilter}
              onBulkAction={handleBulkAction}
            />
          </CardHeader>

          <CardContent>
            <UserTable
              users={users}
              loading={loading}
              selectedUsers={selectedUsers}
              page={page}
              totalPages={totalPages}
              onSelectUser={handleSelectUser}
              onSelectAll={handleSelectAll}
              onEdit={openEditDialog}
              onDelete={handleDeleteUser}
              onPageChange={setPage}
            />
          </CardContent>
        </Card>
      </motion.div>

      <UserDialogs
        showCreate={showCreateDialog}
        showEdit={showEditDialog}
        editingUser={editingUser}
        formData={formData}
        onFormDataChange={setFormData}
        onCreateSubmit={handleCreateUser}
        onEditSubmit={handleUpdateUser}
        onCreateClose={() => setShowCreateDialog(false)}
        onEditClose={() => setShowEditDialog(false)}
      />
    </AppLayout>
  );
};

export default AdminUsersPage;