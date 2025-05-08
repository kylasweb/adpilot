import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Configure general project settings',
    options: [
      {
        id: 'projectPrefix',
        label: 'Project Code Prefix',
        type: 'text',
        value: 'PRJ-',
        description: 'Prefix for project codes'
      },
      {
        id: 'defaultVisibility',
        label: 'Default Visibility',
        type: 'select',
        value: 'private',
        options: [
          { label: 'Private', value: 'private' },
          { label: 'Team', value: 'team' },
          { label: 'Client', value: 'client' },
          { label: 'Public', value: 'public' }
        ],
        description: 'Default project visibility'
      },
      {
        id: 'requireApproval',
        label: 'Require Approval',
        type: 'boolean',
        value: true,
        description: 'Require approval for project creation'
      }
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration Settings',
    description: 'Configure project collaboration features',
    options: [
      {
        id: 'teamRoles',
        label: 'Team Roles',
        type: 'select',
        value: ['manager', 'member', 'viewer'],
        multiple: true,
        options: [
          { label: 'Project Manager', value: 'manager' },
          { label: 'Team Member', value: 'member' },
          { label: 'Viewer', value: 'viewer' },
          { label: 'Client', value: 'client' },
          { label: 'Guest', value: 'guest' }
        ],
        description: 'Available team roles'
      },
      {
        id: 'clientFeatures',
        label: 'Client Features',
        type: 'select',
        value: ['files', 'comments', 'milestones'],
        multiple: true,
        options: [
          { label: 'File Sharing', value: 'files' },
          { label: 'Comments', value: 'comments' },
          { label: 'Milestones', value: 'milestones' },
          { label: 'Time Tracking', value: 'time' },
          { label: 'Task View', value: 'tasks' }
        ],
        description: 'Features available to clients'
      },
      {
        id: 'notificationSettings',
        label: 'Notifications',
        type: 'select',
        value: ['updates', 'comments', 'mentions'],
        multiple: true,
        options: [
          { label: 'Project Updates', value: 'updates' },
          { label: 'Comments', value: 'comments' },
          { label: 'Mentions', value: 'mentions' },
          { label: 'Milestone Updates', value: 'milestones' },
          { label: 'File Changes', value: 'files' }
        ],
        description: 'Default notification settings'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation Settings',
    description: 'Configure project automation rules',
    options: [
      {
        id: 'autoAssignment',
        label: 'Auto Assignment',
        type: 'boolean',
        value: true,
        description: 'Automatically assign tasks based on rules'
      },
      {
        id: 'statusUpdates',
        label: 'Auto Status Updates',
        type: 'boolean',
        value: true,
        description: 'Automatically update project status'
      },
      {
        id: 'reminderRules',
        label: 'Reminder Rules',
        type: 'select',
        value: ['deadline', 'inactive'],
        multiple: true,
        options: [
          { label: 'Approaching Deadlines', value: 'deadline' },
          { label: 'Inactive Tasks', value: 'inactive' },
          { label: 'Pending Reviews', value: 'review' },
          { label: 'Budget Alerts', value: 'budget' }
        ],
        description: 'Automated reminder types'
      }
    ]
  },
  {
    id: 'files',
    title: 'File Management',
    description: 'Configure project file settings',
    options: [
      {
        id: 'storageLimit',
        label: 'Storage Limit (MB)',
        type: 'number',
        value: 1000,
        min: 100,
        max: 10000,
        description: 'Storage limit per project'
      },
      {
        id: 'allowedTypes',
        label: 'Allowed File Types',
        type: 'select',
        value: ['image', 'document', 'archive'],
        multiple: true,
        options: [
          { label: 'Images', value: 'image' },
          { label: 'Documents', value: 'document' },
          { label: 'Archives', value: 'archive' },
          { label: 'Audio', value: 'audio' },
          { label: 'Video', value: 'video' }
        ],
        description: 'Allowed file types'
      },
      {
        id: 'versionControl',
        label: 'Version Control',
        type: 'boolean',
        value: true,
        description: 'Enable file version control'
      }
    ]
  }
];

interface ProjectSettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function ProjectSettingsConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: ProjectSettingsConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving project settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Project Settings"
      description="Configure general project settings and defaults"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}