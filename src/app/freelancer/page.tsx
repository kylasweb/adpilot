'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, Plus, Briefcase, Sparkles, Brain } from "lucide-react";
import { toast } from "sonner";

const FreelancerPage = () => {
  const [matching, setMatching] = useState(false);

  const freelancers = [
    { name: 'Sarah Designer', skill: 'UI/UX Design', rate: '$85/hr', status: 'Available', rating: 4.9, match: 95 },
    { name: 'Mike Developer', skill: 'Full Stack Dev', rate: '$95/hr', status: 'Busy', rating: 4.8, match: 88 },
    { name: 'Emma Writer', skill: 'Content Writing', rate: '$60/hr', status: 'Available', rating: 4.7, match: 92 },
  ];

  const handleAIMatch = () => {
    setMatching(true);
    setTimeout(() => {
      setMatching(false);
      toast.success('AI found 3 perfect matches for your project!');
    }, 2000);
  };

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">AI Freelancer Matching</h1>
            <p className="text-adsilo-text-secondary mt-1">Find the perfect freelancers with AI</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAIMatch} disabled={matching}>
              {matching ? 'Matching...' : <><Brain className="h-4 w-4 mr-2" />AI Match</>}
            </Button>
            <Button><Plus className="h-4 w-4 mr-2" />Add Freelancer</Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {[
          { label: 'Active Freelancers', value: '24', icon: Users },
          { label: 'Available Now', value: '12', icon: Users },
          { label: 'Active Projects', value: '8', icon: Briefcase },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="h-5 w-5 text-adsilo-primary" />
                <span className="text-sm text-adsilo-text-muted">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            AI Matching Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-blue-900">Optimal Team Composition</div>
                <div className="text-sm text-blue-800 mt-1">
                  For your current projects, AI recommends: 2 UI/UX designers, 3 full-stack  developers, and 1 content writer. This composition matches 92% with successful similar projects.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-green-900">Budget Optimization</div>
                <div className="text-sm text-green-800 mt-1">
                  AI suggests reallocating 15% of budget from design to development phase for optimal project velocity. Expected completion: 2 weeks earlier, saving $4,200.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>AI-Matched Freelancers</CardTitle>
          <p className="text-sm text-adsilo-text-muted">Sorted by AI match score for your projects</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {freelancers.map((freelancer, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-adsilo-border rounded-lg hover:border-adsilo-primary transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-adsilo-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-adsilo-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{freelancer.name}</div>
                    <div className="text-sm text-adsilo-text-muted">{freelancer.skill} • {freelancer.rate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-purple-600">{freelancer.match}% Match</span>
                    </div>
                    <span className="text-sm text-adsilo-text-muted">⭐ {freelancer.rating}</span>
                  </div>
                  <Badge variant={freelancer.status === 'Available' ? 'default' : 'outline'}>
                    {freelancer.status}
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

export default FreelancerPage;