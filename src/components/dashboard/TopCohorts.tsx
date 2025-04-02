
import React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";

const cohortData = [
  {
    id: 1,
    name: "High-Value Customers",
    performance: 94,
    audience: "135,244 users",
    roas: "4.2x",
  },
  {
    id: 2,
    name: "Tech Enthusiasts",
    performance: 85,
    audience: "243,876 users",
    roas: "3.7x",
  },
  {
    id: 3,
    name: "New Parents",
    performance: 78,
    audience: "87,643 users",
    roas: "3.1x",
  },
  {
    id: 4,
    name: "Frequent Shoppers",
    performance: 65,
    audience: "56,327 users",
    roas: "2.8x",
  }
];

const TopCohorts = () => {
  return (
    <div className="space-y-4">
      {cohortData.map((cohort) => (
        <div key={cohort.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-adpilot-muted h-8 w-8 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-adpilot-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">{cohort.name}</h4>
                <p className="text-xs text-adpilot-text-muted">{cohort.audience}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">ROAS: {cohort.roas}</p>
              <p 
                className={cn("text-xs", {
                  "text-green-600": cohort.performance >= 80,
                  "text-amber-600": cohort.performance >= 60 && cohort.performance < 80,
                  "text-red-600": cohort.performance < 60
                })}
              >
                {cohort.performance}% performance
              </p>
            </div>
          </div>
          <Progress 
            value={cohort.performance} 
            className={cn({
              "bg-green-100": cohort.performance >= 80,
              "bg-amber-100": cohort.performance >= 60 && cohort.performance < 80,
              "bg-red-100": cohort.performance < 60
            })}
          />
        </div>
      ))}
    </div>
  );
};

export default TopCohorts;
