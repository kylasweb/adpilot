
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import ImageEditor from "@/components/creative/image-editor";

const ImageEditorPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <ImageEditor open={true} onOpenChange={() => {}} />
      </div>
    </AppLayout>
  );
};

export default ImageEditorPage;
