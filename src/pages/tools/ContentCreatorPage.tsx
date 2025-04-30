
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import ContentCreator from "@/components/creative/ai-content-creator";

const ContentCreatorPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <ContentCreator />
      </div>
    </AppLayout>
  );
};

export default ContentCreatorPage;
