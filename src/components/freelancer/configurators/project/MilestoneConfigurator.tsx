import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'milestoneDefaults',
    title: 'Milestone Defaults',
    description: 'Configure default milestone settings',
    options: [
      {
        id: 'defaultDuration',
        label: 'Default Duration (days)',
        type: 'number',
        value: 14,
        description: 'Default duration for new milestones'
      },
      {
        id: 'autoSchedule',
        label: 'Auto Schedule',
        type: 'boolean',
        value: true,
        description: 'Automatically schedule milestones based on project timeline'
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Milestone Notifications',
    description: 'Configure milestone notification settings',
    options: [
      {
        id: 'enableNotifications',
        label: 'Enable Notifications',
        type: 'boolean',
        value: true,
        description: 'Send notifications for milestone updates'
      },
      {
        id: 'reminderDays',
        label: 'Reminder Days',
        type: 'number',
        value: 3,
        description: 'Days before deadline to send reminder'
      }
    ]
  },
  {
    id: 'templates',
    title: 'Milestone Templates',
    description: 'Configure milestone templates',
    options: [
      {
        id: 'defaultTemplate',
        label: 'Default Template',
        type: 'select',
        value: 'basic',
        options: [
          { label: 'Basic', value: 'basic' },
          { label: 'Detailed', value: 'detailed' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Default template for new milestones'
      },
      {
        id: 'enableCustomTemplates',
        label: 'Enable Custom Templates',
        type: 'boolean',
        value: true,
        description: 'Allow creation of custom milestone templates'
      }
    ]
  },
  {
    id: 'tracking',
    title: 'Progress Tracking',
    description: 'Configure milestone progress tracking',
    options: [
      {
        id: 'trackingMethod',
        label: 'Tracking Method',
        type: 'select',
        value: 'percentage',
        options: [
          { label: 'Percentage', value: 'percentage' },
          { label: 'Status Based', value: 'status' },
          { label: 'Task Completion', value: 'tasks' }
        ],
        description: 'Method for tracking milestone progress'
      },
      {
        id: 'autoUpdateProgress',
        label: 'Auto Update Progress',
        type: 'boolean',
        value: true,
        description: 'Automatically update progress based on tasks'
      }
    ]
  }
];

interface MilestoneConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MilestoneConfigurator({ open, onOpenChange }: MilestoneConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving milestone settings:', values);
    // TODO: Implement settings save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Milestone Settings"
      description="Configure milestone defaults and tracking options"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}