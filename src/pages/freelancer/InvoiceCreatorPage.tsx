
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, FileText, DollarSign } from "lucide-react";

const InvoiceCreatorPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Invoice Creator</h1>
            <p className="text-adpilot-text-secondary mt-1">
              Generate invoices and track payments from your clients
            </p>
          </div>
          <Button>
            <span className="mr-2">+</span> New Invoice
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="h-full md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Recent Invoices</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-adpilot-text-muted">
                  No invoices created yet. Click "New Invoice" to create your first invoice.
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <Database className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Client Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm text-adpilot-text-muted">Total Clients</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm text-adpilot-text-muted">Open Invoices</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm text-adpilot-text-muted">Overdue Invoices</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500 text-white">
                <DollarSign className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Financial Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded text-center">
                <div className="text-2xl font-bold">$0.00</div>
                <div className="text-sm text-adpilot-text-muted">Total Invoiced</div>
              </div>
              <div className="p-4 bg-gray-50 rounded text-center">
                <div className="text-2xl font-bold">$0.00</div>
                <div className="text-sm text-adpilot-text-muted">Paid</div>
              </div>
              <div className="p-4 bg-gray-50 rounded text-center">
                <div className="text-2xl font-bold">$0.00</div>
                <div className="text-sm text-adpilot-text-muted">Outstanding</div>
              </div>
              <div className="p-4 bg-gray-50 rounded text-center">
                <div className="text-2xl font-bold">$0.00</div>
                <div className="text-sm text-adpilot-text-muted">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default InvoiceCreatorPage;
