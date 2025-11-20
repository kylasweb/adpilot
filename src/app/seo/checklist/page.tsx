'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const SEOChecklistPage = () => {
  const checks = [
    { item: 'Meta titles optimized', status: 'pass', priority: 'High' },
    { item: 'Alt text for images', status: 'pass', priority: 'Medium' },
    { item: 'Mobile responsiveness', status: 'pass', priority: 'High' },
    { item: 'Page load speed', status: 'warning', priority: 'High' },
    { item: 'Structured data markup', status: 'fail', priority: 'Medium' },
    { item: 'Internal linking', status: 'pass', priority: 'Medium' },
    { item: 'XML sitemap', status: 'pass', priority: 'High' },
    { item: 'HTTPS enabled', status: 'pass', priority: 'High' },
  ];

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">SEO Checklist</h1>
        <p className="text-adsilo-text-secondary mt-1">Monitor SEO best practices compliance</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {[
          { label: 'Passed', value: checks.filter(c => c.status === 'pass').length, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Warnings', value: checks.filter(c => c.status === 'warning').length, icon: AlertTriangle, color: 'text-yellow-500' },
          { label: 'Failed', value: checks.filter(c => c.status === 'fail').length, icon: XCircle, color: 'text-red-500' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                <span className="text-sm text-adsilo-text-muted">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>SEO Checks</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checks.map((check, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-adsilo-border rounded-lg">
                <div className="flex items-center gap-3">
                  {check.status === 'pass' ? <CheckCircle className="h-5 w-5 text-green-500" /> :
                    check.status === 'warning' ? <AlertTriangle className="h-5 w-5 text-yellow-500" /> :
                      <XCircle className="h-5 w-5 text-red-500" />}
                  <span className="font-medium">{check.item}</span>
                </div>
                <Badge variant="outline">{check.priority}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default SEOChecklistPage;