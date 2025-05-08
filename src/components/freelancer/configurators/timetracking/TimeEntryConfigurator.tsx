import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const timeEntrySections: ConfiguratorSection[] = [
  {
    id: 'timeEntry',
    title: 'Time Entry Settings',
    description: 'Configure how time entries are recorded and managed',
    options: [
      {
        id: 'minimumInterval',
        label: 'Minimum Time Interval',
        description: 'Minimum duration for time entries (in minutes)',
        type: 'number',
        value: 15
      },
      {
        id: 'roundingRule',
        label: 'Time Rounding',
        description: 'How to round time entries',
        type: 'select',
        value: 'nearest',
        options: [
          { label: 'Round to nearest interval', value: 'nearest' },
          { label: 'Round up to next interval', value: 'up' },
          { label: 'Round down to previous interval', value: 'down' }
        ]
      },
      {
        id: 'autoStopEnabled',
        label: 'Auto-Stop Timer',
        description: 'Automatically stop timer after period of inactivity',
        type: 'boolean',
        value: true
      },
      {
        id: 'autoStopInterval',
        label: 'Auto-Stop Interval',
        description: 'Minutes of inactivity before auto-stop (if enabled)',
        type: 'number',
        value: 30
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Timer Notifications',
    description: 'Configure timer alerts and reminders',
    options: [
      {
        id: 'reminderEnabled',
        label: 'Timer Reminders',
        description: 'Send periodic reminders while timer is running',
        type: 'boolean',
        value: true
      },
      {
        id: 'reminderInterval',
        label: 'Reminder Interval',
        description: 'Minutes between reminders',
        type: 'number',
        value: 60
      }
    ]
  }
];

interface TimeEntryConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
  initialValues?: Record<string, any>;
}

export function TimeEntryConfigurator({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  initialValues
}: TimeEntryConfiguratorProps) {
  return (
    <BaseConfiguratorDialog
      title="Time Entry Settings"
      description="Configure time tracking behavior and automation rules"
      open={open}
      onOpenChange={onOpenChange}
      sections={timeEntrySections}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}