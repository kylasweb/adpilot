
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MoreHorizontal, UserPlus, Users, Shield } from "lucide-react";
import { toast } from "sonner";

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@adpilot.com",
    role: "Admin",
    status: "Active",
    lastActive: "Just now",
    avatar: "AJ"
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah@adpilot.com",
    role: "Analyst",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "SW"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@adpilot.com",
    role: "Designer",
    status: "Inactive",
    lastActive: "2 days ago",
    avatar: "MB"
  },
  {
    id: 4,
    name: "Jessica Chen",
    email: "jessica@adpilot.com",
    role: "Campaign Manager",
    status: "Active",
    lastActive: "5 hours ago",
    avatar: "JC"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@adpilot.com",
    role: "Viewer",
    status: "Pending",
    lastActive: "Never",
    avatar: "DW"
  }
];

const teams = [
  {
    id: 1,
    name: "Marketing Team",
    members: 5,
    campaigns: 12,
    createdBy: "Alex Johnson",
    createdAt: "3 months ago"
  },
  {
    id: 2,
    name: "Design Team",
    members: 3,
    campaigns: 8,
    createdBy: "Sarah Williams",
    createdAt: "1 month ago"
  },
  {
    id: 3,
    name: "Analytics Team",
    members: 4,
    campaigns: 15,
    createdBy: "Alex Johnson",
    createdAt: "2 months ago"
  }
];

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [newTeamDialogOpen, setNewTeamDialogOpen] = useState(false);
  
  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Invitation sent successfully!");
    setIsInviteDialogOpen(false);
  };
  
  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Team created successfully!");
    setNewTeamDialogOpen(false);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users & Teams</h1>
          <p className="text-adpilot-text-secondary mt-1">Manage user access and team settings</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users and teams..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="users">
              <TabsList>
                <TabsTrigger value="users">
                  <Shield className="mr-2 h-4 w-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="teams">
                  <Users className="mr-2 h-4 w-4" />
                  Teams
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="users" className="space-y-4">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Active</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredTeamMembers.map((member) => (
                      <tr key={member.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{member.role}</td>
                        <td className="p-4 align-middle">
                          <Badge 
                            variant={
                              member.status === "Active" ? "default" : 
                              member.status === "Inactive" ? "outline" : 
                              "secondary"
                            }
                          >
                            {member.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">{member.lastActive}</td>
                        <td className="p-4 align-middle">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Deactivate User</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="teams" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <CardTitle className="text-lg">Teams</CardTitle>
                <CardDescription>Manage teams and memberships</CardDescription>
              </div>
              <Button onClick={() => setNewTeamDialogOpen(true)} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Team
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTeams.map((team) => (
                <Card key={team.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{team.name}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Team</DropdownMenuItem>
                          <DropdownMenuItem>View Members</DropdownMenuItem>
                          <DropdownMenuItem>Manage Access</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Team</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Members:</span>
                        <span>{team.members}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Campaigns:</span>
                        <span>{team.campaigns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created by:</span>
                        <span>{team.createdBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{team.createdAt}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </CardContent>
      </Card>
      
      {/* Invite User Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Send an invitation to a new team member
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInviteUser} className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="email" placeholder="email@example.com" type="email" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <select
                    id="role"
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="admin">Admin</option>
                    <option value="campaign-manager">Campaign Manager</option>
                    <option value="analyst">Analyst</option>
                    <option value="designer">Designer</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="team" className="text-sm font-medium">
                    Team
                  </label>
                  <select
                    id="team"
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a team (optional)</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add a personal message to your invitation..."
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Create Team Dialog */}
      <Dialog open={newTeamDialogOpen} onOpenChange={setNewTeamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>
              Create a new team to organize users and permissions
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="teamName" className="text-sm font-medium">
                  Team Name
                </label>
                <Input id="teamName" placeholder="Marketing Team" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe the purpose of this team..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Initial Members
                </label>
                <div className="border rounded-md p-4">
                  <p className="text-xs text-center text-muted-foreground mb-2">
                    You'll be able to add members after creating the team
                  </p>
                  <Button type="button" variant="outline" size="sm" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Members
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setNewTeamDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Team</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default AdminUsersPage;
