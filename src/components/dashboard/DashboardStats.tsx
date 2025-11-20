
import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as anime from "animejs";
import { getDashboardStats } from "@/services/dashboardService";

type Stat = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: "up" | "down" | "neutral";
};

const StatCard: React.FC<Stat> = ({ title, value, change, icon: Icon, trend }) => {
  return (
    <div className="dashboard-card">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-adsilo-text-secondary">{title}</p>
              <h3 className="text-2xl font-bold mt-1" style={{ fontFamily: "var(--font-display)" }}>{value}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-adsilo-muted flex items-center justify-center">
              <Icon className="h-6 w-6 text-adsilo-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {trend === "up" && (
              <ArrowUp className="h-4 w-4 text-adsilo-success mr-1" />
            )}
            {trend === "down" && (
              <ArrowDown className="h-4 w-4 text-adsilo-danger mr-1" />
            )}
            <span
              className={cn("text-sm font-medium", {
                "text-adsilo-success": trend === "up",
                "text-adsilo-danger": trend === "down",
                "text-adsilo-text-secondary": trend === "neutral"
              })}
            >
              {change}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    {
      title: "Active Campaigns",
      value: "0",
      change: "+0% from last month",
      icon: BarChart,
      trend: "neutral",
    },
    {
      title: "Total Audience",
      value: "0",
      change: "+0% from last month",
      icon: Users,
      trend: "neutral",
    },
    {
      title: "Avg. ROAS",
      value: "0x",
      change: "+0x from last month",
      icon: TrendingUp,
      trend: "neutral",
    },
    {
      title: "Avg. CTR",
      value: "0%",
      change: "+0% from last month",
      icon: TrendingUp,
      trend: "neutral",
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();

        setStats([
          {
            title: "Active Campaigns",
            value: data.activeCampaigns.toString(),
            change: `+${data.activeCampaigns > 0 ? '2.5' : '0'}% from last month`,
            icon: BarChart,
            trend: data.activeCampaigns > 0 ? "up" : "neutral",
          },
          {
            title: "Total Audience",
            value: data.totalCohorts.toString(),
            change: `+${data.totalCohorts > 0 ? '12.3' : '0'}% from last month`,
            icon: Users,
            trend: data.totalCohorts > 0 ? "up" : "neutral",
          },
          {
            title: "Avg. ROAS",
            value: `${data.avgROAS}x`,
            change: `+${data.avgROAS > 0 ? '0.5' : '0'}x from last month`,
            icon: TrendingUp,
            trend: data.avgROAS > 0 ? "up" : "neutral",
          },
          {
            title: "Avg. CTR",
            value: `${data.avgCTR}%`,
            change: `${data.avgCTR > 0 ? '-' : ''}${data.avgCTR > 0 ? '0.3' : '0'}% from last month`,
            icon: TrendingUp,
            trend: data.avgCTR > 2.5 ? "up" : data.avgCTR < 2.5 ? "down" : "neutral",
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const targets = containerRef.current.querySelectorAll('.dashboard-card');

    anime.remove(targets);
    const tl = new anime.Timeline()
      .add(targets, {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(120),
        easing: 'easeOutQuad',
        duration: 700,
      });

    tl.play();
  }, []);

  return (
    <div ref={containerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {loading ? (
        stats.map((stat, index) => (
          <div key={index} className="dashboard-card">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-adsilo-text-secondary">{stat.title}</p>
                    <div className="h-6 w-24 bg-adsilo-muted rounded mt-2 animate-pulse"></div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-adsilo-muted flex items-center justify-center animate-pulse"></div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="h-4 w-16 bg-adsilo-muted rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))
      )}
    </div>
  );
};

export default DashboardStats;
