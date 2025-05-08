import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'categories',
    title: 'Task Categories',
    description: 'Configure task categories and labels',
    options: [
      {
        id: 'defaultCategory',
        label: 'Default Category',
        type: 'select',
        value: 'development',
        options: [
          { label: 'Development', value: 'development' },
          { label: 'Design', value: 'design' },
          { label: 'Testing', value: 'testing' },
          { label: 'Documentation', value: 'documentation' }
        ],
        description: 'Default category for new tasks'
      },
      {
        id: 'enableCustomCategories',
        label: 'Enable Custom Categories',
        type: 'boolean',
        value: true,
        description: 'Allow creation of custom categories'
      }
    ]
  },
  {
    id: 'priorityLevels',
    title: 'Priority Levels',
    description: 'Configure task priority settings',
    options: [
      {
        id: 'defaultPriority',
        label: 'Default Priority',
        type: 'select',
        value: 'medium',
        options: [
          { label: 'High', value: 'high' },
          { label: 'Medium', value: 'medium' },
          { label: 'Low', value: 'low' }
        ],
        description: 'Default priority for new tasks'
      },
      {
        id: 'showPriorityColors',
        label: 'Show Priority Colors',
        type: 'boolean',
        value: true,
        description: 'Display color indicators for priorities'
      }
    ]
  },
  {
    id: 'labels',
    title: 'Task Labels',
    description: 'Configure task label settings',
    options: [
      {
        id: 'enableLabels',
        label: 'Enable Labels',
        type: 'boolean',
        value: true,
        description: 'Enable task labeling system'
      },
      {
        id: 'maxLabelsPerTask',
        label: 'Max Labels Per Task',
        type: 'number',
        value: 5,
        description: 'Maximum number of labels per task'
      }
    ]
  }
];

interface TaskCategoriesConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskCategoriesConfigurator({ open, onOpenChange }: TaskCategoriesConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving task category settings:', values);
    // TODO: Implement settings save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Task Categories"
      description="Configure task categories and priority settings"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}