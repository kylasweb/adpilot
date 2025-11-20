'use client'

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  Lightbulb, 
  Target, 
  Zap, 
  TrendingUp,
  Palette,
  PieChart,
  Settings
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import EnhancedLandingPage from "@/components/landing/EnhancedLandingPage";
import AppLayout from "@/components/layouts/AppLayout";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();

  // Features for authenticated users
  const appFeatures = [
    {
      title: "Campaign Management",
      description: "Create, track, and optimize your marketing campaigns across all channels.",
      icon: Target,
      href: "/campaigns",
      color: "bg-adsilo-primary text-adsilo-text-primary",
    },
    {
      title: "Audience Segmentation",
      description: "Build and manage audience cohorts for targeted marketing efforts.",
      icon: Users,
      href: "/cohorts",
      color: "bg-adsilo-secondary text-adsilo-text-primary",
    },
    {
      title: "Creative Studio",
      description: "Design, store, and manage all your marketing creative assets.",
      icon: Palette,
      href: "/creative",
      color: "bg-adsilo-accent text-adsilo-text-primary",
    },
    {
      title: "Analytics Dashboard",
      description: "Get detailed insights into campaign performance and audience behavior.",
      icon: BarChart3,
      href: "/analytics",
      color: "bg-adsilo-success text-adsilo-text-primary",
    },
    {
      title: "AI-Powered Insights",
      description: "Leverage AI to discover opportunities and optimize your marketing strategy.",
      icon: Lightbulb,
      href: "/tools/ai-insights",
      color: "bg-adsilo-warning text-adsilo-text-primary",
    },
    {
      title: "Performance Tracking",
      description: "Monitor ROI, conversion rates, and other key performance metrics.",
      icon: TrendingUp,
      href: "/analytics",
      color: "bg-adsilo-destructive text-adsilo-text-primary",
    },
  ];

  // If user is authenticated, show the app dashboard
  if (user) {
    return (
      <AppLayout>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <div>
              <h1 className="text-heading1 font-bold">Welcome back, {user.name}!</h1>
              <p className="text-body text-adsilo-text-secondary mt-1">
                Here's what's happening with your campaigns today.
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
            {appFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full border-adsilo-border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center mb-2`}>
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-heading2">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <Card className="border-adsilo-border shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with these common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/campaigns/new">Create Campaign</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/cohorts/new">Create Cohort</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/creative">View Creative Library</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/settings">Update Settings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AppLayout>
    );
  }

  // If user is not authenticated, show the landing page
  return <EnhancedLandingPage />;
}