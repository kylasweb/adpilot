
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FacebookAdsIntegration from "@/components/integrations/FacebookAdsIntegration";

const AdminIntegrationsPage = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">Connect with external platforms and services</p>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="advertising">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Connected Services</CardTitle>
              <TabsList>
                <TabsTrigger value="advertising">Advertising</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="crm">CRM</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>Manage your external service connections</CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="advertising">
              <FacebookAdsIntegration />
            </TabsContent>
            <TabsContent value="analytics">
              <div className="flex items-center justify-center h-40 bg-muted rounded-md">
                <p className="text-muted-foreground">No analytics integrations configured</p>
              </div>
            </TabsContent>
            <TabsContent value="crm">
              <div className="flex items-center justify-center h-40 bg-muted rounded-md">
                <p className="text-muted-foreground">No CRM integrations configured</p>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </AppLayout>
  );
};

export default AdminIntegrationsPage;
