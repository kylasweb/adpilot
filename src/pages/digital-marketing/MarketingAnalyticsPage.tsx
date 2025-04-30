
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";

const MarketingAnalyticsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Marketing Analytics</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Comprehensive analytics and insights for your marketing campaigns
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="h-full hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <BarChart className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Campaign Performance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-adpilot-text-secondary">
                Track and analyze the performance of your marketing campaigns across all channels.
              </p>
              <div className="mt-4 h-48 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-adpilot-text-muted">Campaign performance chart goes here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <LineChart className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Conversion Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-adpilot-text-secondary">
                Monitor conversion rates and ROI for your marketing initiatives.
              </p>
              <div className="mt-4 h-48 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-adpilot-text-muted">Conversion tracking chart goes here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500 text-white">
                  <PieChart className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Channel Distribution</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-adpilot-text-secondary">
                See how your marketing efforts are distributed across different channels.
              </p>
              <div className="mt-4 h-48 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-adpilot-text-muted">Channel distribution chart goes here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default MarketingAnalyticsPage;
