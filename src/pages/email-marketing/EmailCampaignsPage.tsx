
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Mail, Plus, Calendar, Users, BarChart, FileText, Clock, Copy, Eye, Send, Lightbulb } from "lucide-react";

const EmailCampaignsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const emailCampaigns = [
    {
      id: 1,
      name: "May Newsletter",
      status: "Scheduled",
      audienceSize: "1,245",
      openRate: "32.4%",
      clickRate: "8.7%",
      sendDate: "2025-05-05",
    },
    {
      id: 2,
      name: "New Product Launch",
      status: "Draft",
      audienceSize: "5,432",
      openRate: "N/A",
      clickRate: "N/A",
      sendDate: "-",
    },
    {
      id: 3,
      name: "Customer Survey",
      status: "Sent",
      audienceSize: "3,567",
      openRate: "29.8%",
      clickRate: "12.3%",
      sendDate: "2025-04-15",
    },
    {
      id: 4,
      name: "Spring Sale Announcement",
      status: "Sent",
      audienceSize: "8,976",
      openRate: "35.2%",
      clickRate: "15.1%",
      sendDate: "2025-03-20",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold">Email Campaign Builder</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Create and manage email campaigns with AI-powered content suggestions
            </p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Email Campaign</DialogTitle>
                <DialogDescription>
                  Set up your email campaign by filling in the details below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="Enter campaign name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email-list">Email List</Label>
                    <Select>
                      <SelectTrigger id="email-list">
                        <SelectValue placeholder="Select list" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subscribers</SelectItem>
                        <SelectItem value="active">Active Customers</SelectItem>
                        <SelectItem value="new">New Subscribers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="template">Email Template</Label>
                    <Select>
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Newsletter</SelectItem>
                        <SelectItem value="promotion">Promotional</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="custom">Custom Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input id="subject" placeholder="Enter email subject" />
                </div>
                <div className="grid gap-2">
                  <Label>Send Options</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="send-now" name="send-option" />
                      <Label htmlFor="send-now">Send immediately</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="send-later" name="send-option" />
                      <Label htmlFor="send-later">Schedule for later</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsModalOpen(false)}>Create Campaign</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="campaigns">
          <TabsList className="mb-4">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="automations">Email Automations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>Manage and track all your email marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <Input placeholder="Search campaigns..." className="max-w-sm" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Campaign Name</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Audience Size</th>
                        <th className="text-left p-2">Open Rate</th>
                        <th className="text-left p-2">Click Rate</th>
                        <th className="text-left p-2">Send Date</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emailCampaigns.map(campaign => (
                        <tr key={campaign.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{campaign.name}</td>
                          <td className="p-2">
                            <Badge variant={
                              campaign.status === "Draft" ? "outline" :
                              campaign.status === "Scheduled" ? "secondary" : "default"
                            }>
                              {campaign.status}
                            </Badge>
                          </td>
                          <td className="p-2">{campaign.audienceSize}</td>
                          <td className="p-2">{campaign.openRate}</td>
                          <td className="p-2">{campaign.clickRate}</td>
                          <td className="p-2">{campaign.sendDate}</td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" title="Preview">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Edit">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Duplicate">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Email Performance Analytics</CardTitle>
                <CardDescription>Track and analyze the performance of your email campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Mail className="h-8 w-8 text-blue-500" />
                        <h3 className="text-xl font-bold">32.8%</h3>
                        <p className="text-sm text-gray-500">Average Open Rate</p>
                        <Badge variant="outline" className="text-green-600">+2.4% from last month</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Users className="h-8 w-8 text-purple-500" />
                        <h3 className="text-xl font-bold">12.1%</h3>
                        <p className="text-sm text-gray-500">Average Click Rate</p>
                        <Badge variant="outline" className="text-green-600">+1.2% from last month</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <BarChart className="h-8 w-8 text-green-500" />
                        <h3 className="text-xl font-bold">18,342</h3>
                        <p className="text-sm text-gray-500">Total Emails Sent</p>
                        <Badge variant="outline" className="text-blue-600">Last 30 days</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Campaign Performance</h3>
                  <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Performance chart will render here</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Best Performing Emails</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Campaign</th>
                        <th className="text-left p-2">Open Rate</th>
                        <th className="text-left p-2">Click Rate</th>
                        <th className="text-left p-2">Conversion Rate</th>
                        <th className="text-left p-2">Send Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">Spring Sale Announcement</td>
                        <td className="p-2">35.2%</td>
                        <td className="p-2">15.1%</td>
                        <td className="p-2">8.3%</td>
                        <td className="p-2">2025-03-20</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">Product Feature Update</td>
                        <td className="p-2">33.7%</td>
                        <td className="p-2">14.2%</td>
                        <td className="p-2">7.5%</td>
                        <td className="p-2">2025-02-15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="automations">
            <Card>
              <CardHeader>
                <CardTitle>Email Automations</CardTitle>
                <CardDescription>Create automated email sequences based on user behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <Input placeholder="Search automations..." className="max-w-sm" />
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Automation
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>Welcome Sequence</CardTitle>
                        <Badge>Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">Automated welcome email series sent to new subscribers.</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-4 w-4" />
                          <span>3 emails in sequence</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>562 subscribers processed</span>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Disable</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>Abandoned Cart</CardTitle>
                        <Badge>Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">Reminder emails for users who abandoned their shopping carts.</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-4 w-4" />
                          <span>2 emails in sequence</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>243 subscribers processed</span>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Disable</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>Re-engagement</CardTitle>
                        <Badge variant="outline">Draft</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">Campaign to re-engage inactive subscribers.</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-4 w-4" />
                          <span>1 email in sequence</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>Not yet active</span>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button size="sm">Activate</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default EmailCampaignsPage;
