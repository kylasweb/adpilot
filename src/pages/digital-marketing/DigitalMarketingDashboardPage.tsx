
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Globe, BarChart2, Users, TrendingUp, Layers } from "lucide-react";

const DigitalMarketingDashboardPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Marketing</h1>
          <p className="text-adpilot-text-secondary mt-1">Manage your digital marketing campaigns and analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 23% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842K</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. CTR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground mt-1">↓ 0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,463</div>
            <p className="text-xs text-muted-foreground mt-1">↑ 28% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Digital Marketing Tools</CardTitle>
          <CardDescription>Access and manage your marketing tools and platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-500" />
                  Ad Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Manage your paid advertising campaigns across platforms</p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/digital-marketing/ad-manager">Open Tool</a>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Track performance metrics and campaign effectiveness</p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/digital-marketing/analytics">Open Tool</a>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-500" />
                  Social Planner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Schedule and manage social media content across platforms</p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/digital-marketing/social-planner">Open Tool</a>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-orange-500" />
                  Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create marketing workflows and automated sequences</p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/digital-marketing/automation">Open Tool</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <CardDescription>Overview of your digital marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Campaign Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Platform</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Budget</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">Summer Sale 2025</td>
                        <td className="p-4 align-middle">Facebook, Instagram</td>
                        <td className="p-4 align-middle">Active</td>
                        <td className="p-4 align-middle">$5,000.00</td>
                        <td className="p-4 align-middle">4.8% CTR</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">Product Launch</td>
                        <td className="p-4 align-middle">Google Ads, YouTube</td>
                        <td className="p-4 align-middle">Active</td>
                        <td className="p-4 align-middle">$12,000.00</td>
                        <td className="p-4 align-middle">3.2% CTR</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">Brand Awareness</td>
                        <td className="p-4 align-middle">TikTok, Instagram</td>
                        <td className="p-4 align-middle">Active</td>
                        <td className="p-4 align-middle">$7,500.00</td>
                        <td className="p-4 align-middle">5.6% CTR</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="scheduled">
              <div className="text-center py-6 text-muted-foreground">
                <p>No scheduled campaigns found.</p>
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="text-center py-6 text-muted-foreground">
                <p>No completed campaigns found.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default DigitalMarketingDashboardPage;
