'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import DocumentCreator from "@/components/creative/document-creator";
import { motion } from "framer-motion";

const ToolsAIAssistantPage = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">AI Marketing Assistant</h1>
            <p className="text-adsilo-text-secondary mt-1">
              AI-powered marketing assistant.
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
        <DocumentCreator />
      </motion.div>
    </AppLayout>
  );
};

export default ToolsAIAssistantPage;