'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { motion } from "framer-motion";
import DatabaseTest from "@/components/test/DatabaseTest";

const DatabaseTestPage = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Database Security Test</h1>
          <p className="text-adsilo-text-secondary mt-1">
            Test the secure connection to your Neon PostgreSQL database
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mt-6">
          <DatabaseTest />
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default DatabaseTestPage;