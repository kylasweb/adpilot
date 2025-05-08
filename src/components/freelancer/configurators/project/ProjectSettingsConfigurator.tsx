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
        label: 'Project ID Prefix',
        type: 'text',
        value: 'PROJ-',
        description: 'Prefix for project identification numbers'
      },
      {
        id: 'defaultView',
        label: 'Default View',
        type: 'select',
        value: 'board',
        options: [
          { label: 'Board View', value: 'board' },
          { label: 'List View', value: 'list' },
          { label: 'Timeline View', value: 'timeline' },
          { label: 'Calendar View', value: 'calendar' }
        ],
        description: 'Default project view mode'
      }
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration Settings',
    description: 'Configure project collaboration options',
    options: [
      {
        id: 'enableComments',
        label: 'Enable Comments',
        type: 'boolean',
        value: true,
        description: 'Allow comments on project items'
      },
      {
        id: 'enableFileSharing',
        label: 'Enable File Sharing',
        type: 'boolean',
        value: true,
        description: 'Allow file attachments in projects'
      },
      {
        id: 'maxFileSize',
        label: 'Max File Size (MB)',
        type: 'number',
        value: 50,
        description: 'Maximum file size for attachments'
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notification Preferences',
    description: 'Configure project notification settings',
    options: [
      {
        id: 'emailNotifications',
        label: 'Email Notifications',
        type: 'boolean',
        value: true,
        description: 'Send project updates via email'
      },
      {
        id: 'notificationFrequency',
        label: 'Update Frequency',
        type: 'select',
        value: 'daily',
        options: [
          { label: 'Real-time', value: 'realtime' },
          { label: 'Daily Digest', value: 'daily' },
          { label: 'Weekly Summary', value: 'weekly' }
        ],
        description: 'Frequency of project update notifications'
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy Settings',
    description: 'Configure project privacy and access settings',
    options: [
      {
        id: 'defaultVisibility',
        label: 'Default Visibility',
        type: 'select',
        value: 'team',
        options: [
          { label: 'Public', value: 'public' },
          { label: 'Team Only', value: 'team' },
          { label: 'Private', value: 'private' }
        ],
        description: 'Default visibility for new projects'
      },
      {
        id: 'requireApproval',
        label: 'Require Approval',
        type: 'boolean',
        value: true,
        description: 'Require approval for project access requests'
      }
    ]
  }
];

interface ProjectSettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectSettingsConfigurator({ open, onOpenChange }: ProjectSettingsConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving project settings:', values);
    // TODO: Implement settings save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Project Settings"
      description="Configure your project management preferences"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}