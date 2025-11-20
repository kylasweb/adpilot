import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Users, Layers, Image, Loader2 } from "lucide-react";
import { UsageMetrics as UsageMetricsType } from './types';

interface UsageMetricsProps {
    metrics: UsageMetricsType | null;
    loading: boolean;
}

const UsageMetrics: React.FC<UsageMetricsProps> = ({ metrics, loading }) => {
    if (loading) {
        return (
            <Card className="border-adsilo-border">
                <CardHeader>
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-2 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!metrics) {
        return (
            <Card className="border-adsilo-border">
                <CardHeader>
                    <CardTitle>Usage & Limits</CardTitle>
                    <CardDescription>No usage data available</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    const usageItems = [
        {
            label: 'Campaigns',
            icon: Activity,
            current: metrics.usage.campaigns,
            limit: metrics.limits.campaigns,
            color: 'bg-blue-500'
        },
        {
            label: 'Cohorts',
            icon: Users,
            current: metrics.usage.cohorts,
            limit: metrics.limits.cohorts,
            color: 'bg-green-500'
        },
        {
            label: 'Creatives',
            icon: Image,
            current: metrics.usage.creatives,
            limit: metrics.limits.creatives,
            color: 'bg-purple-500'
        },
        {
            label: 'Projects',
            icon: Layers,
            current: metrics.usage.projects,
            limit: metrics.limits.projects,
            color: 'bg-orange-500'
        }
    ];

    const getPercentage = (current: number, limit: number) => {
        if (limit === -1) return 0; // Unlimited
        return Math.min((current / limit) * 100, 100);
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-red-500';
        if (percentage >= 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <Card className="border-adsilo-border">
            <CardHeader>
                <CardTitle>Usage & Limits</CardTitle>
                <CardDescription>
                    Current usage for your <span className="font-semibold">{metrics.plan}</span> plan
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {usageItems.map((item) => {
                        const percentage = getPercentage(item.current, item.limit);
                        const isUnlimited = item.limit === -1;

                        return (
                            <div key={item.label} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
                                            <item.icon className={`h-4 w-4 ${item.color.replace('bg-', 'text-')}`} />
                                        </div>
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    <div className="text-sm text-adsilo-text-muted">
                                        {item.current} / {isUnlimited ? '∞' : item.limit}
                                    </div>
                                </div>

                                {!isUnlimited && (
                                    <div className="space-y-1">
                                        <Progress
                                            value={percentage}
                                            className="h-2"
                                        />
                                        <div className="flex justify-between text-xs text-adsilo-text-muted">
                                            <span>{percentage.toFixed(0)}% used</span>
                                            {percentage >= 90 && (
                                                <span className="text-red-500 font-medium">
                                                    Approaching limit
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {metrics.plan === 'FREE' && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="text-sm text-blue-800">
                                <strong>Upgrade to increase your limits</strong>
                                <p className="mt-1 text-xs">
                                    Get more campaigns, cohorts, and creatives with a paid plan.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default UsageMetrics;
