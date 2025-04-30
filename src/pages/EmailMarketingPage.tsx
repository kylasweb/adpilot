
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, Filter, Globe, BarChart, Inbox } from "lucide-react";
import { Link } from "react-router-dom";

const EmailMarketingPage = () => {
  const emailMarketingTools = [
    {
      title: "Email Campaign Builder",
      description: "Create and manage email campaigns with AI-powered content suggestions",
      icon: Mail,
      href: "/email-marketing/campaigns",
      color: "bg-blue-500",
    },
    {
      title: "Email Templates",
      description: "Browse and customize AI-generated email templates for various purposes",
      icon: FileText,
      href: "/email-marketing/templates",
      color: "bg-purple-500",
    },
    {
      title: "Email List Manager",
      description: "Manage your email lists, segments, and subscriber data",
      icon: Filter,
      href: "/email-marketing/lists",
      color: "bg-green-500",
    },
    {
      title: "Web Scraping Tool",
      description: "Find and extract email addresses and contacts from websites",
      icon: Globe,
      href: "/email-marketing/scraping",
      color: "bg-orange-500",
    },
    {
      title: "Email Analytics",
      description: "Track and analyze email performance with detailed metrics",
      icon: BarChart,
      href: "/email-marketing/analytics",
      color: "bg-pink-500",
    },
    {
      title: "Email Sync",
      description: "Sync your emails from Gmail, Outlook, and other providers",
      icon: Inbox,
      href: "/email-marketing/sync",
      color: "bg-teal-500",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Email Marketing Suite</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Comprehensive email marketing tools with AI templates, list management, and analytics
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {emailMarketingTools.map((tool) => (
            <Link key={tool.href} to={tool.href} className="group">
              <Card className="h-full hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default EmailMarketingPage;
