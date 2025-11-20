'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Video, FileText, Users } from "lucide-react";

const ProjectCollaborationPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Collaboration</h1>
        <p className="text-adsilo-text-secondary mt-1">Team communication and collaboration tools</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[
          { label: 'Messages', count: 247, icon: MessageSquare, color: 'bg-blue-500' },
          { label: 'Video Calls', count: 12, icon: Video, color: 'bg-green-500' },
          { label: 'Shared Docs', count: 43, icon: FileText, color: 'bg-purple-500' },
          { label: 'Team Members', count: 18, icon: Users, color: 'bg-orange-500' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <p className="text-sm text-adsilo-text-muted">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>Team Chat</CardTitle></CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center border border-dashed border-adsilo-border rounded-lg">
            <div className="text-center text-adsilo-text-muted">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Team chat interface</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default ProjectCollaborationPage;