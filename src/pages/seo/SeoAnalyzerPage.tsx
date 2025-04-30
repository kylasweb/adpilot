
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import ContentAnalyzer from "@/components/seo/ContentAnalyzer";

const SeoAnalyzerPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Content Analyzer</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Analyze and optimize your content for SEO
          </p>
        </div>
        <ContentAnalyzer />
      </div>
    </AppLayout>
  );
};

export default SeoAnalyzerPage;
