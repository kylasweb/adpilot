import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Configure general proposal settings',
    options: [
      {
        id: 'proposalPrefix',
        label: 'Proposal Number Prefix',
        type: 'text',
        value: 'PROP-',
        description: 'Prefix for proposal numbers'
      },
      {
        id: 'validityPeriod',
        label: 'Default Validity (days)',
        type: 'number',
        value: 30,
        min: 1,
        max: 180,
        description: 'Default proposal validity period'
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
        description: 'Default currency for proposals'
      }
    ]
  },
  {
    id: 'workflow',
    title: 'Workflow Settings',
    description: 'Configure proposal workflow',
    options: [
      {
        id: 'approvalWorkflow',
        label: 'Approval Workflow',
        type: 'select',
        value: 'single',
        options: [
          { label: 'Single Level', value: 'single' },
          { label: 'Two Level', value: 'two' },
          { label: 'Custom', value: 'custom' },
          { label: 'None', value: 'none' }
        ],
        description: 'Type of approval workflow'
      },
      {
        id: 'reviewers',
        label: 'Default Reviewers',
        type: 'select',
        value: ['manager', 'finance'],
        multiple: true,
        options: [
          { label: 'Project Manager', value: 'manager' },
          { label: 'Finance Team', value: 'finance' },
          { label: 'Legal Team', value: 'legal' },
          { label: 'Technical Team', value: 'tech' }
        ],
        description: 'Default proposal reviewers'
      },
      {
        id: 'autoExpire',
        label: 'Auto Expire',
        type: 'boolean',
        value: true,
        description: 'Automatically expire proposals'
      }
    ]
  },
  {
    id: 'pricing',
    title: 'Pricing Settings',
    description: 'Configure pricing options',
    options: [
      {
        id: 'pricingModels',
        label: 'Pricing Models',
        type: 'select',
        value: ['fixed', 'hourly', 'milestone'],
        multiple: true,
        options: [
          { label: 'Fixed Price', value: 'fixed' },
          { label: 'Hourly Rate', value: 'hourly' },
          { label: 'Milestone Based', value: 'milestone' },
          { label: 'Value Based', value: 'value' },
          { label: 'Retainer', value: 'retainer' }
        ],
        description: 'Available pricing models'
      },
      {
        id: 'defaultMargin',
        label: 'Default Margin (%)',
        type: 'number',
        value: 20,
        min: 0,
        max: 100,
        description: 'Default profit margin'
      },
      {
        id: 'roundingRule',
        label: 'Price Rounding',
        type: 'select',
        value: 'nearest',
        options: [
          { label: 'Nearest 10', value: 'nearest' },
          { label: 'Round Up', value: 'up' },
          { label: 'Round Down', value: 'down' },
          { label: 'None', value: 'none' }
        ],
        description: 'Price rounding rules'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation Settings',
    description: 'Configure proposal automation',
    options: [
      {
        id: 'autoFollowup',
        label: 'Auto Follow-up',
        type: 'boolean',
        value: true,
        description: 'Send automatic follow-ups'
      },
      {
        id: 'followupSchedule',
        label: 'Follow-up Schedule',
        type: 'select',
        value: ['3days', '1week'],
        multiple: true,
        options: [
          { label: '3 Days After', value: '3days' },
          { label: '1 Week After', value: '1week' },
          { label: '2 Weeks After', value: '2weeks' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'When to send follow-ups'
      },
      {
        id: 'reminderSettings',
        label: 'Reminder Settings',
        type: 'select',
        value: ['expiry', 'pending'],
        multiple: true,
        options: [
          { label: 'Expiry Warning', value: 'expiry' },
          { label: 'Pending Review', value: 'pending' },
          { label: 'Client View', value: 'view' },
          { label: 'Custom Events', value: 'custom' }
        ],
        description: 'Automated reminder types'
      }
    ]
  }
];

interface ProposalSettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function ProposalSettingsConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: ProposalSettingsConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving proposal settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Proposal Settings"
      description="Configure general proposal settings and defaults"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}