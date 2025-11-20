'use client'

import React, { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
    ArrowLeft, Phone, Mail, Building, Calendar, TrendingUp,
    MessageSquare, FileText, Sparkles, Clock, User, Target
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const LeadDetailPage = () => {
    const [callDialogOpen, setCallDialogOpen] = useState(false);

    // Mock lead data
    const lead = {
        id: 'L-001',
        name: 'Acme Corporation',
        contact: 'John Smith',
        email: 'john.smith@acme.com',
        phone: '+1 (555) 123-4567',
        company: 'Acme Corporation',
        title: 'VP of Sales',
        score: 94,
        status: 'QUALIFIED',
        source: 'IVR',
        urgency: 'CRITICAL',
        assignedTo: 'Sarah Chen',
        createdAt: '2024-01-20T10:30:00',
        lastContact: '2024-01-22T14:15:00',
        accountType: 'Enterprise',
        industry: 'Technology',
        companySize: '500-1000',
        estimatedValue: '$85,000',
        nextAction: 'Schedule Demo'
    };

    const scoringFactors = [
        { factor: 'IVR Urgency', score: 95, weight: 30 },
        { factor: 'Account Type', score: 90, weight: 25 },
        { factor: 'Engagement Level', score: 88, weight: 20 },
        { factor: 'Company Size', score: 92, weight: 15 },
        { factor: 'Industry Fit', score: 100, weight: 10 },
    ];

    const ivrTranscripts = [
        {
            id: 'T-001',
            date: '2024-01-22 14:15',
            duration: '8:34',
            sentiment: 'POSITIVE',
            intent: 'Request Demo',
            summary: 'Customer expressed strong interest in enterprise plan. Mentioned current pain points with existing solution.',
            keyPoints: [
                'Budget approved for Q1',
                'Looking to onboard 500+ users',
                'Decision timeline: 2-3 weeks',
                'Comparing with 2 other vendors'
            ]
        },
        {
            id: 'T-002',
            date: '2024-01-20 10:30',
            duration: '12:18',
            sentiment: 'NEUTRAL',
            intent: 'Information Gathering',
            summary: 'Initial inquiry call. Customer researching solutions for sales automation.',
            keyPoints: [
                'Team size: 45 sales reps',
                'Current solution: Outdated CRM',
                'Main concern: Integration with existing tools'
            ]
        }
    ];

    const activities = [
        { type: 'call', action: 'IVR Call Completed', user: 'AI Agent', time: '2 hours ago', details: 'Duration 8:34, Positive sentiment' },
        { type: 'email', action: 'Email Sent', user: 'Sarah Chen', time: '1 day ago', details: 'Enterprise plan overview' },
        { type: 'note', action: 'Note Added', user: 'Sarah Chen', time: '1 day ago', details: 'Follow up on demo scheduling' },
        { type: 'score', action: 'Score Updated', user: 'AI System', time: '2 days ago', details: 'Score increased from 72 to 94' },
    ];

    const handleTriggerAICall = () => {
        toast.success('Outbound AI Agent call scheduled for this lead');
    };

    const handleUpdateScore = () => {
        toast.success('Lead score updated successfully');
    };

    return (
        <AppLayout>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/leads">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Leads
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">{lead.name}</h1>
                        <p className="text-adsilo-text-secondary mt-1">Lead ID: {lead.id}</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-sm px-3 py-1">{lead.urgency}</Badge>
                    <Badge variant="outline" className="text-sm px-3 py-1">{lead.status}</Badge>
                </div>
            </motion.div>

            {/* Lead Score & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-sm text-adsilo-text-muted">Lead Score</div>
                                <div className="text-4xl font-bold text-green-600">{lead.score}/100</div>
                                <div className="text-xs text-green-600 mt-1">High Priority</div>
                            </div>
                            <div className="p-4 rounded-full bg-green-100">
                                <Target className="h-8 w-8 text-green-600" />
                            </div>
                        </div>
                        <Button onClick={handleUpdateScore} variant="outline" size="sm" className="w-full">
                            Manual Override
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-sm text-adsilo-text-muted">Recommended Action</div>
                                <div className="text-xl font-bold mt-2">{lead.nextAction}</div>
                                <div className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" />
                                    AI Suggested
                                </div>
                            </div>
                        </div>
                        <Button className="w-full" size="sm">
                            Execute Action
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-sm text-adsilo-text-muted">Estimated Value</div>
                                <div className="text-2xl font-bold mt-2">{lead.estimatedValue}</div>
                                <div className="text-xs text-adsilo-text-muted mt-1">Pipeline Value</div>
                            </div>
                        </div>
                        <Button onClick={handleTriggerAICall} variant="outline" size="sm" className="w-full">
                            <Phone className="h-4 w-4 mr-2" />
                            Trigger AI Call
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-adsilo-text-muted" />
                                    <div>
                                        <div className="text-sm text-adsilo-text-muted">Contact Person</div>
                                        <div className="font-medium">{lead.contact}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-adsilo-text-muted" />
                                    <div>
                                        <div className="text-sm text-adsilo-text-muted">Email</div>
                                        <div className="font-medium">{lead.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-adsilo-text-muted" />
                                    <div>
                                        <div className="text-sm text-adsilo-text-muted">Phone</div>
                                        <div className="font-medium">{lead.phone}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Building className="h-5 w-5 text-adsilo-text-muted" />
                                    <div>
                                        <div className="text-sm text-adsilo-text-muted">Company</div>
                                        <div className="font-medium">{lead.company}</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs for Details */}
                    <Tabs defaultValue="transcripts">
                        <TabsList>
                            <TabsTrigger value="transcripts">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                IVR Transcripts
                            </TabsTrigger>
                            <TabsTrigger value="activity">
                                <Clock className="h-4 w-4 mr-2" />
                                Activity
                            </TabsTrigger>
                            <TabsTrigger value="notes">
                                <FileText className="h-4 w-4 mr-2" />
                                Notes
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="transcripts">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Call Transcripts & Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {ivrTranscripts.map((transcript) => (
                                        <div key={transcript.id} className="p-4 border border-adsilo-border rounded-lg">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <div className="font-semibold">Call #{transcript.id}</div>
                                                    <div className="text-sm text-adsilo-text-muted">{transcript.date} • {transcript.duration}</div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Badge className={transcript.sentiment === 'POSITIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                                        {transcript.sentiment}
                                                    </Badge>
                                                    <Badge variant="outline">{transcript.intent}</Badge>
                                                </div>
                                            </div>
                                            <p className="text-sm mb-3">{transcript.summary}</p>
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <div className="text-sm font-semibold text-blue-900 mb-2">Key Points:</div>
                                                <ul className="text-sm text-blue-800 space-y-1">
                                                    {transcript.keyPoints.map((point, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-blue-600">•</span>
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="activity">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Activity Timeline</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {activities.map((activity, i) => (
                                            <div key={i} className="flex gap-4 pb-3 border-b border-adsilo-border last:border-0">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                    {activity.type === 'call' && <Phone className="h-5 w-5 text-blue-600" />}
                                                    {activity.type === 'email' && <Mail className="h-5 w-5 text-blue-600" />}
                                                    {activity.type === 'note' && <FileText className="h-5 w-5 text-blue-600" />}
                                                    {activity.type === 'score' && <TrendingUp className="h-5 w-5 text-blue-600" />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">{activity.action}</div>
                                                    <div className="text-sm text-adsilo-text-muted">{activity.user} • {activity.time}</div>
                                                    <div className="text-sm mt-1">{activity.details}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notes">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Internal Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea placeholder="Add notes about this lead..." rows={4} className="mb-3" />
                                    <Button size="sm">Add Note</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Lead Scoring Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5" />
                                Score Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {scoringFactors.map((factor, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-adsilo-text-muted">{factor.factor}</span>
                                        <span className="font-medium">{factor.score}/100</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full"
                                            style={{ width: `${factor.score}%` }}
                                        />
                                    </div>
                                    <div className="text-xs text-adsilo-text-muted mt-1">Weight: {factor.weight}%</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Lead Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Lead Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-adsilo-text-muted">Source</span>
                                <Badge variant="outline">{lead.source}</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-adsilo-text-muted">Account Type</span>
                                <span className="font-medium">{lead.accountType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-adsilo-text-muted">Industry</span>
                                <span className="font-medium">{lead.industry}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-adsilo-text-muted">Company Size</span>
                                <span className="font-medium">{lead.companySize}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-adsilo-text-muted">Assigned To</span>
                                <span className="font-medium">{lead.assignedTo}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-adsilo-text-muted">Created</span>
                                <span className="font-medium">Jan 20, 2024</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Phone className="h-4 w-4 mr-2" />
                                Schedule Call
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Calendar className="h-4 w-4 mr-2" />
                                Book Demo
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" />
                                Send Proposal
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default LeadDetailPage;
