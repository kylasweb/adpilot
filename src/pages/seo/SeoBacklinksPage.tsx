
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import BacklinkManager from "@/components/seo/BacklinkManager";

const SeoBacklinksPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Backlink Manager</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Monitor and manage your website's backlinks
          </p>
        </div>
        <BacklinkManager />
      </div>
    </AppLayout>
  );
};

export default SeoBacklinksPage;
