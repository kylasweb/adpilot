
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";

const ProjectDevelopmentPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Project Development</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Manage your project tasks, milestones, and development process
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Project development tools coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDevelopmentPage;
