
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";

const ProjectTimelinesPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Project Timelines</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Visualize and manage project timelines and deadlines
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Timeline visualization tools coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectTimelinesPage;
