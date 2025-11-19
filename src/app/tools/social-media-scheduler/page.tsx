'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import SocialMediaScheduler from "@/components/tools/SocialMediaScheduler";
import { motion } from "framer-motion";

const SocialMediaSchedulerPage = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SocialMediaScheduler />
      </motion.div>
    </AppLayout>
  );
};

export default SocialMediaSchedulerPage;