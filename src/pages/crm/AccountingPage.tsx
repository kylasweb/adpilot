
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";

const AccountingPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Accounting</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Financial management and accounting tools
          </p>
        </div>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Accounting features coming soon</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default AccountingPage;
