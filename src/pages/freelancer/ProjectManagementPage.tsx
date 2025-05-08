import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, CheckCircle, Clock, Calendar, Settings, FileText, ListTodo, Flag } from "lucide-react";

import { ProjectTemplateConfigurator } from "@/components/freelancer/configurators/project/ProjectTemplateConfigurator";
import { TaskCategoriesConfigurator } from "@/components/freelancer/configurators/project/TaskCategoriesConfigurator";
import { MilestoneConfigurator } from "@/components/freelancer/configurators/project/MilestoneConfigurator";
import { ProjectSettingsConfigurator } from "@/components/freelancer/configurators/project/ProjectSettingsConfigurator";

const ProjectManagementPage = () => {
  const [templateConfigOpen, setTemplateConfigOpen] = useState(false);
  const [categoriesConfigOpen, setCategoriesConfigOpen] = useState(false);
  const [milestoneConfigOpen, setMilestoneConfigOpen] = useState(false);
  const [settingsConfigOpen, setSettingsConfigOpen] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Project Management</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Manage your projects with tasks, milestones, and deadlines
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setTemplateConfigOpen(true)} title="Project Templates">
              <FileText className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setCategoriesConfigOpen(true)} title="Task Categories">
              <ListTodo className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setMilestoneConfigOpen(true)} title="Milestones">
              <Flag className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setSettingsConfigOpen(true)} title="Project Settings">
              <Settings className="h-5 w-5" />
            </Button>
            <Button>
              <span className="mr-2">+</span> New Project
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <Clipboard className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Active Projects</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {/* Project list would go here */}
            <div className="space-y-4">
              <div className="text-center py-8 text-adpilot-text-muted">
                No active projects. Click "New Project" to create your first project.
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Recent Tasks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-adpilot-text-muted">
                  No recent tasks. Tasks from your projects will appear here.
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500 text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Upcoming Deadlines</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-adpilot-text-muted">
                  No upcoming deadlines. Deadlines from your projects will appear here.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500 text-white">
                <Clock className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Project Statistics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-adpilot-text-muted">Active Projects</div>
              </div>
              <div className="p-4 bg-gray-50 rounded text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-adpilot-text-muted">Completed Projects</div>
              </div>
              <div className="p-4 bg-gray-50 rounded text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-adpilot-text-muted">Open Tasks</div>
              </div>
              <div className="p-4 bg-gray-50 rounded text-center">
                <div className="text-2xl font-bold">0%</div>
                <div className="text-sm text-adpilot-text-muted">On-Time Completion</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurator Dialogs */}
        <ProjectTemplateConfigurator
          open={templateConfigOpen}
          onOpenChange={setTemplateConfigOpen}
        />
        <TaskCategoriesConfigurator
          open={categoriesConfigOpen}
          onOpenChange={setCategoriesConfigOpen}
        />
        <MilestoneConfigurator
          open={milestoneConfigOpen}
          onOpenChange={setMilestoneConfigOpen}
        />
        <ProjectSettingsConfigurator
          open={settingsConfigOpen}
          onOpenChange={setSettingsConfigOpen}
        />
      </div>
    </AppLayout>
  );
};

export default ProjectManagementPage;
