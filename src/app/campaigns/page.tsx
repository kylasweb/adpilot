'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignList from "@/components/campaigns/CampaignList";
import CampaignCalendar from "@/components/campaigns/CampaignCalendar";
import BudgetOverview from "@/components/campaigns/BudgetOverview";
import NewCampaignForm from "@/components/campaigns/NewCampaignForm";
import { Plus, Calendar, List } from "lucide-react";
import { motion } from "framer-motion";

const CampaignsPage = () => {
  const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaign Planner</h1>
            <p className="text-adsilo-text-secondary mt-1">Plan, create, and manage your advertising campaigns</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowNewCampaignForm(true)}
              className="group"
            >
              <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
              New Campaign
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          <Card className="border-adsilo-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle>Total Budget</CardTitle>
              <CardDescription>Current month allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$28,500.00</div>
              <p className="text-sm text-adsilo-text-muted mt-1">$12,345.67 spent (43%)</p>
              <div className="w-full h-2 bg-adsilo-muted rounded-full mt-3">
                <div className="h-full bg-adsilo-primary rounded-full" style={{ width: "43%" }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-adsilo-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Currently running</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-adsilo-text-muted mt-1">+2 from last month</p>
            </CardContent>
          </Card>
          
          <Card className="border-adsilo-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Average across all campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.2x ROAS</div>
              <p className="text-sm text-green-600 mt-1">↑ 0.5x from last month</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-adsilo-border shadow-sm">
          <Tabs defaultValue="list">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Campaigns</CardTitle>
                <TabsList>
                  <TabsTrigger value="list">
                    <List className="h-4 w-4 mr-2" />
                    List View
                  </TabsTrigger>
                  <TabsTrigger value="calendar">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger value="budget">
                    Budget
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="list">
                <CampaignList />
              </TabsContent>
              <TabsContent value="calendar">
                <CampaignCalendar />
              </TabsContent>
              <TabsContent value="budget">
                <BudgetOverview />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>
      
      <NewCampaignForm 
        open={showNewCampaignForm} 
        onOpenChange={setShowNewCampaignForm} 
      />
    </AppLayout>
  );
};

export default CampaignsPage;