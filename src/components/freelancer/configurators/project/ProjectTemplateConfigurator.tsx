import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'templates',
    title: 'Project Templates',
    description: 'Configure default project templates',
    options: [
      {
        id: 'defaultTemplate',
        label: 'Default Template',
        type: 'select',
        value: 'basic',
        options: [
          { label: 'Basic Project', value: 'basic' },
          { label: 'Agile Sprint', value: 'agile' },
          { label: 'Waterfall', value: 'waterfall' }
        ],
        description: 'Default template for new projects'
      },
      {
        id: 'autoApplyTemplate',
        label: 'Auto Apply Template',
        type: 'boolean',
        value: true,
        description: 'Automatically apply template to new projects'
      }
    ]
  },
  {
    id: 'defaults',
    title: 'Default Settings',
    description: 'Set default values for new projects',
    options: [
      {
        id: 'defaultDuration',
        label: 'Default Duration (days)',
        type: 'number',
        value: 30,
        description: 'Default project duration in days'
      },
      {
        id: 'defaultStatus',
        label: 'Initial Status',
        type: 'select',
        value: 'planning',
        options: [
          { label: 'Planning', value: 'planning' },
          { label: 'In Progress', value: 'in-progress' },
          { label: 'On Hold', value: 'on-hold' }
        ],
        description: 'Default status for new projects'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation Settings',
    description: 'Configure project automation settings',
    options: [
      {
        id: 'autoCreateMilestones',
        label: 'Auto Create Milestones',
        type: 'boolean',
        value: true,
        description: 'Automatically create default milestones'
      },
      {
        id: 'autoAssignTeam',
        label: 'Auto Assign Team',
        type: 'boolean',
        value: false,
        description: 'Automatically assign default team members'
      }
    ]
  }
];

interface ProjectTemplateConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectTemplateConfigurator({ open, onOpenChange }: ProjectTemplateConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving project template settings:', values);
    // TODO: Implement settings save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Project Templates"
      description="Configure your project templates and defaults"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}