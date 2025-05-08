import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'preferences',
    title: 'Communication Preferences',
    description: 'Set up your client communication preferences',
    options: [
      {
        id: 'primaryChannel',
        label: 'Primary Channel',
        type: 'select' as const,
        value: 'email',
        options: [
          { label: 'Email', value: 'email' },
          { label: 'Phone', value: 'phone' },
          { label: 'WhatsApp', value: 'whatsapp' },
          { label: 'Slack', value: 'slack' }
        ],
        description: 'Preferred communication channel'
      },
      {
        id: 'autoResponder',
        label: 'Auto Responder',
        type: 'boolean' as const,
        value: true,
        description: 'Automatically respond to client messages'
      }
    ]
  },
  {
    id: 'scheduling',
    title: 'Meeting Scheduling',
    description: 'Configure meeting and availability settings',
    options: [
      {
        id: 'defaultDuration',
        label: 'Default Meeting Duration',
        type: 'select' as const,
        value: '30',
        options: [
          { label: '15 minutes', value: '15' },
          { label: '30 minutes', value: '30' },
          { label: '45 minutes', value: '45' },
          { label: '60 minutes', value: '60' }
        ],
        description: 'Default duration for client meetings'
      },
      {
        id: 'bufferTime',
        label: 'Buffer Time',
        type: 'number' as const,
        value: 15,
        description: 'Minutes between meetings'
      }
    ]
  },
  {
    id: 'templates',
    title: 'Message Templates',
    description: 'Configure automated message templates',
    options: [
      {
        id: 'followUpTemplate',
        label: 'Follow-up Template',
        type: 'text' as const,
        value: 'Thank you for our meeting today. Here\'s a summary of what we discussed...',
        description: 'Template for follow-up messages'
      },
      {
        id: 'reminderTemplate',
        label: 'Reminder Template',
        type: 'text' as const,
        value: 'This is a friendly reminder about our upcoming meeting...',
        description: 'Template for meeting reminders'
      }
    ]
  }
];

interface CommunicationConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommunicationConfigurator({ open, onOpenChange }: CommunicationConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving communication settings:', values);
    // TODO: Implement settings save logic
    onOpenChange(false);
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