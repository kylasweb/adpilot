import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Basic invoice configuration options',
    options: [
      {
        id: 'numberingPrefix',
        label: 'Invoice Number Prefix',
        type: 'text',
        value: 'INV-',
        description: 'Prefix for invoice numbers'
      },
      {
        id: 'startingNumber',
        label: 'Starting Number',
        type: 'number',
        value: 1000,
        description: 'Starting number for invoice sequence'
      },
      {
        id: 'defaultCurrency',
        label: 'Default Currency',
        type: 'select',
        value: 'USD',
        options: [
          { label: 'USD ($)', value: 'USD' },
          { label: 'EUR (€)', value: 'EUR' },
          { label: 'GBP (£)', value: 'GBP' }
        ],
        description: 'Default currency for invoices'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation Settings',
    description: 'Configure automated invoice processes',
    options: [
      {
        id: 'autoNumbering',
        label: 'Auto Numbering',
        type: 'boolean',
        value: true,
        description: 'Automatically generate invoice numbers'
      },
      {
        id: 'autoDueDateDays',
        label: 'Auto Due Date',
        type: 'number',
        value: 30,
        description: 'Days to add to invoice date for due date'
      },
      {
        id: 'autoSendEmail',
        label: 'Auto Send Email',
        type: 'boolean',
        value: false,
        description: 'Automatically email invoices when created'
      }
    ]
  },
  {
    id: 'defaults',
    title: 'Default Values',
    description: 'Set default values for new invoices',
    options: [
      {
        id: 'defaultNotes',
        label: 'Default Notes',
        type: 'text',
        value: 'Thank you for your business',
        description: 'Default notes to appear on invoices'
      },
      {
        id: 'defaultTerms',
        label: 'Default Terms',
        type: 'text',
        value: 'Net 30',
        description: 'Default payment terms'
      }
    ]
  }
];

interface InvoiceSettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceSettingsConfigurator({ open, onOpenChange }: InvoiceSettingsConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving invoice settings:', values);
    // TODO: Implement settings save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Invoice Settings"
      description="Configure your invoice generation preferences"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}