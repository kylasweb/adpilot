
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import ImageEditor from "@/components/creative/image-editor";

const ImageEditorPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Image Editor</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Design and edit marketing images for social media and ads
          </p>
        </div>
        <ImageEditor open={true} onOpenChange={() => {}} />
      </div>
    </AppLayout>
  );
};

export default ImageEditorPage;
