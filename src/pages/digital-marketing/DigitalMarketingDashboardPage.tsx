
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Globe, BarChart2, Users, TrendingUp, Layers, Calendar, Download, RefreshCw, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface CampaignMetrics {
  activeCampaigns: number;
  totalImpressions: number;
  averageCTR: number;
  totalConversions: number;
  growthActiveCampaigns: number;
  growthImpressions: number;
  growthCTR: number;
  growthConversions: number;
}

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: string;
  budget: string;
  performance: string;
}

interface ApiData {
  metrics: CampaignMetrics;
  activeCampaigns: Campaign[];
  scheduledCampaigns: Campaign[];
  completedCampaigns: Campaign[];
}

const DigitalMarketingDashboardPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ApiData | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an actual API call
      // Example: const response = await fetch('/api/digital-marketing/dashboard');
      
      // Simulating API response for demo
      setTimeout(() => {
        const apiData: ApiData = {
          metrics: {
            activeCampaigns: 12,
            totalImpressions: 842000,
            averageCTR: 3.2,
            totalConversions: 1463,
            growthActiveCampaigns: 23,
            growthImpressions: 12,
            growthCTR: -0.5,
            growthConversions: 28
          },
          activeCampaigns: [
            { id: "1", name: "Summer Sale 2025", platform: "Facebook, Instagram", status: "Active", budget: "$5,000.00", performance: "4.8% CTR" },
            { id: "2", name: "Product Launch", platform: "Google Ads, YouTube", status: "Active", budget: "$12,000.00", performance: "3.2% CTR" },
            { id: "3", name: "Brand Awareness", platform: "TikTok, Instagram", status: "Active", budget: "$7,500.00", performance: "5.6% CTR" }
          ],
          scheduledCampaigns: [
            { id: "4", name: "Holiday Special", platform: "Facebook, Instagram", status: "Scheduled", budget: "$8,500.00", performance: "N/A" },
            { id: "5", name: "Q2 Promotion", platform: "Google Ads, Display", status: "Scheduled", budget: "$10,000.00", performance: "N/A" }
          ],
          completedCampaigns: [
            { id: "6", name: "Spring Collection", platform: "Instagram, Pinterest", status: "Completed", budget: "$6,200.00", performance: "4.1% CTR" },
            { id: "7", name: "Winter Sale", platform: "Facebook, Google Ads", status: "Completed", budget: "$9,300.00", performance: "3.9% CTR" }
          ]
        };
        setData(apiData);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
    toast({
      title: "Refreshing data",
      description: "Dashboard data is being updated"
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "Dashboard report is being prepared for download"
    });
    // In a real app, this would trigger an API call to generate and download a report
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Marketing</h1>
          <p className="text-adpilot-text-secondary mt-1">Manage your digital marketing campaigns and analytics</p>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Refresh dashboard data
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Export dashboard as PDF/CSV
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button>
            <span className="mr-2">+</span> New Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className={isLoading ? "animate-pulse" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isLoading ? "..." : data?.metrics.activeCampaigns}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ↑ {isLoading ? "..." : `${data?.metrics.growthActiveCampaigns}%`} from last month
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              Number of currently running marketing campaigns
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className={isLoading ? "animate-pulse" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Impressions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : `${(data?.metrics.totalImpressions / 1000).toFixed(0)}K`}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ↑ {isLoading ? "..." : `${data?.metrics.growthImpressions}%`} from last month
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              Total number of times your ads were viewed
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className={isLoading ? "animate-pulse" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg. CTR</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isLoading ? "..." : `${data?.metrics.averageCTR}%`}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {data?.metrics.growthCTR && data?.metrics.growthCTR < 0 ? "↓" : "↑"} {isLoading ? "..." : `${Math.abs(data?.metrics.growthCTR || 0)}%`} from last month
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              Average click-through rate across all campaigns
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className={isLoading ? "animate-pulse" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : data?.metrics.totalConversions.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ↑ {isLoading ? "..." : `${data?.metrics.growthConversions}%`} from last month
                  </p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              Number of successful conversions from your campaigns
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Digital Marketing Tools</CardTitle>
          <CardDescription>Access and manage your marketing tools and platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-blue-500" />
                        Ad Manager
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Manage your paid advertising campaigns across platforms</p>
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <a href="/digital-marketing/ad-manager">Open Tool</a>
                      </Button>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  Create, optimize, and track ad campaigns across multiple platforms
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                        Analytics
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Track performance metrics and campaign effectiveness</p>
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <a href="/digital-marketing/analytics">Open Tool</a>
                      </Button>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  Advanced analytics with AI-powered insights and custom reporting
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Users className="h-5 w-5 mr-2 text-purple-500" />
                        Social Planner
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Schedule and manage social media content across platforms</p>
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <a href="/digital-marketing/social-planner">Open Tool</a>
                      </Button>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  Plan, schedule, and analyze social media content with AI assistance
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Layers className="h-5 w-5 mr-2 text-orange-500" />
                        Automation
                        <Info className="h-4 w-4 ml-1 text-gray-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Create marketing workflows and automated sequences</p>
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <a href="/digital-marketing/automation">Open Tool</a>
                      </Button>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  Build custom marketing automation workflows with advanced triggers and actions
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
              {isLoading ? (
                <div className="rounded-md border animate-pulse">
                  <div className="h-72 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading campaign data...</p>
                  </div>
                </div>
              ) : data?.activeCampaigns && data.activeCampaigns.length > 0 ? (
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
                        {data.activeCampaigns.map((campaign) => (
                          <tr key={campaign.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{campaign.name}</td>
                            <td className="p-4 align-middle">{campaign.platform}</td>
                            <td className="p-4 align-middle">{campaign.status}</td>
                            <td className="p-4 align-middle">{campaign.budget}</td>
                            <td className="p-4 align-middle">{campaign.performance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No active campaigns found.</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="scheduled">
              {isLoading ? (
                <div className="rounded-md border animate-pulse">
                  <div className="h-72 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading campaign data...</p>
                  </div>
                </div>
              ) : data?.scheduledCampaigns && data.scheduledCampaigns.length > 0 ? (
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
                        {data.scheduledCampaigns.map((campaign) => (
                          <tr key={campaign.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{campaign.name}</td>
                            <td className="p-4 align-middle">{campaign.platform}</td>
                            <td className="p-4 align-middle">{campaign.status}</td>
                            <td className="p-4 align-middle">{campaign.budget}</td>
                            <td className="p-4 align-middle">{campaign.performance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No scheduled campaigns found.</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="completed">
              {isLoading ? (
                <div className="rounded-md border animate-pulse">
                  <div className="h-72 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading campaign data...</p>
                  </div>
                </div>
              ) : data?.completedCampaigns && data.completedCampaigns.length > 0 ? (
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
                        {data.completedCampaigns.map((campaign) => (
                          <tr key={campaign.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{campaign.name}</td>
                            <td className="p-4 align-middle">{campaign.platform}</td>
                            <td className="p-4 align-middle">{campaign.status}</td>
                            <td className="p-4 align-middle">{campaign.budget}</td>
                            <td className="p-4 align-middle">{campaign.performance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No completed campaigns found.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default DigitalMarketingDashboardPage;
