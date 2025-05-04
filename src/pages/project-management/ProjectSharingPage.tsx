
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";

const ProjectSharingPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Project Sharing</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Share projects and manage access permissions
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Project sharing tools coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectSharingPage;
