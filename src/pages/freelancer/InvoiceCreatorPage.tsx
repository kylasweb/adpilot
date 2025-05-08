import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, FileText, DollarSign, Settings, FileType, Receipt, Calculator } from "lucide-react";
import { InvoiceTemplateConfigurator } from "@/components/freelancer/configurators/invoice/InvoiceTemplateConfigurator";
import { InvoiceSettingsConfigurator } from "@/components/freelancer/configurators/invoice/InvoiceSettingsConfigurator";
import { PaymentTermsConfigurator } from "@/components/freelancer/configurators/invoice/PaymentTermsConfigurator";
import { TaxSettingsConfigurator } from "@/components/freelancer/configurators/invoice/TaxSettingsConfigurator";

export const InvoiceCreatorPage: React.FC = () => {
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [paymentTermsDialogOpen, setPaymentTermsDialogOpen] = useState(false);
  const [taxSettingsDialogOpen, setTaxSettingsDialogOpen] = useState(false);

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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setTemplateDialogOpen(true)} title="Invoice Template">
              <FileType className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setSettingsDialogOpen(true)} title="Invoice Settings">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setPaymentTermsDialogOpen(true)} title="Payment Terms">
              <Receipt className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setTaxSettingsDialogOpen(true)} title="Tax Settings">
              <Calculator className="h-5 w-5" />
            </Button>
            <Button>
              <span className="mr-2">+</span> New Invoice
            </Button>
          </div>
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

      <InvoiceTemplateConfigurator 
        open={templateDialogOpen}
        onOpenChange={setTemplateDialogOpen}
      />
      
      <InvoiceSettingsConfigurator
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
      />
      
      <PaymentTermsConfigurator
        open={paymentTermsDialogOpen}
        onOpenChange={setPaymentTermsDialogOpen}
      />
      
      <TaxSettingsConfigurator
        open={taxSettingsDialogOpen}
        onOpenChange={setTaxSettingsDialogOpen}
      />
    </AppLayout>
  );
};

export default InvoiceCreatorPage;
