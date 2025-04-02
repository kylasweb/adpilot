
import React from "react";
import { 
  BarChart,
  ArrowUp, 
  ArrowDown,
  TrendingUp,
  Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ElementType;
  trend: "up" | "down" | "neutral";
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-adpilot-text-secondary">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-adpilot-muted flex items-center justify-center">
            <Icon className="h-6 w-6 text-adpilot-primary" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {trend === "up" && (
            <ArrowUp className="h-4 w-4 text-adpilot-success mr-1" />
          )}
          {trend === "down" && (
            <ArrowDown className="h-4 w-4 text-adpilot-danger mr-1" />
          )}
          <span 
            className={cn("text-sm font-medium", {
              "text-adpilot-success": trend === "up",
              "text-adpilot-danger": trend === "down",
              "text-adpilot-text-secondary": trend === "neutral"
            })}
          >
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats = () => {
  const stats = [
    {
      title: "Active Campaigns",
      value: "12",
      change: "+2.5% from last month",
      icon: BarChart,
      trend: "up" as const,
    },
    {
      title: "Total Audience",
      value: "1,234,567",
      change: "+12.3% from last month",
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Avg. ROAS",
      value: "3.2x",
      change: "+0.5x from last month",
      icon: TrendingUp,
      trend: "up" as const,
    },
    {
      title: "Avg. CTR",
      value: "2.8%",
      change: "-0.3% from last month",
      icon: TrendingUp,
      trend: "down" as const,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
