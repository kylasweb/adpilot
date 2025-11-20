'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Plus, FileText } from "lucide-react";

const invoices = [
  { number: 'INV-001', client: 'Acme Corp', amount: 5400, status: 'Paid', date: '2024-01-15' },
  { number: 'INV-002', client: 'TechStart', amount: 3200, status: 'Pending', date: '2024-01-20' },
  { number: 'INV-003', client: 'DesignPro', amount: 7800, status: 'Overdue', date: '2024-01-10' },
];

const CRMAccountingPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Accounting</h1>
            <p className="text-adsilo-text-secondary mt-1">Financial management and invoicing</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />New Invoice</Button>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {[
          { label: 'Total Revenue', value: '$84,293', icon: DollarSign, color: 'bg-green-500' },
          { label: 'Outstanding', value: '$12,450', icon: FileText, color: 'bg-yellow-500' },
          { label: 'Growth', value: '+18.2%', icon: TrendingUp, color: 'bg-blue-500' },
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
        <CardHeader><CardTitle>Recent Invoices</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-adsilo-border rounded-lg">
                <div>
                  <div className="font-semibold">{invoice.number}</div>
                  <div className="text-sm text-adsilo-text-muted">{invoice.client} • {invoice.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold">${invoice.amount.toLocaleString()}</div>
                  </div>
                  <Badge variant={invoice.status === 'Paid' ? 'default' : invoice.status === 'Pending' ? 'outline' : 'destructive'}>
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default CRMAccountingPage;