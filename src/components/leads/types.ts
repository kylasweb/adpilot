export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    score: number;
    status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';
    assignedTo?: string;
    source: 'IVR' | 'WEB' | 'EMAIL' | 'REFERRAL' | 'OTHER';
    urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    accountType?: string;
    lastContact?: string;
    nextAction?: string;
    createdAt: string;
    updatedAt: string;
    fairGoMemory?: Record<string, any>;
    ivrTranscripts?: IVRTranscript[];
}

export interface IVRTranscript {
    id: string;
    leadId: string;
    callDate: string;
    duration: number;
    transcript: string;
    sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
    intent: string;
    entities: Record<string, any>;
}

export interface Campaign {
    id: string;
    name: string;
    type: 'OUTBOUND_VOICE' | 'EMAIL' | 'SMS';
    status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
    targetSegment: string;
    successRate: number;
    totalContacts: number;
    successfulContacts: number;
    createdAt: string;
    createdBy: string;
}

export interface LeadScore {
    leadId: string;
    score: number;
    factors: {
        ivrUrgency: number;
        accountType: number;
        engagement: number;
        companySize: number;
        industry: number;
    };
    confidence: number;
    lastUpdated: string;
}
