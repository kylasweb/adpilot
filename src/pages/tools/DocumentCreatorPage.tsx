
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import DocumentCreator from "@/components/creative/document-creator";

const DocumentCreatorPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Document Creator</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Create professional quotes, proposals, and invoices for your business
          </p>
        </div>
        <DocumentCreator />
      </div>
    </AppLayout>
  );
};

export default DocumentCreatorPage;
