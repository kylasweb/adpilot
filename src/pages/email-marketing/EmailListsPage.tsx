
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Users, Upload } from "lucide-react";

const EmailListsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Email List Manager</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Manage your email lists, segments, and subscriber data
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" /> Import List
            </Button>
            <Button>
              <span className="mr-2">+</span> New List
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <Filter className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">My Email Lists</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-adpilot-text-muted">
                No email lists created yet. Click "New List" to create your first email list.
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Subscribers Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-adpilot-text-muted">Total Subscribers</div>
                </div>
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-adpilot-text-muted">Active Subscribers</div>
                </div>
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-sm text-adpilot-text-muted">New This Month</div>
                </div>
                <div className="p-3 bg-gray-50 rounded text-center">
                  <div className="text-2xl font-bold">0%</div>
                  <div className="text-sm text-adpilot-text-muted">Avg. Open Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500 text-white">
                    <Filter className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Segmentation</CardTitle>
                </div>
                <Button size="sm" variant="outline">Create Segment</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-adpilot-text-muted">
                  No segments created yet. Create segments to target specific subscriber groups.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmailListsPage;
