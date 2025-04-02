
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ActiveCampaigns from "@/components/dashboard/ActiveCampaigns";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import TopCohorts from "@/components/dashboard/TopCohorts";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Plus } from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-adpilot-text-secondary mt-1">Welcome to AdPilot - Your campaign management platform</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Campaign performance across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Cohorts</CardTitle>
            <CardDescription>Best performing audience segments</CardDescription>
          </CardHeader>
          <CardContent>
            <TopCohorts />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        <Card className="lg:col-span-2">
          <Tabs defaultValue="active">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Campaigns</CardTitle>
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="active">
                <ActiveCampaigns />
              </TabsContent>
              <TabsContent value="draft">
                <p className="text-sm text-center py-8 text-adpilot-text-muted">No draft campaigns yet</p>
              </TabsContent>
              <TabsContent value="completed">
                <p className="text-sm text-center py-8 text-adpilot-text-muted">No completed campaigns yet</p>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;
