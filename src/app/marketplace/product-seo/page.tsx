'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Plus } from "lucide-react";

const MarketplaceProductSEOPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Product SEO Optimizer</h1>
            <p className="text-adsilo-text-secondary mt-1">Optimize product listings for search</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />Optimize Product</Button>
        </div>
      </motion.div>
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2"><ShoppingCart className="h-5 w-5" />Product Listings</CardTitle></CardHeader>
        <CardContent>
          <div className="text-center py-12 text-adsilo-text-muted">
            <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No products to optimize</p>
            <p className="text-sm">Add products to start optimizing for search engines</p>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default MarketplaceProductSEOPage;