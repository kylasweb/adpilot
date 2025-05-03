
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Calendar, Download, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// Types for our API responses
interface EmailMetrics {
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  industryOpenRate: string;
  industryClickRate: string;
  industryBounceRate: string;
  industryUnsubscribeRate: string;
}

interface CampaignData {
  id: string;
  name: string;
  sentDate: string;
  recipients: number;
  opens: number;
  clicks: number;
  openRate: number;
  clickRate: number;
}

interface EmailAnalyticsData {
  metrics: EmailMetrics;
  performanceData: {
    date: string;
    opens: number;
    clicks: number;
    bounces: number;
  }[];
  campaigns: CampaignData[];
  engagementData: {
    category: string;
    value: number;
  }[];
}

const EmailAnalyticsPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("30d");
  const [analyticsData, setAnalyticsData] = useState<EmailAnalyticsData | null>(null);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an actual API call
      // Example: const response = await fetch(`/api/email-analytics?timeframe=${timeframe}`);
      
      // Simulating API response for demo
      setTimeout(() => {
        const data: EmailAnalyticsData = {
          metrics: {
            openRate: 23.5,
            clickRate: 4.2,
            bounceRate: 1.3,
            unsubscribeRate: 0.4,
            industryOpenRate: "15-25%",
            industryClickRate: "2.5%",
            industryBounceRate: "<2%",
            industryUnsubscribeRate: "<0.5%"
          },
          performanceData: [
            { date: "Jan 1", opens: 452, clicks: 78, bounces: 12 },
            { date: "Jan 8", opens: 520, clicks: 95, bounces: 15 },
            { date: "Jan 15", opens: 610, clicks: 120, bounces: 10 },
            { date: "Jan 22", opens: 580, clicks: 105, bounces: 13 },
            { date: "Jan 29", opens: 650, clicks: 135, bounces: 14 },
            { date: "Feb 5", opens: 720, clicks: 150, bounces: 16 },
            { date: "Feb 12", opens: 680, clicks: 140, bounces: 12 },
          ],
          campaigns: [
            { id: "1", name: "January Newsletter", sentDate: "2025-01-15", recipients: 5000, opens: 1250, clicks: 250, openRate: 25.0, clickRate: 5.0 },
            { id: "2", name: "Product Launch", sentDate: "2025-01-22", recipients: 7500, opens: 1800, clicks: 450, openRate: 24.0, clickRate: 6.0 },
            { id: "3", name: "Special Promotion", sentDate: "2025-02-05", recipients: 6000, opens: 1320, clicks: 310, openRate: 22.0, clickRate: 5.2 }
          ],
          engagementData: [
            { category: "Opened & Clicked", value: 20 },
            { category: "Opened Only", value: 45 },
            { category: "Not Opened", value: 35 }
          ]
        };
        setAnalyticsData(data);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching email analytics:", error);
      toast({
        title: "Error",
        description: "Failed to fetch email analytics data. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeframe]);

  const handleRefresh = () => {
    fetchAnalyticsData();
    toast({
      title: "Refreshing data",
      description: "Analytics data is being updated"
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "Analytics report is being prepared for download"
    });
    // In a real app, this would trigger an API call to generate and download a report
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Email Analytics</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Track and analyze email performance with detailed metrics
            </p>
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
                  Refresh analytics data
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
                  Export analytics as CSV/PDF
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className={isLoading ? "animate-pulse" : ""}>
                  <CardContent className="p-6">
                    <div className="text-adpilot-text-muted text-sm">Open Rate</div>
                    <div className="text-3xl font-bold">
                      {isLoading ? "..." : `${analyticsData?.metrics.openRate}%`}
                    </div>
                    <div className="text-xs text-adpilot-text-muted mt-1">
                      vs. industry avg: {isLoading ? "..." : analyticsData?.metrics.industryOpenRate}
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                Percentage of recipients who opened your email
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className={isLoading ? "animate-pulse" : ""}>
                  <CardContent className="p-6">
                    <div className="text-adpilot-text-muted text-sm">Click Rate</div>
                    <div className="text-3xl font-bold">
                      {isLoading ? "..." : `${analyticsData?.metrics.clickRate}%`}
                    </div>
                    <div className="text-xs text-adpilot-text-muted mt-1">
                      vs. industry avg: {isLoading ? "..." : analyticsData?.metrics.industryClickRate}
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                Percentage of recipients who clicked a link in your email
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className={isLoading ? "animate-pulse" : ""}>
                  <CardContent className="p-6">
                    <div className="text-adpilot-text-muted text-sm">Bounce Rate</div>
                    <div className="text-3xl font-bold">
                      {isLoading ? "..." : `${analyticsData?.metrics.bounceRate}%`}
                    </div>
                    <div className="text-xs text-adpilot-text-muted mt-1">
                      vs. industry avg: {isLoading ? "..." : analyticsData?.metrics.industryBounceRate}
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                Percentage of emails that couldn't be delivered
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className={isLoading ? "animate-pulse" : ""}>
                  <CardContent className="p-6">
                    <div className="text-adpilot-text-muted text-sm">Unsubscribe Rate</div>
                    <div className="text-3xl font-bold">
                      {isLoading ? "..." : `${analyticsData?.metrics.unsubscribeRate}%`}
                    </div>
                    <div className="text-xs text-adpilot-text-muted mt-1">
                      vs. industry avg: {isLoading ? "..." : analyticsData?.metrics.industryUnsubscribeRate}
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                Percentage of recipients who unsubscribed after opening
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500 text-white">
                        <LineChart className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">Performance Over Time</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="h-64 bg-gray-50 rounded animate-pulse flex items-center justify-center">
                        <p className="text-adpilot-text-muted">Loading performance data...</p>
                      </div>
                    ) : analyticsData && analyticsData.performanceData.length > 0 ? (
                      <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-adpilot-text-muted">Performance chart with data from {analyticsData.performanceData.length} time periods</p>
                        {/* In a real app, this would be a Recharts LineChart component */}
                      </div>
                    ) : (
                      <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-adpilot-text-muted">No performance data available for the selected timeframe</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[300px]">
                Visualize open, click, and bounce rates over time to identify trends
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500 text-white">
                        <PieChart className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">Engagement Breakdown</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="h-64 bg-gray-50 rounded animate-pulse flex items-center justify-center">
                        <p className="text-adpilot-text-muted">Loading engagement data...</p>
                      </div>
                    ) : analyticsData && analyticsData.engagementData.length > 0 ? (
                      <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-adpilot-text-muted">Engagement chart with {analyticsData.engagementData.length} segments</p>
                        {/* In a real app, this would be a Recharts PieChart component */}
                      </div>
                    ) : (
                      <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                        <p className="text-adpilot-text-muted">No engagement data available for the selected timeframe</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[300px]">
                Visual breakdown of audience engagement categories
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500 text-white">
                      <BarChart className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">Campaign Comparison</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-64 bg-gray-50 rounded animate-pulse flex items-center justify-center">
                      <p className="text-adpilot-text-muted">Loading campaign data...</p>
                    </div>
                  ) : analyticsData && analyticsData.campaigns.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opens</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Click Rate</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {analyticsData.campaigns.map((campaign) => (
                            <tr key={campaign.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(campaign.sentDate).toLocaleDateString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.recipients.toLocaleString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.opens.toLocaleString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.clicks.toLocaleString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.openRate.toFixed(1)}%</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.clickRate.toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                      <p className="text-adpilot-text-muted">No campaign data available for the selected timeframe</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[300px]">
              Compare performance metrics across different campaigns
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </AppLayout>
  );
};

export default EmailAnalyticsPage;
