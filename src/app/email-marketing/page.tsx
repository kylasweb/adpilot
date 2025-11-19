'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const EmailMarketingPage = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Email Marketing</h1>
            <p className="text-adsilo-text-secondary mt-1">
              Create and manage email campaigns.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-adsilo-border shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Email Campaigns
            </CardTitle>
            <CardDescription>
              Design and send email campaigns to your audience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Mail className="mx-auto h-12 w-12 text-adsilo-text-muted" />
                <h3 className="mt-4 text-lg font-medium">Email Marketing Dashboard</h3>
                <p className="mt-2 text-adsilo-text-secondary">
                  This feature is currently under development. Please check back later.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
};

export default EmailMarketingPage;