'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Plug, Check, Settings, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const integrations = [
  { name: 'Slack', desc: 'Team communication', status: 'Connected', icon: '💬', category: 'Communication' },
  { name: 'Google Analytics', desc: 'Website analytics', status: 'Connected', icon: '📊', category: 'Analytics' },
  { name: 'Stripe', desc: 'Payment processing', status: 'Available', icon: '💳', category: 'Payment' },
  { name: 'Mailchimp', desc: 'Email marketing', status: 'Available', icon: '📧', category: 'Marketing' },
  { name: 'Salesforce', desc: 'CRM platform', status: 'Available', icon: '🔗', category: 'CRM' },
  { name: 'Zapier', desc: 'Automation', status: 'Connected', icon: '⚡', category: 'Automation' },
];

const AdminIntegrationsPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-adsilo-text-secondary mt-1">Connect with third-party services</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {integrations.map((integration, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription className="text-xs">{integration.category}</CardDescription>
                  </div>
                </div>
                <Badge variant={integration.status === 'Connected' ? 'default' : 'outline'}>
                  {integration.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-adsilo-text-muted mb-4">{integration.desc}</p>
              <Button
                variant={integration.status === 'Connected' ? 'outline' : 'default'}
                className="w-full"
                size="sm"
                onClick={() => toast.success(`${integration.name} ${integration.status === 'Connected' ? 'disconnected' : 'connected'}`)}
              >
                {integration.status === 'Connected' ? (
                  <><Settings className="h-4 w-4 mr-2" />Configure</>
                ) : (
                  <><Plug className="h-4 w-4 mr-2" />Connect</>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default AdminIntegrationsPage;