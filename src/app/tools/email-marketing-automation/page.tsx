'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import EmailMarketingAutomation from "@/components/tools/EmailMarketingAutomation";
import { motion } from "framer-motion";

const EmailMarketingAutomationPage = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <EmailMarketingAutomation />
      </motion.div>
    </AppLayout>
  );
};

export default EmailMarketingAutomationPage;