
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, LineChart, Globe, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SeoPage = () => {
  const seoTools = [
    {
      title: "Keyword Research",
      description: "Find and analyze keywords to optimize your content",
      href: "/seo/keywords",
      icon: Search,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Content Analyzer",
      description: "Analyze and optimize your content for SEO",
      href: "/seo/analyzer",
      icon: LineChart,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "SEO Audit",
      description: "Comprehensive analysis of your website's SEO health",
      href: "/seo/audit",
      icon: Globe,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Backlink Manager",
      description: "Monitor and manage your website's backlinks",
      href: "/seo/backlinks",
      icon: LinkIcon,
      color: "bg-amber-100 text-amber-600",
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">SEO Tools</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Optimize your website's visibility and ranking with our powerful SEO tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seoTools.map((tool) => (
            <Link key={tool.title} to={tool.href}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className={`w-10 h-10 rounded-full ${tool.color} flex items-center justify-center mb-2`}>
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SeoPage;
