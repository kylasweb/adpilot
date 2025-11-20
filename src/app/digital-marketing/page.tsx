'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, Target, BarChart3, Megaphone, Sparkles, Brain } from "lucide-react";
import { toast } from "sonner";

const DigitalMarketingPage = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const handleAIAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      toast.success('AI analysis complete! Check recommendations below.');
    }, 2000);
  };

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Digital Marketing</h1>
            <p className="text-adsilo-text-secondary mt-1">AI-powered digital marketing dashboard</p>
          </div>
          <Button onClick={handleAIAnalysis} disabled={analyzing}>
            {analyzing ? 'Analyzing...' : <><Brain className="h-4 w-4 mr-2" />AI Analysis</>}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {[
          { label: 'Website Traffic', value: '124K', icon: TrendingUp, color: 'bg-blue-500' },
          { label: 'Conversions', value: '3.2K', icon: Target, color: 'bg-green-500' },
          { label: 'ROI', value: '285%', icon: BarChart3, color: 'bg-purple-500' },
          { label: 'Active Campaigns', value: '12', icon: Megaphone, color: 'bg-orange-500' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <p className="text-sm text-adsilo-text-muted">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-2 border-adsilo-primary/20 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-adsilo-primary" />
            AI Marketing Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-blue-900">Traffic Opportunity</div>
                <div className="text-sm text-blue-800 mt-1">
                  Your blog posts are underperforming. AI suggests increasing content freshness and adding video content to boost engagement by an estimated 35%.
                </div>
                <Button size="sm" variant="outline" className="mt-3">
                  Generate Content Ideas
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-green-900">Conversion Optimization</div>
                <div className="text-sm text-green-800 mt-1">
                  AI detected that users from mobile devices have a 45% lower conversion rate. Recommended: Simplify mobile checkout flow and add one-click purchase option.
                </div>
                <Button size="sm" variant="outline" className="mt-3">
                  View A/B Test Suggestions
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Megaphone className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-purple-900">Budget Reallocation</div>
                <div className="text-sm text-purple-800 mt-1">
                  Social media ads are outperforming PPC by 2.3x ROI. AI recommends shifting 30% of PPC budget to social for an estimated $12K additional revenue this quarter.
                </div>
                <Button size="sm" variant="outline" className="mt-3">
                  Optimize Budget
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader><CardTitle>Channel Performance</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { channel: 'Social Media', performance: 'High', value: '45%', trend: '+12%', color: 'text-green-600' },
                { channel: 'Email', performance: 'Medium', value: '28%', trend: '+5%', color: 'text-blue-600' },
                { channel: 'SEO', performance: 'High', value: '32%', trend: '+18%', color: 'text-green-600' },
                { channel: 'PPC', performance: 'Medium', value: '21%', trend: '-3%', color: 'text-red-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-adsilo-border rounded-lg">
                  <div>
                    <span className="font-medium">{item.channel}</span>
                    <div className="text-xs text-adsilo-text-muted mt-1">
                      {item.value} engagement
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${item.color}`}>{item.trend}</span>
                    <Sparkles className="h-4 w-4 text-adsilo-text-muted" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>AI-Recommended Campaigns</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Retargeting Campaign', score: 95, expected: '+$18K revenue' },
                { name: 'Lookalike Audience', score: 88, expected: '+2.4K leads' },
                { name: 'Seasonal Promotion', score: 82, expected: '+45% engagement' },
              ].map((camp, i) => (
                <div key={i} className="p-3 border border-adsilo-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{camp.name}</span>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-semibold">{camp.score}/100</span>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-medium">{camp.expected}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DigitalMarketingPage;