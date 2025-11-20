'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Package, User, Clock } from "lucide-react";

const ProjectResourcesPage = () => {
  const resources = [
    { name: 'Developers', allocated: 8, available: 12, utilization: 67 },
    { name: 'Designers', allocated: 4, available: 6, utilization: 67 },
    { name: 'Budget', allocated: 45000, available: 60000, utilization: 75 },
  ];

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Resource Allocation</h1>
        <p className="text-adsilo-text-secondary mt-1">Manage project resources and capacity</p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {resources.map((resource, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {i === 2 ? <Package className="h-5 w-5" /> : <User className="h-5 w-5" />}
                {resource.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Allocated</span>
                  <span className="font-medium">{resource.allocated}{i === 2 ? '' : ' people'}</span>
                </div>
                <Progress value={resource.utilization} className="h-2" />
              </div>
              <div className="text-sm text-adsilo-text-muted">
                {resource.available - resource.allocated} {i === 2 ? 'remaining' : 'available'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default ProjectResourcesPage;