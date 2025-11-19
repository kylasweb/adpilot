'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerformanceOverview from "@/components/analytics/PerformanceOverview";
import CampaignMetrics from "@/components/analytics/CampaignMetrics";
import AudienceInsights from "@/components/analytics/AudienceInsights";
import { motion } from "framer-motion";

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState("last_30_days");

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-adsilo-text-secondary mt-1">
              Track your campaign performance and audience insights
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="performance" className="mt-6">
          <TabsList>
            <TabsTrigger value="performance">Performance Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaign Metrics</TabsTrigger>
            <TabsTrigger value="audience">Audience Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="mt-6">
            <PerformanceOverview dateRange={dateRange} />
          </TabsContent>
          <TabsContent value="campaigns" className="mt-6">
            <CampaignMetrics dateRange={dateRange} />
          </TabsContent>
          <TabsContent value="audience" className="mt-6">
            <AudienceInsights dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default AnalyticsDashboard;