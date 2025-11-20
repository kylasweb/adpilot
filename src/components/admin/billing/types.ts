export interface Subscription {
    id: string;
    userId: string;
    plan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
    status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING';
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    user?: {
        id: string;
        email: string;
        name: string;
    };
}

export interface Invoice {
    id: string;
    subscriptionId: string;
    amount: number;
    currency: string;
    status: string;
    paidAt?: string;
    invoiceNumber: string;
    invoiceUrl?: string;
    createdAt: string;
}

export interface UsageMetrics {
    usage: {
        campaigns: number;
        cohorts: number;
        creatives: number;
        projects: number;
    };
    limits: {
        campaigns: number;
        cohorts: number;
        creatives: number;
        projects: number;
    };
    plan: string;
}
