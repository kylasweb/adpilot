
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from "@/components/dashboard/DashboardStats";
import StatementPiece from "@/components/statement/StatementPiece";
import ActiveCampaigns from "@/components/dashboard/ActiveCampaigns";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import TopCohorts from "@/components/dashboard/TopCohorts";
import RecentActivity from "@/components/dashboard/RecentActivity";
import NewCampaignForm from "@/components/campaigns/NewCampaignForm";
import { Plus } from "lucide-react";
import * as anime from "animejs";

const Index = () => {
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);

  useEffect(() => {
    // Orchestrated reveal sequence for dashboard sections
    const tl = anime.Timeline({
      easing: 'easeOutQuad',
      duration: 800,
    })
    .add({
      targets: '.dashboard-section',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(150),
    });

    tl.play();
  }, []);

  return (
    <AppLayout>
      <div className="relative">
        <StatementPiece className="hidden lg:block" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Dashboard</h1>
            <p className="text-adpilot-text-secondary mt-2 text-lg" style={{ fontFamily: "var(--font-body)" }}>Welcome to AdPilot - Your campaign management platform</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setShowNewCampaignForm(true)} className="shadow-lg hover:shadow-xl transition-shadow">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </div>
        </div>

        <div className="dashboard-section">
          <DashboardStats />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mt-6 dashboard-section">
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

        <div className="grid gap-6 lg:grid-cols-3 mt-6 dashboard-section">
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

        <NewCampaignForm
          open={showNewCampaignForm}
          onOpenChange={setShowNewCampaignForm}
        />
      </div>
    </AppLayout>
  );
};

export default Index;
