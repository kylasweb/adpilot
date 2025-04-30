
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";

const EmailAnalyticsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Email Analytics</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Track and analyze email performance with detailed metrics
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-adpilot-text-muted text-sm">Open Rate</div>
              <div className="text-3xl font-bold">0%</div>
              <div className="text-xs text-adpilot-text-muted mt-1">vs. industry avg: 15-25%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-adpilot-text-muted text-sm">Click Rate</div>
              <div className="text-3xl font-bold">0%</div>
              <div className="text-xs text-adpilot-text-muted mt-1">vs. industry avg: 2.5%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-adpilot-text-muted text-sm">Bounce Rate</div>
              <div className="text-3xl font-bold">0%</div>
              <div className="text-xs text-adpilot-text-muted mt-1">vs. industry avg: &lt;2%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-adpilot-text-muted text-sm">Unsubscribe Rate</div>
              <div className="text-3xl font-bold">0%</div>
              <div className="text-xs text-adpilot-text-muted mt-1">vs. industry avg: &lt;0.5%</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
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
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-adpilot-text-muted">Performance chart will appear once you have campaign data</p>
              </div>
            </CardContent>
          </Card>
          
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
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-adpilot-text-muted">Engagement chart will appear once you have campaign data</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
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
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-adpilot-text-muted">Campaign comparison chart will appear once you have multiple campaigns</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EmailAnalyticsPage;
