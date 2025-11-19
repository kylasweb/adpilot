'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import SeoKeywordResearchTool from "@/components/tools/SeoKeywordResearchTool";
import { motion } from "framer-motion";

const SeoKeywordResearchPage = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SeoKeywordResearchTool />
      </motion.div>
    </AppLayout>
  );
};

export default SeoKeywordResearchPage;