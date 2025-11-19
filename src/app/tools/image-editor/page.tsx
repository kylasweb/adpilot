'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import ImageEditor from "@/components/creative/image-editor";
import { motion } from "framer-motion";

const ImageEditorPage = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Image Editor</h1>
            <p className="text-adsilo-text-secondary mt-1">
              Create and edit marketing visuals.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6"
      >
        <ImageEditor open={isEditorOpen} onOpenChange={setIsEditorOpen} />
      </motion.div>
    </AppLayout>
  );
};

export default ImageEditorPage;