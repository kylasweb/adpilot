'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

const MarketplaceConfiguratorsPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Product Configurators</h1>
        <p className="text-adsilo-text-secondary mt-1">Configure product options and variations</p>
      </motion.div>
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" />Configurator Tools</CardTitle></CardHeader>
        <CardContent>
          <div className="text-center py-12 text-adsilo-text-muted">
            <Settings className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Product configuration tools</p>
            <p className="text-sm">Create customizable product experiences</p>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default MarketplaceConfiguratorsPage;