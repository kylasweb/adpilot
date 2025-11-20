'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
    Users, Target, TrendingUp, Clock, Phone, CheckCircle,
    AlertCircle, Sparkles, Filter, ArrowRight
} from "lucide-react";
import Link from "next/link";

const SalesAgentConsolePage = () => {
    const agentStats = [
        { label: 'My Leads', value: '24', change: '+4 today', icon: Users, color: 'bg-blue-500' },
        { label: 'Qualified', value: '12', change: '50%', icon: Target, color: 'bg-green-500' },
        { label: 'In Progress', value: '8', change: '33%', icon: Clock, color: 'bg-orange-500' },
        { label: 'Closed Won', value: '4', change: '+$120K', icon: CheckCircle, color: 'bg-purple-500' },
    ];

    const myLeads = [
        {
            id: 'L-001',
            company: 'Acme Corp',
            contact: 'John Smith',
            score: 94,
            status: 'QUALIFIED',
            urgency: 'CRITICAL',
            nextAction: 'Schedule Demo',
            lastContact: '2 hours ago',
            value: '$85K'
        },
        {
            id: 'L-005',
            company: 'TechStart Inc',
            contact: 'Jane Doe',
            score: 87,
            status: 'CONTACTED',
            urgency: 'HIGH',
            nextAction: 'Send Proposal',
            lastContact: '1 day ago',
            value: '$65K'
        },
        {
            id: 'L-012',
            company: 'Global Solutions',
            contact: 'Bob Wilson',
            score: 72,
            status: 'NEW',
            urgency: 'MEDIUM',
            nextAction: 'Initial Call',
            lastContact: 'Never',
            value: '$45K'
        },
    ];

    const pipelineStages = [
        { stage: 'New', count: 8, value: '$210K', percentage: 33 },
        { stage: 'Contacted', count: 6, value: '$180K', percentage: 25 },
        { stage: 'Qualified', count: 4, value: '$150K', percentage: 17 },
        { stage: 'Proposal', count: 3, value: '$120K', percentage: 12 },
        { stage: 'Negotiation', count: 2, value: '$90K', percentage: 8 },
        { stage: 'Closed Won', count: 1, value: '$50K', percentage: 5 },
    ];

    const aiSuggestions = [
        {
            type: 'HIGH_PRIORITY',
            title: 'Urgent Follow-up Required',
            description: '3 high-score leads (L-001, L-002, L-003) haven\'t been contacted in 48+ hours',
            action: 'Review Leads',
            actionLink: '/leads'
        },
        {
            type: 'OPPORTUNITY',
            title: 'Cross-sell Opportunity',
            description: 'Acme Corp (L-001) shows interest patterns matching Enterprise Add-ons',
            action: 'View Details',
            actionLink: '/leads/L-001'
        },
        {
            type: 'OPTIMIZATION',
            title: 'Best Time to Call',
            description: 'Jane Doe typically responds best to calls on Tuesday 2-4 PM',
            action: 'Schedule Call',
            actionLink: '#'
        },
    ];

    return (
        <AppLayout>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Sales Agent Console</h1>
                        <p className="text-adsilo-text-secondary mt-1">Your personal sales workspace</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                        <Link href="/sales/campaigns">
                            <Button>
                                <Phone className="h-4 w-4 mr-2" />
                                AI Campaigns
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {agentStats.map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                            </div>
                            <p className="text-sm text-adsilo-text-muted">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* AI Suggestions */}
            <Card className="mt-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        AI Assistant Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {aiSuggestions.map((suggestion, i) => (
                        <div key={i} className="p-4 bg-white rounded-lg border border-adsilo-border hover:border-adsilo-primary transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {suggestion.type === 'HIGH_PRIORITY' && <AlertCircle className="h-5 w-5 text-red-500" />}
                                        {suggestion.type === 'OPPORTUNITY' && <Target className="h-5 w-5 text-green-500" />}
                                        {suggestion.type === 'OPTIMIZATION' && <Sparkles className="h-5 w-5 text-blue-500" />}
                                        <span className="font-semibold">{suggestion.title}</span>
                                    </div>
                                    <p className="text-sm text-adsilo-text-muted mb-3">{suggestion.description}</p>
                                    <Link href={suggestion.actionLink}>
                                        <Button size="sm" variant="outline">
                                            {suggestion.action}
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* My Leads */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="active">
                        <TabsList>
                            <TabsTrigger value="active">Active Leads (24)</TabsTrigger>
                            <TabsTrigger value="new">New (8)</TabsTrigger>
                            <TabsTrigger value="qualified">Qualified (12)</TabsTrigger>
                        </TabsList>

                        <TabsContent value="active">
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Active Leads</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {myLeads.map((lead) => (
                                            <Link key={lead.id} href={`/leads/${lead.id}`}>
                                                <div className="p-4 border border-adsilo-border rounded-lg hover:border-adsilo-primary transition-colors cursor-pointer">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="font-semibold text-lg">{lead.company}</div>
                                                            <div className="text-sm text-adsilo-text-muted">{lead.contact} • {lead.id}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className={`text-sm font-semibold px-3 py-1 rounded-full ${lead.score >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                Score: {lead.score}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <div className="text-adsilo-text-muted">Next Action</div>
                                                            <div className="font-medium flex items-center gap-1">
                                                                <Sparkles className="h-3 w-3 text-purple-600" />
                                                                {lead.nextAction}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-adsilo-text-muted">Last Contact</div>
                                                            <div className="font-medium">{lead.lastContact}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-adsilo-text-muted">Value</div>
                                                            <div className="font-medium">{lead.value}</div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 flex gap-2">
                                                        <Badge className={
                                                            lead.urgency === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                                                                lead.urgency === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                        }>
                                                            {lead.urgency}
                                                        </Badge>
                                                        <Badge variant="outline">{lead.status}</Badge>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="new">
                            <Card>
                                <CardHeader>
                                    <CardTitle>New Leads</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-12 text-adsilo-text-muted">
                                        <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p>8 new leads waiting for initial contact</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="qualified">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Qualified Leads</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-12 text-adsilo-text-muted">
                                        <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p>12 qualified leads ready for proposal</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Pipeline Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                My Pipeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {pipelineStages.map((stage, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">{stage.stage}</span>
                                        <span className="text-adsilo-text-muted">{stage.count} leads</span>
                                    </div>
                                    <Progress value={stage.percentage} className="h-2 mb-1" />
                                    <div className="text-xs text-adsilo-text-muted">{stage.value}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[
                                { task: 'Follow up with Acme Corp', time: '2:00 PM', priority: 'high' },
                                { task: 'Send proposal to TechStart', time: '3:30 PM', priority: 'medium' },
                                { task: 'Demo call with Global Solutions', time: '4:00 PM', priority: 'high' },
                            ].map((task, i) => (
                                <div key={i} className="p-3 border border-adsilo-border rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <div className={`h-2 w-2 rounded-full mt-1.5 ${task.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                                            }`} />
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">{task.task}</div>
                                            <div className="text-xs text-adsilo-text-muted mt-1">{task.time}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default SalesAgentConsolePage;
