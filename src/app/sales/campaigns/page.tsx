'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
    Phone, Plus, Play, Pause, TrendingUp, Users, Clock,
    Sparkles, Brain, Target, CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const SalesCampaignsPage = () => {
    const [showCreateDialog, setShow CreateDialog] = useState(false);

    const stats = [
        { label: 'Active Campaigns', value: '5', icon: Play, color: 'bg-green-500' },
        { label: 'Total Calls Made', value: '1,247', icon: Phone, color: 'bg-blue-500' },
        { label: 'Success Rate', value: '34%', icon: Target, color: 'bg-purple-500' },
        { label: 'Leads Converted', value: '423', icon: CheckCircle, color: 'bg-orange-500' },
    ];

    const campaigns = [
        {
            id: 'C-001',
            name: 'Enterprise Reactivation Campaign',
            type: 'OUTBOUND_VOICE',
            status: 'ACTIVE',
            targetSegment: 'Inactive Enterprise Leads (Score 70+)',
            totalContacts: 150,
            completed: 89,
            successful: 34,
            successRate: 38,
            avgCallDuration: '4:32',
            createdAt: '2024-01-15',
            createdBy: 'Sarah Chen'
        },
        {
            id: 'C-002',
            name: 'High-Intent Follow-up',
            type: 'OUTBOUND_VOICE',
            status: 'ACTIVE',
            targetSegment: 'Web Visitors with 3+ Page Views',
            totalContacts: 85,
            completed: 45,
            successful: 18,
            successRate: 40,
            avgCallDuration: '5:15',
            createdAt: '2024-01-18',
            createdBy: 'Mike Johnson'
        },
        {
            id: 'C-003',
            name: 'Product Demo Scheduler',
            type: 'OUTBOUND_VOICE',
            status: 'PAUSED',
            targetSegment: 'Qualified Leads - No Demo Scheduled',
            totalContacts: 120,
            completed: 56,
            successful: 22,
            successRate: 39,
            avgCallDuration: '3:48',
            createdAt: '2024-01-12',
            createdBy: 'Sarah Chen'
        },
    ];

    const handleCreateCampaign = () => {
        toast.success('AI Campaign created and launched successfully!');
        setShowCreateDialog(false);
    };

    const handlePauseCampaign = (id: string) => {
        toast.success(`Campaign ${id} paused`);
    };

    const handleResumeCampaign = (id: string) => {
        toast.success(`Campaign ${id} resumed`);
    };

    return (
        <AppLayout>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">AI Voice Agent Campaigns</h1>
                        <p className="text-adsilo-text-secondary mt-1">Manage outbound AI agent call campaigns</p>
                    </div>
                    <Button onClick={() => setShowCreateDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Campaign
                    </Button>
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
                            </div>
                            <p className="text-sm text-adsilo-text-muted">{stat.label}</p>
                            <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* AI Optimization Card */}
            <Card className="mt-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        AI Campaign Optimization
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-green-100">
                                <Brain className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-green-900">Recommended Campaign</div>
                                <div className="text-sm text-green-800 mt-1">
                                    AI suggests creating a campaign targeting 47 leads who viewed pricing page 3+ times but didn't schedule a demo. Predicted success rate: 42%.
                                </div>
                                <Button size="sm" variant="outline" className="mt-3">
                                    Auto-Create Campaign
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-blue-100">
                                <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-blue-900">Optimal Call Times</div>
                                <div className="text-sm text-blue-800 mt-1">
                                    Based on historical data, Tuesday and Wednesday 10 AM - 2 PM show 28% higher answer rates for your target segment.
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Campaigns List */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Campaign Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="p-4 border border-adsilo-border rounded-lg hover:border-adsilo-primary transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="font-semibold text-lg">{campaign.name}</div>
                                            <Badge variant="outline">{campaign.id}</Badge>
                                            <Badge className={
                                                campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                                    campaign.status === 'PAUSED' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }>
                                                {campaign.status}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-adsilo-text-muted">
                                            Target: {campaign.targetSegment}
                                        </div>
                                        <div className="text-xs text-adsilo-text-muted mt-1">
                                            Created {campaign.createdAt} by {campaign.createdBy}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {campaign.status === 'ACTIVE' ? (
                                            <Button variant="outline" size="sm" onClick={() => handlePauseCampaign(campaign.id)}>
                                                <Pause className="h-4 w-4 mr-2" />
                                                Pause
                                            </Button>
                                        ) : (
                                            <Button size="sm" onClick={() => handleResumeCampaign(campaign.id)}>
                                                <Play className="h-4 w-4 mr-2" />
                                                Resume
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                                    <div>
                                        <div className="text-xs text-adsilo-text-muted">Total Contacts</div>
                                        <div className="text-lg font-semibold">{campaign.totalContacts}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-adsilo-text-muted">Completed</div>
                                        <div className="text-lg font-semibold">{campaign.completed}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-adsilo-text-muted">Successful</div>
                                        <div className="text-lg font-semibold text-green-600">{campaign.successful}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-adsilo-text-muted">Success Rate</div>
                                        <div className="text-lg font-semibold">{campaign.successRate}%</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-adsilo-text-muted">Avg Duration</div>
                                        <div className="text-lg font-semibold">{campaign.avgCallDuration}</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-adsilo-text-muted mb-2">
                                        <span>Progress</span>
                                        <span>{Math.round((campaign.completed / campaign.totalContacts) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full transition-all"
                                            style={{ width: `${(campaign.completed / campaign.totalContacts) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Create Campaign Dialog */}
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create AI Voice Agent Campaign</DialogTitle>
                        <DialogDescription>
                            Launch an automated outbound calling campaign with AI agents
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label>Campaign Name *</Label>
                            <Input placeholder="e.g., Q1 Enterprise Outreach" className="mt-2" />
                        </div>

                        <div>
                            <Label>Target Segment *</Label>
                            <Select defaultValue="custom">
                                <SelectTrigger className="mt-2">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high-score">High Score Leads (80+)</SelectItem>
                                    <SelectItem value="inactive">Inactive Leads (30+ days)</SelectItem>
                                    <SelectItem value="web-visitors">High-Intent Web Visitors</SelectItem>
                                    <SelectItem value="no-demo">Qualified - No Demo Scheduled</SelectItem>
                                    <SelectItem value="custom">Custom Segment</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Max Contacts per Day</Label>
                                <Input type="number" defaultValue="50" className="mt-2" />
                            </div>
                            <div>
                                <Label>Priority</Label>
                                <Select defaultValue="medium">
                                    <SelectTrigger className="mt-2">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label>Campaign Goal</Label>
                            <Select defaultValue="demo">
                                <SelectTrigger className="mt-2">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="demo">Schedule Demo</SelectItem>
                                    <SelectItem value="qualify">Qualify Lead</SelectItem>
                                    <SelectItem value="followup">Follow-up</SelectItem>
                                    <SelectItem value="reactivate">Reactivate</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>AI Script Instructions (Optional)</Label>
                            <Textarea
                                placeholder="Provide specific talking points or context for the AI agent..."
                                rows={3}
                                className="mt-2"
                            />
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start gap-3">
                                <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div className="flex-1 text-sm">
                                    <div className="font-semibold text-blue-900">AI Prediction</div>
                                    <div className="text-blue-800 mt-1">
                                        Based on similar campaigns, expected success rate: <strong>36-42%</strong>. Estimated conversions: <strong>18-21 leads</strong> from 50 contacts.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateCampaign}>
                            <Play className="h-4 w-4 mr-2" />
                            Launch Campaign
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
};

export default SalesCampaignsPage;
