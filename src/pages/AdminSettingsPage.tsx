
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Shield, User, Bell, Globe, Code, Brush } from "lucide-react";

const AdminSettingsPage = () => {
  const [companyName, setCompanyName] = React.useState("AdPilot Inc.");
  const [websiteUrl, setWebsiteUrl] = React.useState("https://adpilot.com");
  const [timezone, setTimezone] = React.useState("America/New_York");
  const [dateFormat, setDateFormat] = React.useState("MM/DD/YYYY");
  const [primaryEmail, setPrimaryEmail] = React.useState("admin@adpilot.com");
  const [enableEmailNotifications, setEnableEmailNotifications] = React.useState(true);
  const [enableSlackNotifications, setEnableSlackNotifications] = React.useState(false);
  
  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("General settings saved successfully!");
  };
  
  const handleSaveNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification settings saved successfully!");
  };
  
  const handleSaveSecuritySettings = () => {
    toast.success("Security settings saved successfully!");
  };
  
  const handleSaveAppearanceSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appearance settings saved successfully!");
  };
  
  const handleResetPassword = () => {
    toast.success("Password reset link sent to your email!");
  };
  
  const handleEnableTwoFactor = () => {
    toast.success("Two-factor authentication set up successfully!");
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-adpilot-text-secondary mt-1">Manage your account and application settings</p>
        </div>
        <div>
          <Badge variant="outline">Current Plan: Professional</Badge>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="general">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Account Settings</CardTitle>
              <TabsList>
                <TabsTrigger value="general">
                  <Globe className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="appearance">
                  <Brush className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="api">
                  <Code className="h-4 w-4 mr-2" />
                  API
                </TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Manage your account, notification preferences, and organization settings</CardDescription>
          </CardHeader>
          
          <CardContent>
            <TabsContent value="general" className="space-y-6">
              <form onSubmit={handleSaveGeneralSettings}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Organization Details</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Update your organization information
                    </p>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input 
                          id="companyName" 
                          value={companyName} 
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="websiteUrl">Website URL</Label>
                        <Input 
                          id="websiteUrl" 
                          value={websiteUrl} 
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Regional Settings</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Customize your timezone and date formats
                    </p>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                          id="timezone"
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <select
                          id="dateFormat"
                          value={dateFormat}
                          onChange={(e) => setDateFormat(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save General Settings</Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <form onSubmit={handleSaveNotificationSettings}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose how you want to be notified
                    </p>
                    
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="primaryEmail">Primary Email</Label>
                        <Input 
                          id="primaryEmail" 
                          type="email" 
                          value={primaryEmail} 
                          onChange={(e) => setPrimaryEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch
                          checked={enableEmailNotifications}
                          onCheckedChange={setEnableEmailNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Slack Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications in Slack
                          </p>
                        </div>
                        <Switch
                          checked={enableSlackNotifications}
                          onCheckedChange={setEnableSlackNotifications}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Campaign Alerts</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose which campaign events trigger notifications
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Campaign Started</Label>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Campaign Ended</Label>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Budget Threshold Warning</Label>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Performance Anomalies</Label>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Notification Settings</Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Account Security</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your password and security settings
                </p>
                
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Password</h4>
                        <p className="text-sm text-muted-foreground">
                          Last updated 30 days ago
                        </p>
                      </div>
                      <Button variant="outline" onClick={handleResetPassword}>Change Password</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Two-factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button onClick={handleEnableTwoFactor}>Enable</Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Active Sessions</h4>
                        <p className="text-sm text-muted-foreground">
                          Manage your active login sessions
                        </p>
                      </div>
                      <Button variant="outline">View Sessions</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium">User Access Roles</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure security roles for team members
                  </p>
                  
                  <div className="rounded-md border">
                    <div className="px-4 py-3 bg-muted/50 border-b">
                      <div className="grid grid-cols-3 text-sm font-medium">
                        <div>Role</div>
                        <div>Description</div>
                        <div>Users</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-3 px-4 py-3 text-sm">
                        <div>Administrator</div>
                        <div>Full access to all features</div>
                        <div>2 users</div>
                      </div>
                      <div className="grid grid-cols-3 px-4 py-3 text-sm">
                        <div>Campaign Manager</div>
                        <div>Can create and manage campaigns</div>
                        <div>5 users</div>
                      </div>
                      <div className="grid grid-cols-3 px-4 py-3 text-sm">
                        <div>Analyst</div>
                        <div>View-only access to reports</div>
                        <div>3 users</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button onClick={handleSaveSecuritySettings}>Save Security Settings</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <form onSubmit={handleSaveAppearanceSettings}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Branding</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Customize your application appearance
                    </p>
                    
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label>Logo</Label>
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                            <User className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <Button variant="outline" type="button">Change Logo</Button>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label>Primary Color</Label>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-md bg-adpilot-primary" />
                          <Input 
                            type="color" 
                            defaultValue="#9b87f5" 
                            className="w-20 h-10 p-1" 
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label>Secondary Color</Label>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-md bg-adpilot-secondary" />
                          <Input 
                            type="color" 
                            defaultValue="#7E69AB" 
                            className="w-20 h-10 p-1" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Interface Options</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Customize your interface experience
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Toggle between light and dark theme
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Compact Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Use a more compact UI layout
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Animation Effects</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable UI animation effects
                          </p>
                        </div>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Appearance Settings</Button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">API Access</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your API keys and webhooks
                </p>
                
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">API Key</h4>
                        <Badge>Production</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Input 
                          type="password"
                          value="••••••••••••••••••••••••••••••"
                          readOnly
                          className="font-mono"
                        />
                        <Button variant="outline" size="sm">Copy</Button>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Last used 2 days ago • Created on Jun 15, 2023
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Webhook URL</h4>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Input 
                          value="https://your-app.com/webhook/adpilot"
                          className="font-mono text-sm"
                        />
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 bg-muted/30">
                    <div className="flex items-center gap-2 text-sm">
                      <Code className="h-4 w-4" />
                      <span>View API Documentation</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save API Settings</Button>
              </div>
            </TabsContent>
          </CardContent>
          
          <CardFooter className="border-t bg-muted/50">
            <div className="text-xs text-muted-foreground">
              Last updated: Today at 2:30 PM
            </div>
          </CardFooter>
        </Tabs>
      </Card>
    </AppLayout>
  );
};

export default AdminSettingsPage;
