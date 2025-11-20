'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, Square } from "lucide-react";

const MarketplaceChecklistPage = () => {
  const items = [
    { task: 'Set up payment gateway', completed: true },
    { task: 'Configure shipping options', completed: true },
    { task: 'Add product categories', completed: true },
    { task: 'Set up tax calculation', completed: false },
    { task: 'Enable customer reviews', completed: false },
    { task: 'Configure email notifications', completed: true },
  ];

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Marketplace Setup Checklist</h1>
        <p className="text-adsilo-text-secondary mt-1">Track marketplace configuration progress</p>
      </motion.div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Setup Tasks</CardTitle>
          <div className="text-sm text-adsilo-text-muted">
            {items.filter(i => i.completed).length} of {items.length} completed
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-adsilo-border rounded-lg">
                <div className="flex items-center gap-3">
                  {item.completed ?
                    <CheckCircle className="h-5 w-5 text-green-500" /> :
                    <Square className="h-5 w-5 text-gray-400" />
                  }
                  <span className={item.completed ? 'line-through text-adsilo-text-muted' : 'font-medium'}>
                    {item.task}
                  </span>
                </div>
                <Badge variant={item.completed ? 'default' : 'outline'}>
                  {item.completed ? 'Done' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default MarketplaceChecklistPage;