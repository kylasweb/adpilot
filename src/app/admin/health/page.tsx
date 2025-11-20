'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Activity, Database, Server, Zap, CheckCircle, AlertTriangle } from "lucide-react";

const AdminHealthPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">System Health</h1>
        <p className="text-adsilo-text-secondary mt-1">Monitor system status and performance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {[
          { label: "API Status", status: "Operational", icon: Zap, badge: "success" },
          { label: "Database", status: "Running", icon: Database, badge: "success" },
          { label: "Server Load", status: "Normal", icon: Server, badge: "success" },
        ].map((service, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <service.icon className="h-5 w-5" />
                  {service.label}
                </CardTitle>
                <Badge className="bg-green-100 text-green-800">{service.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uptime</span>
                  <span className="font-medium">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" />Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'CPU Usage', value: 45, status: 'good' },
              { label: 'Memory Usage', value: 62, status: 'warning' },
              { label: 'Disk Usage', value: 35, status: 'good' },
              { label: 'Network I/O', value: 28, status: 'good' },
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span>{metric.label}</span>
                  <span className="font-medium">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'API Endpoints', status: 'Healthy', icon: CheckCircle, color: 'text-green-500' },
                { name: 'Database Connection', status: 'Healthy', icon: CheckCircle, color: 'text-green-500' },
                { name: 'Cache Service', status: 'Degraded', icon: AlertTriangle, color: 'text-yellow-500' },
                { name: 'Email Service', status: 'Healthy', icon: CheckCircle, color: 'text-green-500' },
                { name: 'Storage Service', status: 'Healthy', icon: CheckCircle, color: 'text-green-500' },
              ].map((check, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-adsilo-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <check.icon className={`h-5 w-5 ${check.color}`} />
                    <span className="font-medium">{check.name}</span>
                  </div>
                  <Badge variant="outline">{check.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminHealthPage;