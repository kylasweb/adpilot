'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import CompetitorAnalysisTool from "@/components/tools/CompetitorAnalysisTool";
import { motion } from "framer-motion";

const CompetitorAnalysisPage = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CompetitorAnalysisTool />
      </motion.div>
    </AppLayout>
  );
};

export default CompetitorAnalysisPage;