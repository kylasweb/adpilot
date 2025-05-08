import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const reportingSections: ConfiguratorSection[] = [
  {
    id: 'reports',
    title: 'Report Settings',
    description: 'Configure default report types and formats',
    options: [
      {
        id: 'defaultReportType',
        label: 'Default Report Type',
        description: 'Standard report format to use',
        type: 'select',
        value: 'detailed',
        options: [
          { label: 'Detailed Time Log', value: 'detailed' },
          { label: 'Daily Summary', value: 'daily' },
          { label: 'Weekly Summary', value: 'weekly' },
          { label: 'Monthly Summary', value: 'monthly' }
        ]
      },
      {
        id: 'exportFormat',
        label: 'Export Format',
        description: 'Default file format for exports',
        type: 'select',
        value: 'xlsx',
        options: [
          { label: 'Excel (XLSX)', value: 'xlsx' },
          { label: 'CSV', value: 'csv' },
          { label: 'PDF', value: 'pdf' }
        ]
      },
      {
        id: 'includeNotes',
        label: 'Include Notes',
        description: 'Include time entry notes in reports',
        type: 'boolean',
        value: true
      }
    ]
  },
  {
    id: 'aggregation',
    title: 'Data Aggregation',
    description: 'Configure how time data is grouped and summarized',
    options: [
      {
        id: 'grouping',
        label: 'Default Grouping',
        description: 'How to group time entries',
        type: 'select',
        value: 'project',
        options: [
          { label: 'By Project', value: 'project' },
          { label: 'By Client', value: 'client' },
          { label: 'By Task', value: 'task' }
        ]
      },
      {
        id: 'roundReportTimes',
        label: 'Round Times in Reports',
        description: 'Round time values in reports',
        type: 'boolean',
        value: true
      },
      {
        id: 'showBillableTotal',
        label: 'Show Billable Totals',
        description: 'Include billable time totals',
        type: 'boolean',
        value: true
      }
    ]
  },
  {
    id: 'automation',
    title: 'Report Automation',
    description: 'Configure automated report generation',
    options: [
      {
        id: 'autoGenerateReports',
        label: 'Auto-Generate Reports',
        description: 'Automatically generate periodic reports',
        type: 'boolean',
        value: false
      },
      {
        id: 'reportSchedule',
        label: 'Report Schedule',
        description: 'When to generate automated reports',
        type: 'select',
        value: 'weekly',
        options: [
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' }
        ]
      }
    ]
  }
];

interface ReportingConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
  initialValues?: Record<string, any>;
}

export function ReportingConfigurator({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  initialValues
}: ReportingConfiguratorProps) {
  return (
    <BaseConfiguratorDialog
      title="Reporting Settings"
      description="Configure time tracking reports and exports"
      open={open}
      onOpenChange={onOpenChange}
      sections={reportingSections}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}