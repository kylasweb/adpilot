import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'structure',
    title: 'Project Structure',
    description: 'Configure default project structure',
    options: [
      {
        id: 'templateType',
        label: 'Template Type',
        type: 'select',
        value: 'standard',
        options: [
          { label: 'Standard Project', value: 'standard' },
          { label: 'Agile Sprint', value: 'agile' },
          { label: 'Milestone Based', value: 'milestone' },
          { label: 'Fixed Price', value: 'fixed' },
          { label: 'Time & Materials', value: 'time' }
        ],
        description: 'Type of project template'
      },
      {
        id: 'defaultPhases',
        label: 'Default Phases',
        type: 'select',
        value: ['planning', 'development', 'review'],
        multiple: true,
        options: [
          { label: 'Planning', value: 'planning' },
          { label: 'Discovery', value: 'discovery' },
          { label: 'Development', value: 'development' },
          { label: 'Testing', value: 'testing' },
          { label: 'Review', value: 'review' },
          { label: 'Deployment', value: 'deployment' }
        ],
        description: 'Default project phases'
      },
      {
        id: 'enableMilestones',
        label: 'Enable Milestones',
        type: 'boolean',
        value: true,
        description: 'Use milestones in projects'
      }
    ]
  },
  {
    id: 'tasks',
    title: 'Task Settings',
    description: 'Configure default task settings',
    options: [
      {
        id: 'taskCategories',
        label: 'Task Categories',
        type: 'select',
        value: ['feature', 'bug', 'docs'],
        multiple: true,
        options: [
          { label: 'Feature', value: 'feature' },
          { label: 'Bug Fix', value: 'bug' },
          { label: 'Documentation', value: 'docs' },
          { label: 'Testing', value: 'testing' },
          { label: 'Design', value: 'design' },
          { label: 'Research', value: 'research' }
        ],
        description: 'Available task categories'
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
        id: 'estimateRequired',
        label: 'Require Estimates',
        type: 'boolean',
        value: true,
        description: 'Require time estimates for tasks'
      }
    ]
  },
  {
    id: 'timeline',
    title: 'Timeline Settings',
    description: 'Configure project timeline defaults',
    options: [
      {
        id: 'defaultDuration',
        label: 'Default Duration (days)',
        type: 'number',
        value: 30,
        min: 1,
        max: 365,
        description: 'Default project duration'
      },
      {
        id: 'bufferDays',
        label: 'Buffer Days',
        type: 'number',
        value: 5,
        min: 0,
        max: 30,
        description: 'Extra days added for contingency'
      },
      {
        id: 'workingDays',
        label: 'Working Days',
        type: 'select',
        value: ['mon', 'tue', 'wed', 'thu', 'fri'],
        multiple: true,
        options: [
          { label: 'Monday', value: 'mon' },
          { label: 'Tuesday', value: 'tue' },
          { label: 'Wednesday', value: 'wed' },
          { label: 'Thursday', value: 'thu' },
          { label: 'Friday', value: 'fri' },
          { label: 'Saturday', value: 'sat' },
          { label: 'Sunday', value: 'sun' }
        ],
        description: 'Default working days'
      }
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration Settings',
    description: 'Configure collaboration features',
    options: [
      {
        id: 'defaultVisibility',
        label: 'Default Visibility',
        type: 'select',
        value: 'team',
        options: [
          { label: 'Team Only', value: 'team' },
          { label: 'Client Visible', value: 'client' },
          { label: 'Public', value: 'public' }
        ],
        description: 'Default project visibility'
      },
      {
        id: 'clientAccess',
        label: 'Client Access Features',
        type: 'select',
        value: ['files', 'comments', 'milestones'],
        multiple: true,
        options: [
          { label: 'Files & Documents', value: 'files' },
          { label: 'Comments', value: 'comments' },
          { label: 'Milestones', value: 'milestones' },
          { label: 'Time Logs', value: 'time' },
          { label: 'Task Details', value: 'tasks' }
        ],
        description: 'Features available to clients'
      },
      {
        id: 'autoNotifications',
        label: 'Auto Notifications',
        type: 'boolean',
        value: true,
        description: 'Send automatic notifications'
      }
    ]
  }
];

interface ProjectTemplateConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function ProjectTemplateConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: ProjectTemplateConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving project template settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Project Template Settings"
      description="Configure default project templates and structures"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}