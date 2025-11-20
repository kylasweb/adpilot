'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const ProjectTimelinesPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Project Timelines</h1>
        <p className="text-adsilo-text-secondary mt-1">Gantt charts and project scheduling</p>
      </motion.div>
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Timeline View</CardTitle></CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center border border-dashed border-adsilo-border rounded-lg">
            <div className="text-center text-adsilo-text-muted">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Gantt chart visualization</p>
              <p className="text-sm">Interactive timeline view coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default ProjectTimelinesPage;