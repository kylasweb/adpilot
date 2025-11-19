'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Layers, Users, Building, Plug, Database, Key, Activity, Settings, BookOpen, Lock, CreditCard, ClipboardCheck, LineChart, File, Gauge } from "lucide-react";

const AdminDashboardPage = () => {
  const features = [
    {
      title: "User Management",
      description: "Manage system users and permissions.",
      icon: Users,
      href: "/admin/users",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Organizations",
      description: "Manage organizations and their settings.",
      icon: Building,
      href: "/admin/organizations",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Integrations",
      description: "Manage third-party integrations.",
      icon: Plug,
      href: "/admin/integrations",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "API Management",
      description: "Manage API keys and connections.",
      icon: Database,
      href: "/admin/api-management",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Activity Log",
      description: "View system activity logs.",
      icon: Activity,
      href: "/admin/activity",
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "System Settings",
      description: "Configure system settings.",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "AI Storyteller",
      description: "Create engaging marketing narratives with AI.",
      icon: BookOpen,
      href: "/admin/storytelling",
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Security",
      description: "Manage security configurations.",
      icon: Lock,
      href: "/admin/security",
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Billing",
      description: "Manage billing and subscriptions.",
      icon: CreditCard,
      href: "/admin/billing",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Compliance",
      description: "Manage compliance and reporting.",
      icon: ClipboardCheck,
      href: "/admin/compliance",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "System Analytics",
      description: "View advanced analytics.",
      icon: LineChart,
      href: "/admin/analytics",
      color: "bg-lime-100 text-lime-600",
    },
    {
      title: "Content",
      description: "Manage system content.",
      icon: File,
      href: "/admin/content",
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "System Health",
      description: "Monitor system health.",
      icon: Gauge,
      href: "/admin/health",
      color: "bg-emerald-100 text-emerald-600",
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
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-adsilo-text-secondary mt-1">
              Administrative dashboard for system management.
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

export default AdminDashboardPage;