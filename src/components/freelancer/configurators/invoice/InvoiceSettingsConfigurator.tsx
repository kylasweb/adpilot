import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Configure basic invoice settings',
    options: [
      {
        id: 'invoicePrefix',
        label: 'Invoice Number Prefix',
        type: 'text',
        value: 'INV-',
        description: 'Prefix for invoice numbers'
      },
      {
        id: 'nextInvoiceNumber',
        label: 'Next Invoice Number',
        type: 'number',
        value: 1001,
        min: 1,
        description: 'Starting number for next invoice'
      },
      {
        id: 'defaultDueDays',
        label: 'Default Due Days',
        type: 'number',
        value: 30,
        min: 1,
        max: 90,
        description: 'Default number of days until payment is due'
      }
    ]
  },
  {
    id: 'defaults',
    title: 'Default Values',
    description: 'Configure default invoice values',
    options: [
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
        description: 'Default currency for new invoices'
      },
      {
        id: 'defaultTaxRate',
        label: 'Default Tax Rate (%)',
        type: 'number',
        value: 0,
        min: 0,
        max: 100,
        description: 'Default tax rate for new items'
      },
      {
        id: 'defaultNotes',
        label: 'Default Notes',
        type: 'text',
        value: 'Thank you for your business!',
        description: 'Default notes to appear on invoices'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation Settings',
    description: 'Configure invoice automation',
    options: [
      {
        id: 'autoSendInvoices',
        label: 'Auto-send Invoices',
        type: 'boolean',
        value: false,
        description: 'Automatically send invoices when generated'
      },
      {
        id: 'reminderSchedule',
        label: 'Payment Reminders',
        type: 'select',
        value: ['3days', '1day', 'overdue'],
        multiple: true,
        options: [
          { label: '7 Days Before', value: '7days' },
          { label: '3 Days Before', value: '3days' },
          { label: '1 Day Before', value: '1day' },
          { label: 'On Due Date', value: 'due' },
          { label: 'When Overdue', value: 'overdue' }
        ],
        description: 'When to send payment reminders'
      },
      {
        id: 'autoRecurring',
        label: 'Enable Recurring',
        type: 'boolean',
        value: true,
        description: 'Enable recurring invoice generation'
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    description: 'Configure invoice notifications',
    options: [
      {
        id: 'notifyOnView',
        label: 'Notify on View',
        type: 'boolean',
        value: true,
        description: 'Get notified when client views invoice'
      },
      {
        id: 'notifyOnPayment',
        label: 'Notify on Payment',
        type: 'boolean',
        value: true,
        description: 'Get notified when payment is received'
      },
      {
        id: 'notificationChannels',
        label: 'Notification Channels',
        type: 'select',
        value: ['email', 'dashboard'],
        multiple: true,
        options: [
          { label: 'Email', value: 'email' },
          { label: 'Dashboard', value: 'dashboard' },
          { label: 'SMS', value: 'sms' },
          { label: 'Slack', value: 'slack' }
        ],
        description: 'Where to send notifications'
      }
    ]
  },
  {
    id: 'integrations',
    title: 'Integration Settings',
    description: 'Configure third-party integrations',
    options: [
      {
        id: 'accountingSoftware',
        label: 'Accounting Software',
        type: 'select',
        value: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'QuickBooks', value: 'quickbooks' },
          { label: 'Xero', value: 'xero' },
          { label: 'FreshBooks', value: 'freshbooks' },
          { label: 'Wave', value: 'wave' }
        ],
        description: 'Integration with accounting software'
      },
      {
        id: 'syncFrequency',
        label: 'Sync Frequency',
        type: 'select',
        value: 'daily',
        options: [
          { label: 'Real-time', value: 'realtime' },
          { label: 'Hourly', value: 'hourly' },
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' }
        ],
        description: 'How often to sync with accounting software'
      }
    ]
  }
];

interface InvoiceSettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function InvoiceSettingsConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: InvoiceSettingsConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving invoice settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Invoice Settings"
      description="Configure general invoice settings and defaults"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}