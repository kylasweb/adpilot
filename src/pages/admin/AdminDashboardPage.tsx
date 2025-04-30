
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { Shield, Users, Layers, Settings, Activity, Search, Plus, ChevronDown } from "lucide-react";

// Mock data for organizations
const organizations = [
  {
    id: "org-001",
    name: "Admin Organization",
    plan: "Enterprise",
    users: 10,
    status: "Active",
    createdAt: "2023-01-15",
    owner: "Admin User"
  },
  {
    id: "org-002",
    name: "Marketing Team Org",
    plan: "Pro",
    users: 5,
    status: "Active",
    createdAt: "2023-02-20",
    owner: "Marketing User"
  },
  {
    id: "org-003",
    name: "Design Team Org",
    plan: "Standard",
    users: 3,
    status: "Active",
    createdAt: "2023-03-10",
    owner: "Design User"
  },
  {
    id: "org-004",
    name: "Analytics Team Org",
    plan: "Pro",
    users: 7,
    status: "Trial",
    createdAt: "2023-04-05",
    owner: "Analytics User"
  }
];

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("organizations");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SAAS Administration</h1>
          <p className="text-adpilot-text-secondary mt-1">Manage organizations, users, and subscription plans</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            System Status
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Organization
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue MRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,580</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="organizations">
                  <Layers className="mr-2 h-4 w-4" />
                  Organizations
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="plans">
                  <Shield className="mr-2 h-4 w-4" />
                  Plans & Billing
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search organizations..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <ChevronDown className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>
          </div>
          
          <TabsContent value="organizations" className="mt-0">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Organization</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Owner</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Plan</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Users</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredOrganizations.map((org) => (
                      <tr key={org.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">{org.name}</td>
                        <td className="p-4 align-middle">{org.owner}</td>
                        <td className="p-4 align-middle">
                          <Badge variant={
                            org.plan === "Enterprise" ? "default" :
                            org.plan === "Pro" ? "secondary" :
                            "outline"
                          }>
                            {org.plan}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">{org.users}</td>
                        <td className="p-4 align-middle">
                          <Badge variant={org.status === "Active" ? "success" : "warning"}>
                            {org.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">{org.createdAt}</td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="sm">Manage</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <div className="flex items-center justify-center py-10">
              <div className="text-center">
                <Users className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">User Management</h3>
                <p className="text-muted-foreground mb-4">View and manage all users across organizations</p>
                <Button>View All Users</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="plans" className="mt-0">
            <div className="flex items-center justify-center py-10">
              <div className="text-center">
                <Shield className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Plans & Billing</h3>
                <p className="text-muted-foreground mb-4">Configure subscription plans and view billing information</p>
                <Button>Manage Plans</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <div className="flex items-center justify-center py-10">
              <div className="text-center">
                <Settings className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">System Settings</h3>
                <p className="text-muted-foreground mb-4">Configure global system settings and defaults</p>
                <Button>Open Settings</Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default AdminDashboardPage;
