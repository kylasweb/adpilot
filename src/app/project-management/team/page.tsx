'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, Plus, Mail } from "lucide-react";

const team = [
  { name: 'John Doe', role: 'Project Manager', email: 'john@example.com', status: 'Active' },
  { name: 'Jane Smith', role: 'Developer', email: 'jane@example.com', status: 'Active' },
  { name: 'Bob Wilson', role: 'Designer', email: 'bob@example.com', status: 'Busy' },
];

const ProjectTeamPage = () => {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-adsilo-text-secondary mt-1">Manage project team members</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />Add Member</Button>
        </div>
      </motion.div>
      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Team Members</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {team.map((member, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-adsilo-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-adsilo-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-adsilo-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-adsilo-text-muted flex items-center gap-2">
                      <Mail className="h-3 w-3" />{member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{member.role}</Badge>
                  <Badge className={member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {member.status}
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

export default ProjectTeamPage;