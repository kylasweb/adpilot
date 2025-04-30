
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import DocumentCreator from "@/components/creative/document-creator";

const DocumentCreatorPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <DocumentCreator />
      </div>
    </AppLayout>
  );
};

export default DocumentCreatorPage;
