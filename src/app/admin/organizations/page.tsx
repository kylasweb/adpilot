'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Building, Plus, Search } from "lucide-react";

const orgs = [
  { name: 'Acme Corp', members: 45, plan: 'Enterprise', status: 'Active' },
  { name: 'TechStart Inc', members: 12, plan: 'Professional', status: 'Active' },
  { name: 'Marketing Pro', members: 8, plan: 'Starter', status: 'Trial' },
];

const AdminOrganizationsPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Organizations</h1>
            <p className="text-adsilo-text-secondary mt-1">Manage client organizations</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />Add Organization</Button>
        </div>
      </motion.div>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search organizations..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orgs.map((org, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-adsilo-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-adsilo-primary/10 flex items-center justify-center">
                    <Building className="h-6 w-6 text-adsilo-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{org.name}</div>
                    <div className="text-sm text-adsilo-text-muted">{org.members} members • {org.plan}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default AdminOrganizationsPage;