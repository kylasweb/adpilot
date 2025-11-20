'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Mail, Plus, Send, Users, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

const EmailMarketingPage = () => {
  const [generatingContent, setGeneratingContent] = useState(false);

  const campaigns = [
    { name: 'Summer Newsletter', sent: 15420, opened: 8234, clicked: 1245, status: 'Sent' },
    { name: 'Product Launch', sent: 0, opened: 0, clicked: 0, status: 'Draft' },
  ];

  const handleAIGenerate = () => {
    setGeneratingContent(true);
    setTimeout(() => {
      setGeneratingContent(false);
      toast.success('AI-generated email content ready!');
    }, 2000);
  };

  const handleOptimizeSendTime = () => {
    toast.success('AI suggests sending Tuesday at 10:00 AM for best engagement');
  };

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Email Marketing</h1>
            <p className="text-adsilo-text-secondary mt-1">Create and manage AI-powered email campaigns</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />New Campaign</Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {[
          { label: 'Total Sent', value: '245K', icon: Send },
          { label: 'Open Rate', value: '42.3%', icon: Mail },
          { label: 'Click Rate', value: '12.8%', icon: Mail },
          { label: 'Subscribers', value: '18.5K', icon: Users },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="h-5 w-5 text-adsilo-primary" />
                <span className="text-sm text-adsilo-text-muted">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Email Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Campaign Goal</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Drive Sales</SelectItem>
                  <SelectItem value="engagement">Increase Engagement</SelectItem>
                  <SelectItem value="awareness">Build Awareness</SelectItem>
                  <SelectItem value="retention">Customer Retention</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Target Audience</Label>
              <Input placeholder="e.g., Small business owners, age 30-45" className="mt-2" />
            </div>
            <div>
              <Label>Key Message</Label>
              <Textarea placeholder="Brief description of what you want to communicate..." rows={3} className="mt-2" />
            </div>
            <Button onClick={handleAIGenerate} className="w-full" disabled={generatingContent}>
              {generatingContent ? (
                <>Generating...</>
              ) : (
                <><Wand2 className="h-4 w-4 mr-2" />Generate Email with AI</>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-adsilo-border rounded-lg bg-blue-50">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <div className="font-semibold text-sm text-blue-900">Subject Line Suggestion</div>
                  <div className="text-sm text-blue-800 mt-1">
                    "🚀 Unlock 40% Off: Your Perfect Solution Awaits"
                  </div>
                  <div className="text-xs text-blue-700 mt-2">
                    Expected open rate: 48% (+12% vs. average)
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-adsilo-border rounded-lg bg-green-50">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <div className="font-semibold text-sm text-green-900">Best Send Time</div>
                  <div className="text-sm text-green-800 mt-1">
                    Tuesday, 10:00 AM (user's timezone)
                  </div>
                  <div className="text-xs text-green-700 mt-2">
                    Based on historical engagement patterns
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-adsilo-border rounded-lg bg-purple-50">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <div className="font-semibold text-sm text-purple-900">Personalization Tips</div>
                  <div className="text-sm text-purple-800 mt-1">
                    • Use recipient's first name<br />
                    • Reference past purchases<br />
                    • Include location-based offers
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleOptimizeSendTime} variant="outline" className="w-full">
              <Sparkles className="h-4 w-4 mr-2" />
              Apply AI Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Recent Campaigns</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campaigns.map((campaign, i) => (
              <div key={i} className="p-4 border border-adsilo-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{campaign.name}</div>
                  <div className="text-sm text-adsilo-text-muted">{campaign.status}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-adsilo-text-muted">Sent</div>
                    <div className="font-medium">{campaign.sent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-adsilo-text-muted">Opened</div>
                    <div className="font-medium">{campaign.opened.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-adsilo-text-muted">Clicked</div>
                    <div className="font-medium">{campaign.clicked.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default EmailMarketingPage;