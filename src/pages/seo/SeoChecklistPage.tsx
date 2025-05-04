
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import SeoChecklist from "@/components/seo/SeoChecklist";

const SeoChecklistPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">SEO & Web Design Checklist</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Comprehensive 500-point checklist for webmasters and digital marketers
          </p>
        </div>
        <SeoChecklist />
      </div>
    </AppLayout>
  );
};

export default SeoChecklistPage;
