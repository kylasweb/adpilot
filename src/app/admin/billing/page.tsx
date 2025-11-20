'use client'

import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { CreditCard, Receipt, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import SubscriptionCard from "@/components/admin/billing/SubscriptionCard";
import InvoiceTable from "@/components/admin/billing/InvoiceTable";
import UsageMetrics from "@/components/admin/billing/UsageMetrics";
import { Subscription, Invoice, UsageMetrics as UsageMetricsType } from "@/components/admin/billing/types";

// For demo purposes, we'll use a hardcoded user ID
// In production, this would come from auth context
const DEMO_USER_ID = 'demo-user-id';

const AdminBillingPage = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [usage, setUsage] = useState<UsageMetricsType | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [loadingUsage, setLoadingUsage] = useState(true);
  const [invoicePage, setInvoicePage] = useState(1);
  const [invoiceTotalPages, setInvoiceTotalPages] = useState(1);

  const fetchSubscription = async () => {
    setLoadingSubscription(true);
    try {
      const response = await fetch(`/api/billing/${DEMO_USER_ID}`);
      const data = await response.json();
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast.error('Failed to load subscription');
    } finally {
      setLoadingSubscription(false);
    }
  };

  const fetchInvoices = async () => {
    setLoadingInvoices(true);
    try {
      const params = new URLSearchParams({
        page: invoicePage.toString(),
        limit: '10'
      });

      const response = await fetch(`/api/billing/invoices/${DEMO_USER_ID}?${params}`);
      const data = await response.json();

      setInvoices(data.invoices || []);
      setInvoiceTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to load invoices');
    } finally {
      setLoadingInvoices(false);
    }
  };

  const fetchUsage = async () => {
    setLoadingUsage(true);
    try {
      const response = await fetch(`/api/billing/usage/${DEMO_USER_ID}`);
      const data = await response.json();
      setUsage(data);
    } catch (error) {
      console.error('Error fetching usage:', error);
      toast.error('Failed to load usage metrics');
    } finally {
      setLoadingUsage(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
    fetchInvoices();
    fetchUsage();
  }, [invoicePage]);

  const handleDownloadInvoice = (invoice: Invoice) => {
    if (invoice.invoiceUrl) {
      window.open(invoice.invoiceUrl, '_blank');
    } else {
      toast.error('Invoice URL not available');
    }
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Billing Management</h1>
            <p className="text-adsilo-text-secondary mt-1">
              Manage your subscription and billing information
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6"
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              <CreditCard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="invoices">
              <Receipt className="h-4 w-4 mr-2" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="usage">
              <TrendingUp className="h-4 w-4 mr-2" />
              Usage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SubscriptionCard
                subscription={subscription}
                loading={loadingSubscription}
              />
              <UsageMetrics
                metrics={usage}
                loading={loadingUsage}
              />
            </div>

            {/* Recent Invoices Preview */}
            <Card className="border-adsilo-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Recent Invoices
                </CardTitle>
                <CardDescription>Your latest billing invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <InvoiceTable
                  invoices={invoices.slice(0, 5)}
                  loading={loadingInvoices}
                  page={1}
                  totalPages={1}
                  onPageChange={() => { }}
                  onDownload={handleDownloadInvoice}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card className="border-adsilo-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  All Invoices
                </CardTitle>
                <CardDescription>Complete invoice history</CardDescription>
              </CardHeader>
              <CardContent>
                <InvoiceTable
                  invoices={invoices}
                  loading={loadingInvoices}
                  page={invoicePage}
                  totalPages={invoiceTotalPages}
                  onPageChange={setInvoicePage}
                  onDownload={handleDownloadInvoice}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UsageMetrics
                metrics={usage}
                loading={loadingUsage}
              />

              <Card className="border-adsilo-border">
                <CardHeader>
                  <CardTitle>Plan Comparison</CardTitle>
                  <CardDescription>Compare available plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE'].map((plan) => {
                      const limits = {
                        FREE: { campaigns: 5, cohorts: 3, creatives: 10, price: '$0' },
                        STARTER: { campaigns: 20, cohorts: 10, creatives: 50, price: '$29' },
                        PROFESSIONAL: { campaigns: 100, cohorts: 50, creatives: 500, price: '$99' },
                        ENTERPRISE: { campaigns: '∞', cohorts: '∞', creatives: '∞', price: 'Custom' }
                      };

                      const planLimits = limits[plan as keyof typeof limits];
                      const isCurrent = usage?.plan === plan;

                      return (
                        <div
                          key={plan}
                          className={`p-4 rounded-lg border ${isCurrent
                              ? 'border-adsilo-primary bg-adsilo-primary/5'
                              : 'border-adsilo-border'
                            }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">{plan}</div>
                            <div className="font-bold text-adsilo-primary">{planLimits.price}/mo</div>
                          </div>
                          <div className="text-xs text-adsilo-text-muted space-y-1">
                            <div>{planLimits.campaigns} campaigns</div>
                            <div>{planLimits.cohorts} cohorts</div>
                            <div>{planLimits.creatives} creatives</div>
                          </div>
                          {isCurrent && (
                            <div className="mt-2 text-xs font-medium text-adsilo-primary">
                              Current Plan
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default AdminBillingPage;