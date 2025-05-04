
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";

const HrmPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Human Resource Management</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Tools for managing personnel and human resources
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">HRM features coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default HrmPage;
