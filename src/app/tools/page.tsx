'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Paintbrush, MessageSquare, Phone, Bot, Calendar, Mail, Search, BarChart2 } from "lucide-react";

const ToolsPage = () => {
  const features = [
    {
      title: "Content Creator",
      description: "AI-powered marketing content generator.",
      icon: FileText,
      href: "/tools/content-creator",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Image Editor",
      description: "Create and edit marketing visuals.",
      icon: Paintbrush,
      href: "/tools/image-editor",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Chatbot Builder",
      description: "Create AI chatbots for multiple platforms.",
      icon: MessageSquare,
      href: "/tools/chatbot-builder",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "WhatsApp Sender",
      description: "Send bulk WhatsApp messages to contacts.",
      icon: Phone,
      href: "/tools/whatsapp-sender",
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "AI Assistant",
      description: "AI-powered marketing assistant.",
      icon: Bot,
      href: "/tools/ai-assistant",
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Social Media Scheduler",
      description: "Schedule social media posts across multiple platforms.",
      icon: Calendar,
      href: "/tools/social-media-scheduler",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Email Marketing Automation",
      description: "Create and automate email marketing campaigns.",
      icon: Mail,
      href: "/tools/email-marketing-automation",
      color: "bg-red-100 text-red-600",
    },
    {
      title: "SEO Keyword Research",
      description: "Discover valuable keywords for your content and SEO strategy.",
      icon: Search,
      href: "/tools/seo-keyword-research",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Competitor Analysis",
      description: "Analyze competitor websites and marketing strategies.",
      icon: BarChart2,
      href: "/tools/competitor-analysis",
      color: "bg-cyan-100 text-cyan-600",
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
            <h1 className="text-3xl font-bold">Marketing Tools</h1>
            <p className="text-adsilo-text-secondary mt-1">
              AI-powered tools to enhance your marketing efforts.
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

export default ToolsPage;