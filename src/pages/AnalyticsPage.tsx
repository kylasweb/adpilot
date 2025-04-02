
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PerformanceOverview from "@/components/analytics/PerformanceOverview";
import CampaignMetrics from "@/components/analytics/CampaignMetrics";
import AudienceInsights from "@/components/analytics/AudienceInsights";

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = React.useState("30d");
  
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-adpilot-text-secondary mt-1">Campaign performance metrics and insights</p>
        </div>
        <div>
          <Select defaultValue="30d" onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <Tabs defaultValue="overview">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Analytics</CardTitle>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Data shown for {dateRange === "7d" ? "last 7 days" : dateRange === "30d" ? "last 30 days" : dateRange === "90d" ? "last 90 days" : "year to date"}</CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="overview" className="m-0">
              <PerformanceOverview dateRange={dateRange} />
            </TabsContent>
            <TabsContent value="campaigns" className="m-0">
              <CampaignMetrics dateRange={dateRange} />
            </TabsContent>
            <TabsContent value="audience" className="m-0">
              <AudienceInsights dateRange={dateRange} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </AppLayout>
  );
};

export default AnalyticsPage;
