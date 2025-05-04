
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";

const CrmDashboardPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">CRM Dashboard</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Overview of your customer relationship management data
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">CRM dashboard features coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default CrmDashboardPage;
