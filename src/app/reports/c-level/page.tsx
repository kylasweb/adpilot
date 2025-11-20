'use client'

import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
    TrendingUp, DollarSign, Users, Target, Clock, Phone,
    Mail, Award, BarChart3, ArrowUpRight, ArrowDownRight
} from "lucide-react";

const CLevelReportsPage = () => {
    const kpis = [
        { label: 'Total Pipeline Value', value: '$8.4M', change: '+28%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
        { label: 'Lead Velocity', value: '12.5 days', change: '-18%', trend: 'up', icon: Clock, color: 'bg-blue-500' },
        { label: 'Conversion Rate', value: '34.2%', change: '+5.8%', trend: 'up', icon: Target, color: 'bg-purple-500' },
        { label: 'Active Leads', value: '1,247', change: '+12%', trend: 'up', icon: Users, color: 'bg-orange-500' },
    ];

    const channelPerformance = [
        { channel: 'IVR (Voice AI)', leads: 542, conversion: 38, value: '$3.2M', roi: 285 },
        { channel: 'Web Forms', leads: 385, conversion: 28, value: '$2.1M', roi: 195 },
        { channel: 'Email Campaigns', leads: 245, conversion: 24, value: '$1.8M', roi: 220 },
        { channel: 'Referrals', leads: 75, conversion: 52, value: '$1.3M', roi: 420 },
    ];

    const salesTeamPerformance = [
        { agent: 'Sarah Chen', leads: 45, qualified: 28, closed: 12, value: '$520K', quota: 95 },
        { agent: 'Mike Johnson', leads: 38, qualified: 24, closed: 10, value: '$445K', quota: 89 },
        { agent: 'Jessica Lee', leads: 42, qualified: 26, closed: 11, value: '$485K', quota: 92 },
        { agent: 'David Park', leads: 35, qualified: 20, closed: 8, value: '$380K', quota: 76 },
    ];

    const leadVelocityData = [
        { stage: 'New → Contacted', avgDays: 1.2, target: 1.0, status: 'warning' },
        { stage: 'Contacted → Qualified', avgDays: 3.5, target: 4.0, status: 'good' },
        { stage: 'Qualified → Proposal', avgDays: 5.8, target: 5.0, status: 'warning' },
        { stage: 'Proposal → Closed', avgDays: 2.0, target: 3.0, status: 'good' },
    ];

    const attributionData = [
        { channel: 'IVR First Touch', percentage: 42, value: '$3.5M' },
        { channel: 'IVR Last Touch', percentage: 38, value: '$3.2M' },
        { channel: 'Email Nurture', percentage: 28, value: '$2.4M' },
        { channel: 'Web Content', percentage: 24, value: '$2.0M' },
    ];

    return (
        <AppLayout>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">C-Level Strategic Reports</h1>
                        <p className="text-adsilo-text-secondary mt-1">Executive sales performance dashboard</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm">
                        Restricted Access
                    </Badge>
                </div>
            </motion.div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {kpis.map((kpi, i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${kpi.color} bg-opacity-10`}>
                                    <kpi.icon className={`h-6 w-6 ${kpi.color.replace('bg-', 'text-')}`} />
                                </div>
                                <span className={`text-sm font-medium flex items-center gap-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {kpi.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                    {kpi.change}
                                </span>
                            </div>
                            <p className="text-sm text-adsilo-text-muted">{kpi.label}</p>
                            <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="channels" className="mt-6">
                <TabsList>
                    <TabsTrigger value="channels">Channel Performance</TabsTrigger>
                    <TabsTrigger value="team">Sales Team</TabsTrigger>
                    <TabsTrigger value="velocity">Lead Velocity</TabsTrigger>
                    <TabsTrigger value="attribution">Attribution</TabsTrigger>
                </TabsList>

                <TabsContent value="channels">
                    <Card>
                        <CardHeader>
                            <CardTitle>Multi-Channel Performance Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {channelPerformance.map((channel, i) => (
                                    <div key={i} className="p-4 border border-adsilo-border rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {channel.channel.includes('IVR') && <Phone className="h-5 w-5 text-blue-600" />}
                                                {channel.channel.includes('Web') && <BarChart3 className="h-5 w-5 text-green-600" />}
                                                {channel.channel.includes('Email') && <Mail className="h-5 w-5 text-purple-600" />}
                                                {channel.channel.includes('Referral') && <Award className="h-5 w-5 text-orange-600" />}
                                                <span className="font-semibold">{channel.channel}</span>
                                            </div>
                                            <Badge variant="outline">ROI: {channel.roi}%</Badge>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4">
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">Total Leads</div>
                                                <div className="text-lg font-semibold">{channel.leads}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">Conversion Rate</div>
                                                <div className="text-lg font-semibold text-green-600">{channel.conversion}%</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">Pipeline Value</div>
                                                <div className="text-lg font-semibold">{channel.value}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">ROI</div>
                                                <div className="text-lg font-semibold text-purple-600">{channel.roi}%</div>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <Progress value={channel.conversion * 2} className="h-2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="team">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Team Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {salesTeamPerformance.map((agent, i) => (
                                    <div key={i} className="p-4 border border-adsilo-border rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <Users className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <span className="font-semibold">{agent.agent}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-adsilo-text-muted">Quota Achievement</div>
                                                <div className={`text-lg font-semibold ${agent.quota >= 90 ? 'text-green-600' : agent.quota >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {agent.quota}%
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 mb-3">
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">Leads</div>
                                                <div className="text-lg font-semibold">{agent.leads}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">Qualified</div>
                                                <div className="text-lg font-semibold">{agent.qualified}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">Closed Won</div>
                                                <div className="text-lg font-semibold text-green-600">{agent.closed}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">Total Value</div>
                                                <div className="text-lg font-semibold">{agent.value}</div>
                                            </div>
                                        </div>

                                        <Progress value={agent.quota} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="velocity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Lead Velocity Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {leadVelocityData.map((stage, i) => (
                                    <div key={i} className="p-4 border border-adsilo-border rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <div className="font-semibold">{stage.stage}</div>
                                                <div className="text-sm text-adsilo-text-muted">Average time in stage</div>
                                            </div>
                                            <Badge className={stage.status === 'good' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                                {stage.status === 'good' ? 'On Target' : 'Needs Attention'}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">Current Average</div>
                                                <div className="text-2xl font-semibold">{stage.avgDays} days</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-adsilo-text-muted">Target</div>
                                                <div className="text-2xl font-semibold text-blue-600">{stage.target} days</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-blue-900">Overall Lead Velocity</div>
                                            <div className="text-sm text-blue-800 mt-1">
                                                Average time from new lead to closed deal: <strong>12.5 days</strong> (Target: 13.0 days)
                                            </div>
                                            <div className="text-sm text-green-600 mt-1 font-medium">
                                                ✓ 18% improvement vs. last quarter
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="attribution">
                    <Card>
                        <CardHeader>
                            <CardTitle>Multi-Touch Attribution Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {attributionData.map((data, i) => (
                                    <div key={i} className="p-4 border border-adsilo-border rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-semibold">{data.channel}</span>
                                            <span className="text-sm text-adsilo-text-muted">{data.value} revenue attributed</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Progress value={data.percentage} className="flex-1 h-3" />
                                            <span className="font-semibold text-lg w-16 text-right">{data.percentage}%</span>
                                        </div>
                                    </div>
                                ))}

                                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mt-4">
                                    <div className="flex items-start gap-3">
                                        <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-purple-900">Key Insight</div>
                                            <div className="text-sm text-purple-800 mt-1">
                                                IVR/Voice AI is the most effective channel, contributing to 42% of first-touch conversions and maintaining 38% attribution at last-touch. This indicates strong performance throughout the customer journey.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </AppLayout>
    );
};

export default CLevelReportsPage;
