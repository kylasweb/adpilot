'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
    TrendingUp, Users, Target, DollarSign, Search, Filter,
    Phone, Mail, Sparkles, Brain, ArrowUpRight, Clock
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const LeadsDashboard = () => {
    const [analyzing, setAnalyzing] = useState(false);

    const stats = [
        { label: 'Total Leads', value: '1,247', change: '+18%', icon: Users, color: 'bg-blue-500' },
        { label: 'Qualified Leads', value: '342', change: '+24%', icon: Target, color: 'bg-green-500' },
        { label: 'Avg Lead Score', value: '76/100', change: '+12%', icon: TrendingUp, color: 'bg-purple-500' },
        { label: 'Pipeline Value', value: '$2.4M', change: '+32%', icon: DollarSign, color: 'bg-orange-500' },
    ];

    const recentLeads = [
        {
            id: 'L-001',
            name: 'Acme Corporation',
            contact: 'John Smith',
            score: 94,
            status: 'QUALIFIED',
            source: 'IVR',
            urgency: 'CRITICAL',
            assignedTo: 'Sarah Chen'
        },
        {
            id: 'L-002',
            name: 'TechStart Inc',
            contact: 'Jane Doe',
            score: 87,
            status: 'CONTACTED',
            source: 'WEB',
            urgency: 'HIGH',
            assignedTo: 'Mike Johnson'
        },
        {
            id: 'L-003',
            name: 'Global Solutions',
            contact: 'Bob Wilson',
            score: 72,
            status: 'NEW',
            source: 'IVR',
            urgency: 'MEDIUM',
            assignedTo: 'Unassigned'
        },
    ];

    const handleAIAnalysis = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            toast.success('AI analysis complete! Check recommendations below.');
        }, 2000);
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-100';
        if (score >= 60) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'CRITICAL': return 'bg-red-100 text-red-800';
            case 'HIGH': return 'bg-orange-100 text-orange-800';
            case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Lead Management Dashboard</h1>
                        <p className="text-adsilo-text-secondary mt-1">Advanced Conversational Sales Platform (ACSP)</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleAIAnalysis} disabled={analyzing}>
                            {analyzing ? 'Analyzing...' : <><Brain className="h-4 w-4 mr-2" />AI Insights</>}
                        </Button>
                        <Link href="/leads/list">
                            <Button>View All Leads</Button>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {stats.map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                                    <ArrowUpRight className="h-4 w-4" />
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-sm text-adsilo-text-muted">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* AI Insights Card */}
            <Card className="mt-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        AI-Powered Lead Insights
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-green-100">
                                <Target className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-green-900">High-Value Opportunity Detected</div>
                                <div className="text-sm text-green-800 mt-1">
                                    3 leads from IVR show 95%+ purchase intent based on conversation analysis. Predicted revenue: $180K. Recommend immediate senior agent assignment.
                                </div>
                                <Button size="sm" variant="outline" className="mt-3">
                                    View High-Intent Leads
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-blue-100">
                                <Brain className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-blue-900">Lead Velocity Improvement</div>
                                <div className="text-sm text-blue-800 mt-1">
                                    AI analysis suggests implementing automated follow-up sequences for 48-hour inactive leads. Expected conversion increase: 23%.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-orange-200">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-orange-100">
                                <Phone className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-orange-900">Outbound AI Agent Recommendation</div>
                                <div className="text-sm text-orange-800 mt-1">
                                    12 qualified leads haven't been contacted in 72+ hours. AI Agent can re-engage them with personalized outreach. Estimated success rate: 34%.
                                </div>
                                <Link href="/sales/campaigns">
                                    <Button size="sm" variant="outline" className="mt-3">
                                        Launch AI Campaign
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs for Different Views */}
            <Tabs defaultValue="recent" className="mt-6">
                <TabsList>
                    <TabsTrigger value="recent">Recent Leads</TabsTrigger>
                    <TabsTrigger value="highscore">High Score</TabsTrigger>
                    <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
                </TabsList>

                <TabsContent value="recent">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Recent High-Priority Leads</CardTitle>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search leads..." className="pl-10 w-64" />
                                    </div>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-32">
                                            <Filter className="h-4 w-4 mr-2" />
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Sources</SelectItem>
                                            <SelectItem value="ivr">IVR Only</SelectItem>
                                            <SelectItem value="web">Web Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentLeads.map((lead) => (
                                    <Link key={lead.id} href={`/leads/${lead.id}`}>
                                        <div className="flex items-center justify-between p-4 border border-adsilo-border rounded-lg hover:border-adsilo-primary transition-colors cursor-pointer">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                                    {lead.source === 'IVR' ?
                                                        <Phone className="h-6 w-6 text-blue-600" /> :
                                                        <Mail className="h-6 w-6 text-blue-600" />
                                                    }
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{lead.name}</div>
                                                        <Badge variant="outline" className="text-xs">{lead.id}</Badge>
                                                    </div>
                                                    <div className="text-sm text-adsilo-text-muted mt-1">
                                                        Contact: {lead.contact} • Assigned to: {lead.assignedTo}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className={`text-sm font-semibold px-3 py-1 rounded-full ${getScoreColor(lead.score)}`}>
                                                        Score: {lead.score}
                                                    </div>
                                                    <div className="text-xs text-adsilo-text-muted mt-1">{lead.status}</div>
                                                </div>
                                                <Badge className={getUrgencyColor(lead.urgency)}>
                                                    {lead.urgency}
                                                </Badge>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="highscore">
                    <Card>
                        <CardHeader>
                            <CardTitle>High-Score Leads (80+)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12 text-adsilo-text-muted">
                                <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>Filtered view for leads scoring 80 or above</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="unassigned">
                    <Card>
                        <CardHeader>
                            <CardTitle>Unassigned Leads</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12 text-adsilo-text-muted">
                                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>Leads waiting for agent assignment</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Link href="/sales/agent-console">
                    <Card className="hover:border-adsilo-primary transition-colors cursor-pointer">
                        <CardContent className="pt-6">
                            <Users className="h-8 w-8 text-adsilo-primary mb-3" />
                            <div className="font-semibold">Agent Console</div>
                            <div className="text-sm text-adsilo-text-muted mt-1">
                                Access sales agent workspace
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/sales/campaigns">
                    <Card className="hover:border-adsilo-primary transition-colors cursor-pointer">
                        <CardContent className="pt-6">
                            <Phone className="h-8 w-8 text-adsilo-primary mb-3" />
                            <div className="font-semibold">AI Campaigns</div>
                            <div className="text-sm text-adsilo-text-muted mt-1">
                                Manage outbound AI agent calls
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/reports/c-level">
                    <Card className="hover:border-adsilo-primary transition-colors cursor-pointer">
                        <CardContent className="pt-6">
                            <TrendingUp className="h-8 w-8 text-adsilo-primary mb-3" />
                            <div className="font-semibold">C-Level Reports</div>
                            <div className="text-sm text-adsilo-text-muted mt-1">
                                Strategic analytics dashboard
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </AppLayout>
    );
};

export default LeadsDashboard;
