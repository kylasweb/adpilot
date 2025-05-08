import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'channels',
    title: 'Communication Channels',
    description: 'Configure preferred communication methods',
    options: [
      {
        id: 'primaryChannel',
        label: 'Primary Channel',
        type: 'select',
        value: 'email',
        options: [
          { label: 'Email', value: 'email' },
          { label: 'SMS', value: 'sms' },
          { label: 'WhatsApp', value: 'whatsapp' },
          { label: 'Slack', value: 'slack' },
          { label: 'Client Portal', value: 'portal' }
        ],
        description: 'Primary method of communication'
      },
      {
        id: 'enabledChannels',
        label: 'Enabled Channels',
        type: 'select',
        value: ['email', 'portal'],
        multiple: true,
        options: [
          { label: 'Email', value: 'email' },
          { label: 'SMS', value: 'sms' },
          { label: 'WhatsApp', value: 'whatsapp' },
          { label: 'Slack', value: 'slack' },
          { label: 'Client Portal', value: 'portal' }
        ],
        description: 'All enabled communication channels'
      },
      {
        id: 'urgentChannel',
        label: 'Urgent Communications',
        type: 'select',
        value: 'sms',
        options: [
          { label: 'Email', value: 'email' },
          { label: 'SMS', value: 'sms' },
          { label: 'WhatsApp', value: 'whatsapp' },
          { label: 'Phone Call', value: 'phone' }
        ],
        description: 'Channel for urgent messages'
      }
    ]
  },
  {
    id: 'schedule',
    title: 'Communication Schedule',
    description: 'Configure timing preferences',
    options: [
      {
        id: 'businessHours',
        label: 'Business Hours',
        type: 'select',
        value: '9-17',
        options: [
          { label: '9 AM - 5 PM', value: '9-17' },
          { label: '8 AM - 6 PM', value: '8-18' },
          { label: '24/7', value: '24-7' }
        ],
        description: 'Hours during which to send communications'
      },
      {
        id: 'timezone',
        label: 'Client Timezone',
        type: 'select',
        value: 'UTC',
        options: [
          { label: 'UTC', value: 'UTC' },
          { label: 'EST (UTC-5)', value: 'EST' },
          { label: 'PST (UTC-8)', value: 'PST' },
          { label: 'IST (UTC+5:30)', value: 'IST' },
          { label: 'GMT (UTC+0)', value: 'GMT' }
        ],
        description: 'Timezone for scheduling communications'
      },
      {
        id: 'reminderDays',
        label: 'Reminder Days Before',
        type: 'number',
        value: 3,
        min: 1,
        max: 14,
        description: 'Days before deadline to send reminders'
      }
    ]
  },
  {
    id: 'templates',
    title: 'Message Templates',
    description: 'Configure communication templates',
    options: [
      {
        id: 'defaultGreeting',
        label: 'Default Greeting',
        type: 'select',
        value: 'formal',
        options: [
          { label: 'Formal', value: 'formal' },
          { label: 'Casual', value: 'casual' },
          { label: 'Friendly', value: 'friendly' }
        ],
        description: 'Default greeting style for messages'
      },
      {
        id: 'enabledTemplates',
        label: 'Enabled Templates',
        type: 'select',
        value: ['welcome', 'invoice', 'reminder'],
        multiple: true,
        options: [
          { label: 'Welcome Message', value: 'welcome' },
          { label: 'Invoice Notice', value: 'invoice' },
          { label: 'Payment Reminder', value: 'reminder' },
          { label: 'Project Update', value: 'update' },
          { label: 'Meeting Request', value: 'meeting' },
          { label: 'Thank You Note', value: 'thanks' }
        ],
        description: 'Message templates to enable'
      },
      {
        id: 'signatureStyle',
        label: 'Email Signature',
        type: 'select',
        value: 'professional',
        options: [
          { label: 'Professional', value: 'professional' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Detailed', value: 'detailed' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Style of email signature'
      }
    ]
  }
];

interface CommunicationConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function CommunicationConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: CommunicationConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving communication settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Communication Settings"
      description="Configure client communication preferences"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}