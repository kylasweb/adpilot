
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";

const ProjectResourcesPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Project Resources</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Manage resources, budgets, and assets for your projects
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Resource management tools coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectResourcesPage;
