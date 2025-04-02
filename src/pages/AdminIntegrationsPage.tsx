
import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Instagram, Database, MessageSquare, CreditCard, Link, Settings as SettingsIcon, ExternalLink, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Sample integrations data
const marketingIntegrations = [
  {
    id: "facebook",
    name: "Facebook Ads",
    description: "Connect your Facebook Ads account to import and manage campaigns",
    status: "connected",
    icon: Facebook,
    lastSync: "2 hours ago"
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Connect your Instagram Business account for insights and posting",
    status: "connected",
    icon: Instagram,
    lastSync: "5 hours ago"
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    description: "Connect your TikTok Ads account to manage campaigns",
    status: "not_connected",
    icon: MessageSquare,
    lastSync: null
  }
];

const dataIntegrations = [
  {
    id: "googleAnalytics",
    name: "Google Analytics",
    description: "Import website analytics data for campaign performance tracking",
    status: "connected",
    icon: Database,
    lastSync: "1 day ago"
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Connect your CRM to track lead conversions and ROI",
    status: "not_connected",
    icon: Database,
    lastSync: null
  }
];

const paymentIntegrations = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Connect your payment processor for billing management",
    status: "connected",
    icon: CreditCard,
    lastSync: "3 days ago"
  }
];

const AdminIntegrationsPage = () => {
  const [activeTab, setActiveTab] = useState("marketing");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [showWebhookDialog, setShowWebhookDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const handleConnectIntegration = (integrationId: string, integrationType: string) => {
    if (integrationId === "tiktok" || integrationId === "salesforce") {
      setSelectedIntegration(integrationId);
      setShowApiKeyDialog(true);
    } else {
      // Simulate OAuth flow
      toast.success(`Redirecting to ${integrationId} authentication...`);
    }
  };

  const handleDisconnectIntegration = (integrationId: string) => {
    toast.success(`Disconnected from ${integrationId} successfully!`);
  };

  const handleSyncIntegration = (integrationId: string) => {
    toast.success(`Syncing ${integrationId} data...`);
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Connected to ${selectedIntegration} successfully!`);
    setShowApiKeyDialog(false);
    setApiKey("");
  };

  const handleWebhookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Webhook configured successfully!");
    setShowWebhookDialog(false);
    setWebhookUrl("");
  };

  // Render a single integration card
  const renderIntegrationCard = (integration: any) => (
    <Card key={integration.id} className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted p-2">
              <integration.icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{integration.name}</CardTitle>
              {integration.status === "connected" && (
                <CardDescription className="text-xs">
                  Last synced: {integration.lastSync}
                </CardDescription>
              )}
            </div>
          </div>
          <Badge variant={integration.status === "connected" ? "default" : "outline"}>
            {integration.status === "connected" ? "Connected" : "Not Connected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <p>{integration.description}</p>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        {integration.status === "connected" ? (
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" size="sm" onClick={() => handleSyncIntegration(integration.id)}>
              Sync Now
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleDisconnectIntegration(integration.id)}>
                Disconnect
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <SettingsIcon className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            className="w-full" 
            size="sm" 
            onClick={() => handleConnectIntegration(integration.id, activeTab)}
          >
            Connect
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-adpilot-text-secondary mt-1">Connect your tools and services</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowWebhookDialog(true)}>
            <Link className="mr-2 h-4 w-4" />
            Configure Webhook
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="border-b bg-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>Overview of your connected services</CardDescription>
            </div>
            <Button variant="outline">
              View API Keys
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Core Integrations</h3>
                  <p className="text-sm text-muted-foreground">Facebook Ads & Instagram connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage Permissions
              </Button>
            </div>
            
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium">Data Sync Status</h3>
                  <p className="text-sm text-muted-foreground">Last successful sync: 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Sync Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-2">
          <CardTitle>Available Integrations</CardTitle>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="marketing">Marketing Platforms</TabsTrigger>
              <TabsTrigger value="data">Data Sources</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="marketing" className="m-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {marketingIntegrations.map(integration => 
                renderIntegrationCard(integration)
              )}
            </div>
          </TabsContent>
          <TabsContent value="data" className="m-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dataIntegrations.map(integration => 
                renderIntegrationCard(integration)
              )}
            </div>
          </TabsContent>
          <TabsContent value="payments" className="m-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {paymentIntegrations.map(integration => 
                renderIntegrationCard(integration)
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      {/* API Key Dialog */}
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect with API Key</DialogTitle>
            <DialogDescription>
              Enter your {selectedIntegration} API key to establish the connection.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                required
              />
              <p className="text-xs text-muted-foreground">
                You can find this in your {selectedIntegration} account dashboard
              </p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowApiKeyDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Connect</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Webhook Dialog */}
      <Dialog open={showWebhookDialog} onOpenChange={setShowWebhookDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Webhook</DialogTitle>
            <DialogDescription>
              Set up a webhook to receive events from external services.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWebhookSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="webhookUrl" className="text-sm font-medium">
                Webhook URL
              </label>
              <Input
                id="webhookUrl"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://example.com/webhook"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Events</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Campaign Created</div>
                  <Switch id="event-campaign-created" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Campaign Updated</div>
                  <Switch id="event-campaign-updated" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Campaign Completed</div>
                  <Switch id="event-campaign-completed" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Cohort Changed</div>
                  <Switch id="event-cohort-changed" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowWebhookDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Configuration</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default AdminIntegrationsPage;
