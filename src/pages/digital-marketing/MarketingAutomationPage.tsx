
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, MessageSquare } from "lucide-react";

const MarketingAutomationPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Marketing Automation</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Automate your marketing workflows and campaigns for better efficiency
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="h-full hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Scheduled Campaigns</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-adpilot-text-secondary">
                Schedule and automate your marketing campaigns across multiple channels.
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="font-medium">Next scheduled campaigns:</p>
                <p className="text-sm text-adpilot-text-muted mt-2">No campaigns scheduled</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Workflow Automations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-adpilot-text-secondary">
                Create automated workflows triggered by user behavior and actions.
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="font-medium">Active workflows:</p>
                <p className="text-sm text-adpilot-text-muted mt-2">No active workflows</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500 text-white">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Automated Messaging</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-adpilot-text-secondary">
                Set up automated email and social media messages based on triggers.
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="font-medium">Message templates:</p>
                <p className="text-sm text-adpilot-text-muted mt-2">No templates created</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default MarketingAutomationPage;
