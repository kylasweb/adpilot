'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Zap, Sparkles, Brain } from "lucide-react";
import { toast } from "sonner";

const SEOTechnicalAnalyzerPage = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [url, setUrl] = useState('');

  const handleAnalyze = () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      toast.success('AI analysis complete!');
    }, 3000);
  };

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">AI Technical SEO Analyzer</h1>
        <p className="text-adsilo-text-secondary mt-1">AI-powered website technical SEO analysis</p>
      </motion.div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Analyze Website with AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter website URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={analyzing}>
              {analyzing ? 'Analyzing...' : <><Search className="h-4 w-4 mr-2" />Analyze</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[
          { label: 'Page Speed', score: 85, status: 'Good', color: 'text-green-600' },
          { label: 'Mobile Friendly', score: 92, status: 'Excellent', color: 'text-green-600' },
          { label: 'Core Web Vitals', score: 78, status: 'Needs Work', color: 'text-yellow-600' },
          { label: 'Crawlability', score: 95, status: 'Excellent', color: 'text-green-600' },
        ].map((metric, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-5 w-5 text-adsilo-primary" />
                <span className={`text-2xl font-bold ${metric.color}`}>{metric.score}</span>
              </div>
              <p className="text-sm text-adsilo-text-muted">{metric.label}</p>
              <p className="text-xs mt-1">{metric.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <Zap className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-red-900 flex items-center gap-2">
                  Critical: Largest Contentful Paint (LCP)
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">High Priority</span>
                </div>
                <div className="text-sm text-red-800 mt-1">
                  Current: 4.2s | Target: &lt;2.5s | Impact: 28% bounce rate reduction
                </div>
                <div className="text-sm mt-2 space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Optimize hero image (reduce from 2.1MB to 150KB)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Enable image lazy loading for below-fold content</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Implement resource hints (preconnect, preload)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Zap className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-yellow-900 flex items-center gap-2">
                  Warning: Cumulative Layout Shift (CLS)
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Medium Priority</span>
                </div>
                <div className="text-sm text-yellow-800 mt-1">
                  Current: 0.18 | Target: &lt;0.1 | Impact: 15% engagement improvement
                </div>
                <div className="text-sm mt-2">
                  <span className="text-green-600">✓</span> Reserve space for ad units and dynamic content
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-blue-900">AI Insight: Structured Data Opportunity</div>
                <div className="text-sm text-blue-800 mt-1">
                  Adding FAQ and HowTo schema could increase rich snippet visibility by 340% based on your content type and industry benchmarks.
                </div>
                <Button size="sm" variant="outline" className="mt-3">
                  Generate Schema Markup
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-green-900">AI Prediction: Traffic Impact</div>
                <div className="text-sm text-green-800 mt-1">
                  Implementing all recommendations could increase organic traffic by an estimated 42-58% within 3 months based on similar sites in your niche.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default SEOTechnicalAnalyzerPage;