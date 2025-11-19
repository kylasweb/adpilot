'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Layers, Activity, Calendar, Database, Clock, Users, Share, Bot } from "lucide-react";

const ProjectManagementDashboard = () => {
  const features = [
    {
      title: "Project Development",
      description: "Manage your project development lifecycle from conception to completion.",
      icon: Activity,
      href: "/project-management/development",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Meetings",
      description: "Schedule and manage project meetings with your team.",
      icon: Calendar,
      href: "/project-management/meetings",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Resources",
      description: "Manage project resources and assets efficiently.",
      icon: Database,
      href: "/project-management/resources",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Timelines",
      description: "Track project timelines and schedules.",
      icon: Clock,
      href: "/project-management/timelines",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Team Management",
      description: "Manage your project teams and collaboration.",
      icon: Users,
      href: "/project-management/team",
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "Sharing",
      description: "Share projects with stakeholders and clients.",
      icon: Share,
      href: "/project-management/sharing",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Collaboration",
      description: "Real-time collaboration tools for your projects.",
      icon: Users,
      href: "/project-management/collaboration",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "AI Assistant",
      description: "AI-powered project management assistance.",
      icon: Bot,
      href: "/project-management/ai-assistant",
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Project Management</h1>
            <p className="text-adsilo-text-secondary mt-1">
              Comprehensive project management tools to help you plan, execute, and track your projects.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-adsilo-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center mb-2`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default ProjectManagementDashboard;