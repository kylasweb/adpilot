import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Basic client management settings',
    options: [
      {
        id: 'autoSync',
        label: 'Auto Sync',
        type: 'boolean' as const,
        value: true,
        description: 'Automatically sync client data with cloud storage'
      },
      {
        id: 'defaultCurrency',
        label: 'Default Currency',
        type: 'select' as const,
        value: 'USD',
        options: [
          { label: 'USD ($)', value: 'USD' },
          { label: 'EUR (€)', value: 'EUR' },
          { label: 'GBP (£)', value: 'GBP' }
        ],
        description: 'Default currency for client billing'
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    description: 'Configure client-related notifications',
    options: [
      {
        id: 'emailNotifications',
        label: 'Email Notifications',
        type: 'boolean' as const,
        value: true,
        description: 'Receive email notifications for client updates'
      },
      {
        id: 'reminderDays',
        label: 'Payment Reminder Days',
        type: 'number' as const,
        value: 7,
        description: 'Days before payment due to send reminder'
      }
    ]
  }
];

interface ClientSettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientSettingsConfigurator({ open, onOpenChange }: ClientSettingsConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving client settings:', values);
    // TODO: Implement settings save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Client Settings"
      description="Configure your client management preferences"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}