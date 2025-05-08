import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'tracking',
    title: 'Time Tracking',
    description: 'Configure time tracking settings',
    options: [
      {
        id: 'trackingMethod',
        label: 'Tracking Method',
        type: 'select',
        value: 'manual',
        options: [
          { label: 'Manual Entry', value: 'manual' },
          { label: 'Timer Based', value: 'timer' },
          { label: 'Calendar Sync', value: 'calendar' },
          { label: 'Automatic', value: 'auto' }
        ],
        description: 'Primary time tracking method'
      },
      {
        id: 'timeFormat',
        label: 'Time Format',
        type: 'select',
        value: 'decimal',
        options: [
          { label: 'Decimal (8.5)', value: 'decimal' },
          { label: 'Hours:Minutes (8:30)', value: 'hhmm' },
          { label: 'Duration (8h 30m)', value: 'duration' }
        ],
        description: 'Format for time entries'
      },
      {
        id: 'minimumInterval',
        label: 'Minimum Interval (minutes)',
        type: 'number',
        value: 15,
        min: 1,
        max: 60,
        description: 'Minimum time tracking interval'
      }
    ]
  },
  {
    id: 'rules',
    title: 'Tracking Rules',
    description: 'Configure tracking behavior',
    options: [
      {
        id: 'workingHours',
        label: 'Working Hours',
        type: 'select',
        value: ['9-17'],
        multiple: true,
        options: [
          { label: '9 AM - 5 PM', value: '9-17' },
          { label: '8 AM - 4 PM', value: '8-16' },
          { label: '10 AM - 6 PM', value: '10-18' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Default working hours'
      },
      {
        id: 'breakTracking',
        label: 'Break Tracking',
        type: 'select',
        value: 'auto',
        options: [
          { label: 'Automatic', value: 'auto' },
          { label: 'Manual', value: 'manual' },
          { label: 'Scheduled', value: 'scheduled' },
          { label: 'Disabled', value: 'disabled' }
        ],
        description: 'How breaks are tracked'
      },
      {
        id: 'overtimeRules',
        label: 'Overtime Rules',
        type: 'select',
        value: ['daily', 'weekly'],
        multiple: true,
        options: [
          { label: 'Daily Overtime', value: 'daily' },
          { label: 'Weekly Overtime', value: 'weekly' },
          { label: 'Weekend Work', value: 'weekend' },
          { label: 'Holiday Work', value: 'holiday' }
        ],
        description: 'Overtime calculation rules'
      }
    ]
  },
  {
    id: 'categories',
    title: 'Time Categories',
    description: 'Configure time entry categories',
    options: [
      {
        id: 'activityTypes',
        label: 'Activity Types',
        type: 'select',
        value: ['development', 'meeting', 'planning'],
        multiple: true,
        options: [
          { label: 'Development', value: 'development' },
          { label: 'Meetings', value: 'meeting' },
          { label: 'Planning', value: 'planning' },
          { label: 'Research', value: 'research' },
          { label: 'Documentation', value: 'documentation' },
          { label: 'Support', value: 'support' }
        ],
        description: 'Available activity types'
      },
      {
        id: 'billableCategories',
        label: 'Billable Categories',
        type: 'select',
        value: ['development', 'support'],
        multiple: true,
        options: [
          { label: 'Development', value: 'development' },
          { label: 'Support', value: 'support' },
          { label: 'Consulting', value: 'consulting' },
          { label: 'Training', value: 'training' }
        ],
        description: 'Categories marked as billable'
      },
      {
        id: 'customCategories',
        label: 'Allow Custom Categories',
        type: 'boolean',
        value: true,
        description: 'Enable custom categories'
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation Settings',
    description: 'Configure time tracking automation',
    options: [
      {
        id: 'autoStart',
        label: 'Auto Start Triggers',
        type: 'select',
        value: ['calendar', 'task'],
        multiple: true,
        options: [
          { label: 'Calendar Events', value: 'calendar' },
          { label: 'Task Assignment', value: 'task' },
          { label: 'Project Open', value: 'project' },
          { label: 'Custom Rules', value: 'custom' }
        ],
        description: 'Automatic time tracking triggers'
      },
      {
        id: 'idleDetection',
        label: 'Idle Detection',
        type: 'boolean',
        value: true,
        description: 'Enable idle time detection'
      },
      {
        id: 'autoReminders',
        label: 'Auto Reminders',
        type: 'select',
        value: ['start', 'stop'],
        multiple: true,
        options: [
          { label: 'Start Timer', value: 'start' },
          { label: 'Stop Timer', value: 'stop' },
          { label: 'Fill Missing Time', value: 'missing' },
          { label: 'Submit Timesheet', value: 'submit' }
        ],
        description: 'Automatic reminders'
      }
    ]
  }
];

interface TimeEntryConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function TimeEntryConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: TimeEntryConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving time entry settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Time Entry Settings"
      description="Configure time tracking and entry settings"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}