'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { motion } from "framer-motion";
import CreativeLibrary from "@/components/creative/CreativeLibrary";

const CreativeLibraryPage = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Creative Library</h1>
          <p className="text-adsilo-text-secondary mt-1">
            Manage and organize your creative assets
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mt-6">
          <CreativeLibrary />
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default CreativeLibraryPage;