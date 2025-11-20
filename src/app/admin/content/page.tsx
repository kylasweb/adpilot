'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FileText, Plus, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

const AdminContentPage = () => {
  const [generating, setGenerating] = useState(false);

  const handleAIGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast.success('AI-generated content ready for review!');
    }, 2000);
  };

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">AI Content Management</h1>
            <p className="text-adsilo-text-secondary mt-1">Create and manage content with AI assistance</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />New Content</Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {[
          { label: 'Pages', count: 24, icon: FileText },
          { label: 'Posts', count: 156, icon: FileText },
          { label: 'Media Files', count: 892, icon: FileText },
        ].map((item, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <item.icon className="h-5 w-5" />
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI Content Generator
            </CardTitle>
            <CardDescription>Create high-quality content with AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Content Topic</label>
              <Input placeholder="e.g., 10 Tips for Social Media Marketing" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Target Keywords</label>
              <Input placeholder="e.g., social media, marketing tips, engagement" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Tone</label>
              <Input placeholder="e.g., Professional, Casual, Informative" className="mt-2" />
            </div>
            <div>
              <label className="text-sm font-medium">Additional Context</label>
              <Textarea placeholder="Any specific points to cover..." rows={3} className="mt-2" />
            </div>
            <Button onClick={handleAIGenerate} className="w-full" disabled={generating}>
              {generating ? 'Generating...' : <><Wand2 className="h-4 w-4 mr-2" />Generate Content with AI</>}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Content Suggestions
            </CardTitle>
            <CardDescription>Trending topics based on your audience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'How to Leverage TikTok for B2B Marketing', score: 95, trend: 'Rising' },
                { title: 'AI in Email Marketing: Complete Guide 2024', score: 88, trend: 'Hot' },
                { title: 'Instagram Reels Strategy for SMBs', score: 82, trend: 'Steady' },
              ].map((suggestion, i) => (
                <div key={i} className="p-3 border border-adsilo-border rounded-lg hover:border-adsilo-primary transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{suggestion.title}</div>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-adsilo-text-muted">AI Score: {suggestion.score}/100</span>
                        <span className={`px-2 py-0.5 rounded ${suggestion.trend === 'Rising' ? 'bg-green-100 text-green-700' :
                            suggestion.trend === 'Hot' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                          }`}>
                          {suggestion.trend}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Wand2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Recent Content</CardTitle><CardDescription>Latest content updates</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: '10 Social Media Trends for 2024', type: 'Blog Post', status: 'Published', date: '2024-01-20' },
              { title: 'Email Marketing Best Practices', type: 'Guide', status: 'Draft', date: '2024-01-19' },
            ].map((content, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-adsilo-border rounded-lg">
                <div>
                  <div className="font-medium">{content.title}</div>
                  <div className="text-sm text-adsilo-text-muted">{content.type} • {content.date}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${content.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {content.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default AdminContentPage;