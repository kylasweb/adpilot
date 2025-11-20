'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

const ProjectAIAssistantPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">AI Project Assistant</h1>
        <p className="text-adsilo-text-secondary mt-1">Get AI-powered project insights and suggestions</p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {[
          { label: 'Tasks Suggested', value: '24', icon: Sparkles },
          { label: 'Risks Identified', value: '3', icon: Sparkles },
          { label: 'Optimizations', value: '12', icon: Sparkles },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="h-5 w-5 text-adsilo-primary" />
                <span className="text-sm text-adsilo-text-muted">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5" />Ask AI Assistant</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea placeholder="Ask about your project..." rows={4} />
            <Button className="w-full"> <Sparkles className="h-4 w-4 mr-2" />Get AI Insights</Button>
          </div>
          <div className="mt-6 p-4 border border-adsilo-border rounded-lg bg-accent/50">
            <div className="text-sm text-adsilo-text-muted">
              <strong>AI Suggestion:</strong> Based on your project timeline, consider adding 2 more developers to the design phase to meet the deadline.
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default ProjectAIAssistantPage;