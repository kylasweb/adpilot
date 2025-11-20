'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle, FileText } from "lucide-react";

const complianceItems = [
  { name: 'GDPR Compliance', status: 'Compliant', lastCheck: '2024-01-15', icon: CheckCircle, color: 'text-green-500' },
  { name: 'CCPA Compliance', status: 'Compliant', lastCheck: '2024-01-14', icon: CheckCircle, color: 'text-green-500' },
  { name: 'SOC 2 Type II', status: 'In Progress', lastCheck: '2024-01-10', icon: AlertTriangle, color: 'text-yellow-500' },
  { name: 'HIPAA', status: 'Not Applicable', lastCheck: '-', icon: FileText, color: 'text-gray-500' },
];

const AdminCompliancePage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Compliance Monitoring</h1>
        <p className="text-adsilo-text-secondary mt-1">Track regulatory compliance and certifications</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {complianceItems.map((item, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>Last checked: {item.lastCheck}</CardDescription>
                  </div>
                </div>
                <Badge variant={item.status === 'Compliant' ? 'default' : 'outline'}>{item.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-adsilo-text-muted">
                {item.status === 'Compliant' && 'All requirements met. Regular monitoring active.'}
                {item.status === 'In Progress' && 'Certification in progress. Review pending documentation.'}
                {item.status === 'Not Applicable' && 'This regulation does not apply to current operations.'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Data Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: 'Data Encryption', status: 'Active' },
              { label: 'Access Logs', status: 'Enabled' },
              { label: 'Data Retention Policy', status: 'Configured' },
              { label: 'User Consent Management', status: 'Active' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-adsilo-border rounded-lg">
                <span className="font-medium">{item.label}</span>
                <Badge className="bg-green-100 text-green-800">{item.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default AdminCompliancePage;