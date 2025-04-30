
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import ContentCreator from "@/components/creative/ai-content-creator";

const ContentCreatorPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">AI Content Creator</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Generate professional marketing content with AI assistance
          </p>
        </div>
        <ContentCreator />
      </div>
    </AppLayout>
  );
};

export default ContentCreatorPage;
