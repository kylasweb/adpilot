
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import KeywordResearch from "@/components/seo/KeywordResearch";

const SeoKeywordsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Keyword Research</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Find and analyze keywords to optimize your content
          </p>
        </div>
        <KeywordResearch />
      </div>
    </AppLayout>
  );
};

export default SeoKeywordsPage;
