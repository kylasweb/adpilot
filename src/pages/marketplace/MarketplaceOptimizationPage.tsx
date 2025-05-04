
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckSquare, Settings, Search } from "lucide-react";

const MarketplaceOptimizationPage = () => {
  const marketplaceTools = [
    {
      title: "Optimization Checklist",
      description: "Comprehensive checklist for marketplace listings",
      href: "/marketplace/checklist",
      icon: CheckSquare,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Product Configurators",
      description: "Tools to configure and optimize product listings",
      href: "/marketplace/configurators",
      icon: Settings,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Product SEO",
      description: "SEO tools for marketplace product listings",
      href: "/marketplace/product-seo",
      icon: Search,
      color: "bg-purple-100 text-purple-600",
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Marketplace Optimization</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Tools to optimize your marketplace listings and products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceTools.map((tool) => (
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

export default MarketplaceOptimizationPage;
