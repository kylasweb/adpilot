'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Activity, Globe, ListChecks } from "lucide-react";

const SEOPage = () => {
  const features = [
    {
      title: "Technical SEO",
      description: "Advanced technical SEO analysis tools.",
      icon: Activity,
      href: "/seo/technical-analyzer",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Local SEO Manager",
      description: "Manage local SEO and business listings.",
      icon: Globe,
      href: "/seo/local-manager",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "SEO Checklist",
      description: "500-point SEO & web design checklist.",
      icon: ListChecks,
      href: "/seo/checklist",
      color: "bg-purple-100 text-purple-600",
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
            <h1 className="text-3xl font-bold">SEO Tools</h1>
            <p className="text-adsilo-text-secondary mt-1">
              Optimize your website for search engines.
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

export default SEOPage;