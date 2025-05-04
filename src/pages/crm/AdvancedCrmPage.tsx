
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart2, 
  Briefcase, 
  ChevronRight, 
  DollarSign, 
  Inbox, 
  Search, 
  UserPlus,
  Phone,
  Mail,
  LineChart,
  Building2,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AdvancedCrmPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Advanced CRM</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Comprehensive customer relationship management with accounting and HRM
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="leads">Leads & Deals</TabsTrigger>
            <TabsTrigger value="accounting">Accounting</TabsTrigger>
            <TabsTrigger value="hrm">HRM</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,284</div>
                  <div className="text-xs text-green-600">+15 this month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Open Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs text-blue-600">$128,450 total value</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <div className="text-xs text-amber-600">2 on leave</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$42,590</div>
                  <div className="text-xs text-green-600">↑ 12% from last month</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-md border">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Call with Global Tech Solutions</h3>
                          <Badge className="bg-blue-100 text-blue-800">Call</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">John scheduled a follow-up call to discuss the proposal</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>John Doe</span>
                          <span>Today, 10:30 AM</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 rounded-md border">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Deal Won: InnoTech Industries</h3>
                          <Badge className="bg-green-100 text-green-800">Deal Won</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">$24,500 deal closed for website redesign and SEO services</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Sarah Johnson</span>
                          <span>Today, 9:15 AM</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 rounded-md border">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Email Campaign Sent</h3>
                          <Badge className="bg-purple-100 text-purple-800">Marketing</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Summer promotion email sent to 450 contacts</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Marketing Team</span>
                          <span>Yesterday, 3:20 PM</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 rounded-md border">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                        <UserPlus className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">New Lead: Pinnacle Solutions</h3>
                          <Badge className="bg-amber-100 text-amber-800">New Lead</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Contact form submission requesting a quote for digital marketing</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Lead Capture System</span>
                          <span>Yesterday, 11:45 AM</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">View All Activity</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sales Pipeline</CardTitle>
                  <CardDescription>Current deals by stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Qualified Leads (8)</span>
                        <span>$64,200</span>
                      </div>
                      <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div className="h-full bg-blue-500 w-[30%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Proposal Sent (6)</span>
                        <span>$82,750</span>
                      </div>
                      <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div className="h-full bg-purple-500 w-[40%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Negotiation (5)</span>
                        <span>$103,500</span>
                      </div>
                      <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div className="h-full bg-amber-500 w-[50%]"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Closing (5)</span>
                        <span>$76,300</span>
                      </div>
                      <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div className="h-full bg-green-500 w-[35%]"></div>
                      </div>
                    </div>
                    
                    <div className="pt-2 mt-4 border-t">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Total Pipeline Value</span>
                        <span>$326,750</span>
                      </div>
                    </div>
                    
                    <Button className="w-full">View Full Pipeline</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> Upcoming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Follow up with BlueSky Inc</h4>
                        <Badge>Today</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Call John regarding the proposal</p>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
                            M
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">Maria</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Send revised proposal</h4>
                        <Badge>Today</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Update pricing for TechCorp project</p>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">
                            J
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">John</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Quarterly review meeting</h4>
                        <Badge>Tomorrow</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Team performance and KPI review</p>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs">
                            S
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">Sarah</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">View All Tasks</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" /> Top Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">TechCorp Industries</h4>
                        <span className="text-sm font-medium text-green-600">$42,500</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Enterprise client • 2+ years</p>
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" variant="outline">View Account</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Pinnacle Solutions</h4>
                        <span className="text-sm font-medium text-green-600">$38,200</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Mid-market • 1+ year</p>
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" variant="outline">View Account</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Global Innovations</h4>
                        <span className="text-sm font-medium text-green-600">$27,800</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Enterprise • New client</p>
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" variant="outline">View Account</Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">View All Accounts</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" /> Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Lead Conversion Rate</span>
                        <span className="text-green-600">24%</span>
                      </div>
                      <Progress value={24} className="h-2" />
                      <p className="text-xs text-green-600">↑ 3% from last month</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Customer Retention</span>
                        <span className="text-green-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <p className="text-xs text-green-600">↑ 1% from last month</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Revenue Target</span>
                        <span className="text-amber-600">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <p className="text-xs text-amber-600">On track for Q3</p>
                    </div>
                    
                    <Button variant="outline" className="w-full">View Full Analytics</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>CRM Integrations</CardTitle>
                  <Button variant="outline">Configure</Button>
                </div>
                <CardDescription>Connected software and data syncing status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                      <Inbox className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Email Integration</h3>
                    <p className="text-xs text-muted-foreground mt-1">Connected to Google Workspace</p>
                    <Badge className="mt-3 bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="border rounded-md p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Accounting</h3>
                    <p className="text-xs text-muted-foreground mt-1">Connected to QuickBooks</p>
                    <Badge className="mt-3 bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="border rounded-md p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-3">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Calendar</h3>
                    <p className="text-xs text-muted-foreground mt-1">Connected to Google Calendar</p>
                    <Badge className="mt-3 bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="border rounded-md p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-3">
                      <LineChart className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Analytics</h3>
                    <p className="text-xs text-muted-foreground mt-1">Not connected</p>
                    <Button size="sm" className="mt-3">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leads" className="space-y-6 mt-6">
            <div className="py-4">
              <p className="text-muted-foreground">Manage your leads and deals.</p>
            </div>
            {/* Leads and deals content would go here */}
          </TabsContent>
          
          <TabsContent value="accounting" className="space-y-6 mt-6">
            <div className="py-4">
              <p className="text-muted-foreground">Financial management and accounting tools.</p>
            </div>
            {/* Accounting content would go here */}
          </TabsContent>
          
          <TabsContent value="hrm" className="space-y-6 mt-6">
            <div className="py-4">
              <p className="text-muted-foreground">Human Resources Management system.</p>
            </div>
            {/* HRM content would go here */}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdvancedCrmPage;
