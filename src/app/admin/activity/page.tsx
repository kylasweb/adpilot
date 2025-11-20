'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Activity, User, FileEdit, Trash, Plus, Settings } from "lucide-react";

const AdminActivityPage = () => {
  const activities = [
    { icon: Plus, action: 'Created project', user: 'John Doe', target: 'Marketing Campaign Q4', time: '2 min ago', color: 'text-green-500' },
    { icon: FileEdit, action: 'Updated user', user: 'Jane Smith', target: 'alice@example.com', time: '15 min ago', color: 'text-blue-500' },
    { icon: Trash, action: 'Deleted campaign', user: 'Admin', target: 'Old Summer Sale', time: '1 hour ago', color: 'text-red-500' },
    { icon: User, action: 'User login', user: 'Bob Wilson', target: 'System', time: '2 hours ago', color: 'text-purple-500' },
    { icon: Settings, action: 'Changed settings', user: 'Admin', target: 'Security policies', time: '3 hours ago', color: 'text-orange-500' },
  ];

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Activity Logs</h1>
        <p className="text-adsilo-text-secondary mt-1">Monitor all system activities and user actions</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {[
          { label: "Today's Actions", value: "247", icon: Activity, color: "bg-blue-500" },
          { label: "Active Users", value: "18", icon: User, color: "bg-green-500" },
          { label: "Failed Logins", value: "3", icon: Activity, color: "bg-red-500" },
          { label: "API Calls", value: "1.2K", icon: Settings, color: "bg-purple-500" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-adsilo-text-muted">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" />Recent Activity</CardTitle>
          <CardDescription>Latest actions across the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-adsilo-border rounded-lg hover:bg-accent transition-colors">
                <div className={`p-2 rounded-lg bg-opacity-10 ${activity.color.replace('text-', 'bg-')}`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-sm text-adsilo-text-muted">
                    by {activity.user} • {activity.target}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">{activity.time}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default AdminActivityPage;