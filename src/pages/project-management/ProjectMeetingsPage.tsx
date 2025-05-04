
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";

const ProjectMeetingsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Project Meetings</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Schedule and manage project-related meetings
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Meeting scheduling tools coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectMeetingsPage;
