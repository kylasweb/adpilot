import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'templates',
    title: 'Milestone Templates',
    description: 'Configure milestone templates and defaults',
    options: [
      {
        id: 'defaultMilestones',
        label: 'Default Milestones',
        type: 'select',
        value: ['planning', 'delivery', 'review'],
        multiple: true,
        options: [
          { label: 'Project Planning', value: 'planning' },
          { label: 'Design Approval', value: 'design' },
          { label: 'Development Start', value: 'development' },
          { label: 'Testing Complete', value: 'testing' },
          { label: 'Initial Delivery', value: 'delivery' },
          { label: 'Client Review', value: 'review' },
          { label: 'Project Completion', value: 'completion' }
        ],
        description: 'Default project milestones'
      },
      {
        id: 'templateType',
        label: 'Template Type',
        type: 'select',
        value: 'standard',
        options: [
          { label: 'Standard', value: 'standard' },
          { label: 'Agile', value: 'agile' },
          { label: 'Waterfall', value: 'waterfall' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Type of milestone template'
      },
      {
        id: 'customMilestones',
        label: 'Allow Custom Milestones',
        type: 'boolean',
        value: true,
        description: 'Enable custom milestone creation'
      }
    ]
  },
  {
    id: 'scheduling',
    title: 'Scheduling Settings',
    description: 'Configure milestone scheduling options',
    options: [
      {
        id: 'autoScheduling',
        label: 'Auto Scheduling',
        type: 'boolean',
        value: true,
        description: 'Automatically schedule milestone dates'
      },
      {
        id: 'defaultDuration',
        label: 'Default Duration (days)',
        type: 'number',
        value: 14,
        min: 1,
        max: 90,
        description: 'Default duration between milestones'
      },
      {
        id: 'dependencyTypes',
        label: 'Dependency Types',
        type: 'select',
        value: ['start-start', 'finish-start'],
        multiple: true,
        options: [
          { label: 'Start to Start', value: 'start-start' },
          { label: 'Start to Finish', value: 'start-finish' },
          { label: 'Finish to Start', value: 'finish-start' },
          { label: 'Finish to Finish', value: 'finish-finish' }
        ],
        description: 'Allowed milestone dependencies'
      }
    ]
  },
  {
    id: 'tracking',
    title: 'Tracking Settings',
    description: 'Configure milestone tracking options',
    options: [
      {
        id: 'progressTracking',
        label: 'Progress Tracking',
        type: 'select',
        value: 'percentage',
        options: [
          { label: 'Percentage', value: 'percentage' },
          { label: 'Status Based', value: 'status' },
          { label: 'Task Based', value: 'tasks' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'How to track milestone progress'
      },
      {
        id: 'defaultStatuses',
        label: 'Default Statuses',
        type: 'select',
        value: ['planned', 'inprogress', 'completed'],
        multiple: true,
        options: [
          { label: 'Planned', value: 'planned' },
          { label: 'In Progress', value: 'inprogress' },
          { label: 'On Hold', value: 'hold' },
          { label: 'Completed', value: 'completed' },
          { label: 'Delayed', value: 'delayed' }
        ],
        description: 'Available milestone statuses'
      },
      {
        id: 'reminderSettings',
        label: 'Reminder Settings',
        type: 'select',
        value: ['1week', '1day'],
        multiple: true,
        options: [
          { label: '1 Week Before', value: '1week' },
          { label: '3 Days Before', value: '3days' },
          { label: '1 Day Before', value: '1day' },
          { label: 'On Due Date', value: 'duedate' }
        ],
        description: 'When to send milestone reminders'
      }
    ]
  },
  {
    id: 'payment',
    title: 'Payment Settings',
    description: 'Configure milestone payment settings',
    options: [
      {
        id: 'paymentMilestones',
        label: 'Enable Payment Milestones',
        type: 'boolean',
        value: true,
        description: 'Link payments to milestones'
      },
      {
        id: 'defaultPaymentTerms',
        label: 'Default Payment Terms',
        type: 'select',
        value: 'completion',
        options: [
          { label: 'On Start', value: 'start' },
          { label: 'On Completion', value: 'completion' },
          { label: 'Split Payment', value: 'split' },
          { label: 'Custom Schedule', value: 'custom' }
        ],
        description: 'When payments are due'
      },
      {
        id: 'invoiceGeneration',
        label: 'Auto Generate Invoices',
        type: 'boolean',
        value: true,
        description: 'Automatically generate milestone invoices'
      }
    ]
  }
];

interface MilestoneConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function MilestoneConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: MilestoneConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving milestone settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Milestone Settings"
      description="Configure project milestone templates and settings"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}