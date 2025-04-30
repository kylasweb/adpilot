
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import SeoAudit from "@/components/seo/SeoAudit";

const SeoAuditPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">SEO Audit</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Comprehensive analysis of your website's SEO health
          </p>
        </div>
        <SeoAudit />
      </div>
    </AppLayout>
  );
};

export default SeoAuditPage;
