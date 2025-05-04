
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";

const ProjectTeamPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Project Team</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Manage team members and their roles within projects
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Team management tools coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectTeamPage;
