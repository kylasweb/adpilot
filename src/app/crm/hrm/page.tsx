'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, Plus, Calendar, Award } from "lucide-react";

const employees = [
  { name: 'Alice Johnson', position: 'Senior Developer', department: 'Engineering', status: 'Active', joinDate: '2022-03-15' },
  { name: 'Bob Smith', position: 'Product Manager', department: 'Product', status: 'Active', joinDate: '2021-08-20' },
  { name: 'Carol White', position: 'UX Designer', department: 'Design', status: 'On Leave', joinDate: '2023-01-10' },
];

const CRMHRMPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Human Resources</h1>
            <p className="text-adsilo-text-secondary mt-1">Manage employees and HR operations</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />Add Employee</Button>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {[
          { label: 'Total Employees', value: '156', icon: Users, color: 'bg-blue-500' },
          { label: 'On Leave', value: '8', icon: Calendar, color: 'bg-yellow-500' },
          { label: 'Open Positions', value: '12', icon: Award, color: 'bg-green-500' },
          { label: 'Departments', value: '7', icon: Users, color: 'bg-purple-500' },
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
      <Card className="mt-6">
        <CardHeader><CardTitle>Employee Directory</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {employees.map((emp, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-adsilo-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-adsilo-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-adsilo-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{emp.name}</div>
                    <div className="text-sm text-adsilo-text-muted">{emp.position} • {emp.department}</div>
                  </div>
                </div>
                <Badge variant={emp.status === 'Active' ? 'default' : 'outline'}>{emp.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default CRMHRMPage;