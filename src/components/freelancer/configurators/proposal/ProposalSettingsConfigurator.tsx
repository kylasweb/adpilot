import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorProps, ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Configure general proposal settings',
    options: [
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
        description: 'Select default currency for proposals'
      },
      {
        id: 'validityPeriod',
        label: 'Default Validity Period (days)',
        type: 'number',
        value: 30,
        description: 'Number of days the proposal remains valid'
      }
    ]
  },
  {
    id: 'defaults',
    title: 'Default Content',
    description: 'Set default content and terms',
    options: [
      {
        id: 'defaultTerms',
        label: 'Default Terms & Conditions',
        type: 'text',
        value: 'Standard terms and conditions apply',
        description: 'Default terms to include in proposals'
      },
      {
        id: 'defaultFooter',
        label: 'Default Footer Text',
        type: 'text',
        value: 'Thank you for your consideration',
        description: 'Footer text to appear on all proposals'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation Settings',
    description: 'Configure automated behaviors',
    options: [
      {
        id: 'autoFollowUp',
        label: 'Automatic Follow-up',
        type: 'boolean',
        value: true,
        description: 'Send automatic follow-up emails'
      },
      {
        id: 'followUpDays',
        label: 'Follow-up Days',
        type: 'number',
        value: 5,
        description: 'Days to wait before sending follow-up'
      },
      {
        id: 'autoExpireProposals',
        label: 'Auto-expire Proposals',
        type: 'boolean',
        value: true,
        description: 'Automatically mark proposals as expired'
      }
    ]
  }
];

export function ProposalSettingsConfigurator({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  initialValues
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & ConfiguratorProps) {
  return (
    <BaseConfiguratorDialog
      title="Proposal Settings"
      description="Configure your default proposal settings and automation preferences"
      open={open}
      onOpenChange={onOpenChange}
      sections={sections}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}