import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, PieChart, Settings, DollarSign, FileText } from "lucide-react";
import { TimeEntryConfigurator } from "@/components/freelancer/configurators/timetracking/TimeEntryConfigurator";
import { ProjectRateConfigurator } from "@/components/freelancer/configurators/timetracking/ProjectRateConfigurator";
import { ReportingConfigurator } from "@/components/freelancer/configurators/timetracking/ReportingConfigurator";
import { toast } from "sonner";

const TimeTrackingPage = () => {
  const [timeEntryOpen, setTimeEntryOpen] = useState(false);
  const [projectRateOpen, setProjectRateOpen] = useState(false);
  const [reportingOpen, setReportingOpen] = useState(false);

  const handleConfigSubmit = (type: string, values: Record<string, any>) => {
    console.log(`${type} settings updated:`, values);
    toast.success(`${type} settings updated successfully`);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Time Tracking</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Track time spent on projects and tasks with detailed reporting
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTimeEntryOpen(true)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Time Entry Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setProjectRateOpen(true)}
              className="flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4" />
              Project Rates
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReportingOpen(true)}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Reporting
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Current Timer</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Project</label>
                <select className="w-full p-2 border rounded">
                  <option>Select a project</option>
                  <option>Website Redesign</option>
                  <option>Marketing Campaign</option>
                  <option>Logo Design</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Task Description</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="What are you working on?" />
              </div>
              
              <div className="text-center py-6">
                <div className="text-4xl font-bold mb-4">00:00:00</div>
                <div className="flex gap-2 justify-center">
                  <Button className="bg-green-500 hover:bg-green-600">Start Timer</Button>
                  <Button variant="outline">Stop</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500 text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Recent Time Entries</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-adpilot-text-muted text-center py-8">
                  No recent time entries. Start tracking time to see your entries here.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500 text-white">
                <PieChart className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Time Distribution</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-adpilot-text-muted">Time distribution chart will appear here once you track some time</p>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-adpilot-text-muted">Today</div>
                <div className="text-xl font-bold">0:00</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-adpilot-text-muted">This Week</div>
                <div className="text-xl font-bold">0:00</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-adpilot-text-muted">This Month</div>
                <div className="text-xl font-bold">0:00</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-adpilot-text-muted">Total</div>
                <div className="text-xl font-bold">0:00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <TimeEntryConfigurator
        open={timeEntryOpen}
        onOpenChange={setTimeEntryOpen}
        onSubmit={(values) => handleConfigSubmit('Time entry', values)}
        onCancel={() => setTimeEntryOpen(false)}
      />

      <ProjectRateConfigurator
        open={projectRateOpen}
        onOpenChange={setProjectRateOpen}
        onSubmit={(values) => handleConfigSubmit('Project rate', values)}
        onCancel={() => setProjectRateOpen(false)}
      />

      <ReportingConfigurator
        open={reportingOpen}
        onOpenChange={setReportingOpen}
        onSubmit={(values) => handleConfigSubmit('Reporting', values)}
        onCancel={() => setReportingOpen(false)}
      />
    </AppLayout>
  );
};

export default TimeTrackingPage;
