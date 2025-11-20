'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Share2, Upload, File } from "lucide-react";

const ProjectSharingPage = () => {
  const files = [
    { name: 'project-brief.pdf', size: '2.4 MB', shared: '3 people', date: '2024-01-20' },
    { name: 'design-mockups.fig', size: '15.8  MB', shared: '5 people', date: '2024-01-19' },
    { name: 'requirements.docx', size: '523 KB', shared: '2 people', date: '2024-01-18' },
  ];

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">File Sharing</h1>
            <p className="text-adsilo-text-secondary mt-1">Share and manage project files</p>
          </div>
          <Button><Upload className="h-4 w-4 mr-2" />Upload File</Button>
        </div>
      </motion.div>
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2"><File className="h-5 w-5" />Shared Files</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-adsilo-border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                    <File className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-adsilo-text-muted">{file.size} • Shared with {file.shared}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" />Share</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default ProjectSharingPage;