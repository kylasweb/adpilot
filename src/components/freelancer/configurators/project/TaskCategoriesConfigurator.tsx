import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'categories',
    title: 'Task Categories',
    description: 'Configure task categories and types',
    options: [
      {
        id: 'enabledCategories',
        label: 'Enabled Categories',
        type: 'select',
        value: ['feature', 'bug', 'task'],
        multiple: true,
        options: [
          { label: 'Feature', value: 'feature' },
          { label: 'Bug', value: 'bug' },
          { label: 'Task', value: 'task' },
          { label: 'Improvement', value: 'improvement' },
          { label: 'Documentation', value: 'docs' },
          { label: 'Research', value: 'research' }
        ],
        description: 'Active task categories'
      },
      {
        id: 'defaultCategory',
        label: 'Default Category',
        type: 'select',
        value: 'task',
        options: [
          { label: 'Feature', value: 'feature' },
          { label: 'Bug', value: 'bug' },
          { label: 'Task', value: 'task' },
          { label: 'Improvement', value: 'improvement' }
        ],
        description: 'Default category for new tasks'
      },
      {
        id: 'customCategories',
        label: 'Allow Custom Categories',
        type: 'boolean',
        value: true,
        description: 'Allow creation of custom categories'
      }
    ]
  },
  {
    id: 'priorities',
    title: 'Priority Settings',
    description: 'Configure task priority levels',
    options: [
      {
        id: 'priorityLevels',
        label: 'Priority Levels',
        type: 'select',
        value: ['high', 'medium', 'low'],
        multiple: true,
        options: [
          { label: 'Critical', value: 'critical' },
          { label: 'High', value: 'high' },
          { label: 'Medium', value: 'medium' },
          { label: 'Low', value: 'low' },
          { label: 'Trivial', value: 'trivial' }
        ],
        description: 'Available priority levels'
      },
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
        id: 'priorityColors',
        label: 'Use Priority Colors',
        type: 'boolean',
        value: true,
        description: 'Show color indicators for priorities'
      }
    ]
  },
  {
    id: 'fields',
    title: 'Category Fields',
    description: 'Configure category-specific fields',
    options: [
      {
        id: 'requiredFields',
        label: 'Required Fields',
        type: 'select',
        value: ['title', 'description', 'priority'],
        multiple: true,
        options: [
          { label: 'Title', value: 'title' },
          { label: 'Description', value: 'description' },
          { label: 'Priority', value: 'priority' },
          { label: 'Due Date', value: 'dueDate' },
          { label: 'Assignee', value: 'assignee' },
          { label: 'Estimate', value: 'estimate' }
        ],
        description: 'Required fields for tasks'
      },
      {
        id: 'optionalFields',
        label: 'Optional Fields',
        type: 'select',
        value: ['tags', 'attachments', 'subtasks'],
        multiple: true,
        options: [
          { label: 'Tags', value: 'tags' },
          { label: 'Attachments', value: 'attachments' },
          { label: 'Subtasks', value: 'subtasks' },
          { label: 'Links', value: 'links' },
          { label: 'Comments', value: 'comments' }
        ],
        description: 'Optional fields for tasks'
      },
      {
        id: 'customFields',
        label: 'Allow Custom Fields',
        type: 'boolean',
        value: true,
        description: 'Enable custom fields for categories'
      }
    ]
  },
  {
    id: 'workflow',
    title: 'Category Workflows',
    description: 'Configure category-specific workflows',
    options: [
      {
        id: 'defaultStatuses',
        label: 'Default Statuses',
        type: 'select',
        value: ['todo', 'inprogress', 'done'],
        multiple: true,
        options: [
          { label: 'To Do', value: 'todo' },
          { label: 'In Progress', value: 'inprogress' },
          { label: 'Review', value: 'review' },
          { label: 'Done', value: 'done' },
          { label: 'Archived', value: 'archived' }
        ],
        description: 'Default task statuses'
      },
      {
        id: 'statusTransitions',
        label: 'Status Transitions',
        type: 'boolean',
        value: true,
        description: 'Enforce status transition rules'
      },
      {
        id: 'autoAssignment',
        label: 'Auto Assignment',
        type: 'boolean',
        value: false,
        description: 'Automatically assign tasks based on category'
      }
    ]
  }
];

interface TaskCategoriesConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function TaskCategoriesConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: TaskCategoriesConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving task category settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Task Categories Settings"
      description="Configure task categories and related settings"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}