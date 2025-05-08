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
        type: 'boolean',
        value: true,
        description: 'Automatically sync client data with cloud storage'
      },
      {
        id: 'defaultCurrency',
        label: 'Default Currency',
        type: 'select',
        value: 'USD',
        options: [
          { label: 'USD ($)', value: 'USD' },
          { label: 'EUR (€)', value: 'EUR' },
          { label: 'GBP (£)', value: 'GBP' },
          { label: 'INR (₹)', value: 'INR' },
          { label: 'AUD ($)', value: 'AUD' }
        ],
        description: 'Default currency for client billing'
      },
      {
        id: 'defaultPaymentTerms',
        label: 'Default Payment Terms',
        type: 'select',
        value: 'net30',
        options: [
          { label: 'Due on Receipt', value: 'due' },
          { label: 'Net 15', value: 'net15' },
          { label: 'Net 30', value: 'net30' },
          { label: 'Net 45', value: 'net45' },
          { label: 'Net 60', value: 'net60' }
        ],
        description: 'Default payment terms for new clients'
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
        type: 'boolean',
        value: true,
        description: 'Receive email notifications for client updates'
      },
      {
        id: 'reminderDays',
        label: 'Payment Reminder Days',
        type: 'number',
        value: 7,
        min: 1,
        max: 30,
        description: 'Days before payment due to send reminder'
      },
      {
        id: 'notificationTypes',
        label: 'Notification Types',
        type: 'select',
        value: ['payment', 'project'],
        multiple: true,
        options: [
          { label: 'Payment Updates', value: 'payment' },
          { label: 'Project Updates', value: 'project' },
          { label: 'Document Updates', value: 'document' },
          { label: 'Comment Updates', value: 'comment' }
        ],
        description: 'Types of notifications to receive'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation Settings',
    description: 'Configure automated client interactions',
    options: [
      {
        id: 'autoReminders',
        label: 'Automated Reminders',
        type: 'boolean',
        value: true,
        description: 'Send automated payment reminders'
      },
      {
        id: 'autoReports',
        label: 'Automated Reports',
        type: 'select',
        value: 'weekly',
        options: [
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Never', value: 'never' }
        ],
        description: 'Frequency of automated client reports'
      }
    ]
  }
];

interface ClientSettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function ClientSettingsConfigurator({ 
  open, 
  onOpenChange,
  onSettingsUpdate 
}: ClientSettingsConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving client settings:', error);
      // TODO: Show error toast
    }
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