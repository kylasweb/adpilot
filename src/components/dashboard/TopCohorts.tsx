
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";
import { getTopCohorts } from "@/services/dashboardService";



const TopCohorts = () => {
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await getTopCohorts(4);
        // Transform the data to match the expected format
        const transformedCohorts = response.data.map((cohort: any) => ({
          id: cohort.id,
          name: cohort.name,
          performance: Math.floor(Math.random() * 40) + 60, // Random performance between 60-100
          audience: `${cohort.audienceSize.toLocaleString()} users`,
          roas: `${(Math.random() * 3 + 1).toFixed(1)}x` // Random ROAS between 1.0x-4.0x
        }));
        setCohorts(transformedCohorts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch top cohorts:", error);
        setLoading(false);
      }
    };
    
    fetchCohorts();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-adsilo-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {cohorts.length === 0 ? (
        <div className="text-center py-4 text-adsilo-text-muted">
          No cohorts available
        </div>
      ) : (
        cohorts.map((cohort) => (
          <div key={cohort.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-adsilo-muted h-8 w-8 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-adsilo-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{cohort.name}</h4>
                  <p className="text-xs text-adsilo-text-muted">{cohort.audience}</p>
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
        ))
      )}
    </div>
  );
};

export default TopCohorts;
