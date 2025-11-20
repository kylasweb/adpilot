import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Subscription } from './types';

interface SubscriptionCardProps {
    subscription: Subscription | null;
    loading: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, loading }) => {
    const getPlanBadge = (plan: string) => {
        const variants: Record<string, string> = {
            FREE: 'bg-gray-100 text-gray-800',
            STARTER: 'bg-blue-100 text-blue-800',
            PROFESSIONAL: 'bg-purple-100 text-purple-800',
            ENTERPRISE: 'bg-orange-100 text-orange-800'
        };
        return <Badge className={variants[plan] || variants.FREE}>{plan}</Badge>;
    };

    const getStatusBadge = (status: string) => {
        const config: Record<string, { color: string; icon: any }> = {
            ACTIVE: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
            CANCELED: { color: 'bg-red-100 text-red-800', icon: XCircle },
            PAST_DUE: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
            TRIALING: { color: 'bg-blue-100 text-blue-800', icon: Calendar }
        };
        const { color, icon: Icon } = config[status] || config.ACTIVE;
        return (
            <Badge className={color}>
                <Icon className="h-3 w-3 mr-1" />
                {status}
            </Badge>
        );
    };

    const getPlanPrice = (plan: string) => {
        const prices: Record<string, string> = {
            FREE: '$0',
            STARTER: '$29',
            PROFESSIONAL: '$99',
            ENTERPRISE: 'Custom'
        };
        return prices[plan] || '$0';
    };

    if (loading) {
        return (
            <Card className="border-adsilo-border">
                <CardHeader>
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    const plan = subscription?.plan || 'FREE';
    const status = subscription?.status || 'ACTIVE';

    return (
        <Card className="border-adsilo-border">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Current Subscription
                    </CardTitle>
                    {getPlanBadge(plan)}
                </div>
                <CardDescription>Your current plan and billing information</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Plan Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm text-adsilo-text-muted">Plan</div>
                            <div className="text-2xl font-bold">{plan}</div>
                            <div className="text-sm text-adsilo-text-muted mt-1">
                                {getPlanPrice(plan)}/month
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-adsilo-text-muted">Status</div>
                            <div className="mt-2">{getStatusBadge(status)}</div>
                        </div>
                    </div>

                    {/* Billing Period */}
                    {subscription && (
                        <div className="border-t border-adsilo-border pt-4">
                            <div className="text-sm text-adsilo-text-muted mb-2">Billing Period</div>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-adsilo-text-muted" />
                                <span>
                                    {new Date(subscription.currentPeriodStart).toLocaleDateString()} -{' '}
                                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                                </span>
                            </div>
                            {subscription.cancelAtPeriodEnd && (
                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-yellow-800">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>Subscription will cancel at period end</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-adsilo-border">
                        {plan === 'FREE' ? (
                            <Button className="w-full">Upgrade Plan</Button>
                        ) : (
                            <>
                                <Button variant="outline" className="flex-1">Change Plan</Button>
                                <Button variant="outline" className="flex-1">Cancel Subscription</Button>
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SubscriptionCard;
