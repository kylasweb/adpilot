
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, MessageSquare, PieChart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const DigitalMarketingPage = () => {
  const digitalMarketingTools = [
    {
      title: "Ad Campaign Manager",
      description: "Create, manage, and optimize your advertising campaigns across multiple platforms",
      icon: Target,
      href: "/digital-marketing/ad-manager",
      color: "bg-blue-500",
    },
    {
      title: "Social Media Planner",
      description: "Plan, schedule, and analyze your social media content with AI assistance",
      icon: MessageSquare,
      href: "/digital-marketing/social-planner",
      color: "bg-purple-500",
    },
    {
      title: "Marketing Analytics",
      description: "Comprehensive analytics and insights for all your marketing channels",
      icon: PieChart,
      href: "/digital-marketing/analytics",
      color: "bg-green-500",
    },
    {
      title: "Marketing Automation",
      description: "Automate your marketing workflows and campaigns for better efficiency",
      icon: TrendingUp,
      href: "/digital-marketing/automation",
      color: "bg-orange-500",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Digital Marketing Suite</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Advanced tools for managing and optimizing your digital marketing efforts
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {digitalMarketingTools.map((tool) => (
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

export default DigitalMarketingPage;
