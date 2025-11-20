'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

const AdminAnalyticsPage = () => {
  const stats = [
    { label: 'Total Users', value: '12,543', change: '+12.5%', icon: Users, color: 'bg-blue-500' },
    { label: 'Revenue', value: '$84,293', change: '+8.2%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Active Sessions', value: '2,847', change: '+23.1%', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Conversion Rate', value: '3.24%', change: '+0.8%', icon: BarChart3, color: 'bg-orange-500' },
  ];

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Admin Analytics</h1>
        <p className="text-adsilo-text-secondary mt-1">Platform performance and usage metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div>
                <p className="text-sm text-adsilo-text-muted">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Platform Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-adsilo-border rounded-lg">
            <div className="text-center text-adsilo-text-muted">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Analytics chart visualization</p>
              <p className="text-sm">Connect to analytics service to view detailed metrics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default AdminAnalyticsPage;