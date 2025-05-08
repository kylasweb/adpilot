import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'reports',
    title: 'Report Types',
    description: 'Configure available report types',
    options: [
      {
        id: 'enabledReports',
        label: 'Enabled Reports',
        type: 'select',
        value: ['summary', 'detailed', 'timesheet'],
        multiple: true,
        options: [
          { label: 'Summary Report', value: 'summary' },
          { label: 'Detailed Report', value: 'detailed' },
          { label: 'Timesheet Report', value: 'timesheet' },
          { label: 'Invoice Report', value: 'invoice' },
          { label: 'Project Report', value: 'project' },
          { label: 'Client Report', value: 'client' }
        ],
        description: 'Available report types'
      },
      {
        id: 'defaultReport',
        label: 'Default Report',
        type: 'select',
        value: 'summary',
        options: [
          { label: 'Summary Report', value: 'summary' },
          { label: 'Detailed Report', value: 'detailed' },
          { label: 'Timesheet Report', value: 'timesheet' }
        ],
        description: 'Default report type'
      },
      {
        id: 'customReports',
        label: 'Custom Reports',
        type: 'boolean',
        value: true,
        description: 'Allow custom report creation'
      }
    ]
  },
  {
    id: 'format',
    title: 'Report Format',
    description: 'Configure report formatting',
    options: [
      {
        id: 'exportFormats',
        label: 'Export Formats',
        type: 'select',
        value: ['pdf', 'excel', 'csv'],
        multiple: true,
        options: [
          { label: 'PDF', value: 'pdf' },
          { label: 'Excel', value: 'excel' },
          { label: 'CSV', value: 'csv' },
          { label: 'HTML', value: 'html' },
          { label: 'JSON', value: 'json' }
        ],
        description: 'Available export formats'
      },
      {
        id: 'grouping',
        label: 'Default Grouping',
        type: 'select',
        value: ['project', 'date'],
        multiple: true,
        options: [
          { label: 'By Project', value: 'project' },
          { label: 'By Date', value: 'date' },
          { label: 'By Client', value: 'client' },
          { label: 'By Category', value: 'category' },
          { label: 'By User', value: 'user' }
        ],
        description: 'Default report grouping'
      },
      {
        id: 'dateFormat',
        label: 'Date Format',
        type: 'select',
        value: 'YYYY-MM-DD',
        options: [
          { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
          { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
          { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Date format in reports'
      }
    ]
  },
  {
    id: 'scheduling',
    title: 'Report Scheduling',
    description: 'Configure automated reports',
    options: [
      {
        id: 'autoReports',
        label: 'Automated Reports',
        type: 'select',
        value: ['weekly', 'monthly'],
        multiple: true,
        options: [
          { label: 'Daily Report', value: 'daily' },
          { label: 'Weekly Report', value: 'weekly' },
          { label: 'Monthly Report', value: 'monthly' },
          { label: 'Quarterly Report', value: 'quarterly' }
        ],
        description: 'Scheduled report generation'
      },
      {
        id: 'recipients',
        label: 'Default Recipients',
        type: 'select',
        value: ['manager', 'client'],
        multiple: true,
        options: [
          { label: 'Project Manager', value: 'manager' },
          { label: 'Client', value: 'client' },
          { label: 'Team Members', value: 'team' },
          { label: 'Finance Team', value: 'finance' }
        ],
        description: 'Default report recipients'
      },
      {
        id: 'deliveryMethod',
        label: 'Delivery Method',
        type: 'select',
        value: ['email', 'dashboard'],
        multiple: true,
        options: [
          { label: 'Email', value: 'email' },
          { label: 'Dashboard', value: 'dashboard' },
          { label: 'API', value: 'api' },
          { label: 'Download Link', value: 'link' }
        ],
        description: 'Report delivery methods'
      }
    ]
  },
  {
    id: 'data',
    title: 'Data Settings',
    description: 'Configure report data options',
    options: [
      {
        id: 'includedData',
        label: 'Included Data',
        type: 'select',
        value: ['time', 'tasks', 'costs'],
        multiple: true,
        options: [
          { label: 'Time Entries', value: 'time' },
          { label: 'Tasks', value: 'tasks' },
          { label: 'Costs', value: 'costs' },
          { label: 'Notes', value: 'notes' },
          { label: 'Attachments', value: 'attachments' }
        ],
        description: 'Data to include in reports'
      },
      {
        id: 'calculations',
        label: 'Calculations',
        type: 'select',
        value: ['totals', 'averages'],
        multiple: true,
        options: [
          { label: 'Totals', value: 'totals' },
          { label: 'Averages', value: 'averages' },
          { label: 'Percentages', value: 'percentages' },
          { label: 'Comparisons', value: 'comparisons' }
        ],
        description: 'Report calculations'
      },
      {
        id: 'dataRetention',
        label: 'Data Retention (months)',
        type: 'number',
        value: 12,
        min: 1,
        max: 60,
        description: 'How long to keep report data'
      }
    ]
  }
];

interface ReportingConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function ReportingConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: ReportingConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving reporting settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Reporting Settings"
      description="Configure time tracking reports and scheduling"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}