import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'import',
    title: 'Import Settings',
    description: 'Configure data import preferences',
    options: [
      {
        id: 'importFormat',
        label: 'Import Format',
        type: 'select',
        value: 'csv',
        options: [
          { label: 'CSV', value: 'csv' },
          { label: 'Excel (XLSX)', value: 'xlsx' },
          { label: 'JSON', value: 'json' }
        ],
        description: 'Default format for importing client data'
      },
      {
        id: 'importBehavior',
        label: 'Import Behavior',
        type: 'select',
        value: 'merge',
        options: [
          { label: 'Merge with existing data', value: 'merge' },
          { label: 'Replace existing data', value: 'replace' },
          { label: 'Skip existing records', value: 'skip' }
        ],
        description: 'How to handle existing data during import'
      },
      {
        id: 'validateImport',
        label: 'Validate Import',
        type: 'boolean',
        value: true,
        description: 'Validate data before importing'
      }
    ]
  },
  {
    id: 'export',
    title: 'Export Settings',
    description: 'Configure data export preferences',
    options: [
      {
        id: 'exportFormat',
        label: 'Export Format',
        type: 'select',
        value: 'csv',
        options: [
          { label: 'CSV', value: 'csv' },
          { label: 'Excel (XLSX)', value: 'xlsx' },
          { label: 'JSON', value: 'json' },
          { label: 'PDF', value: 'pdf' }
        ],
        description: 'Default format for exporting client data'
      },
      {
        id: 'exportFields',
        label: 'Export Fields',
        type: 'select',
        value: ['basic', 'contact', 'billing'],
        multiple: true,
        options: [
          { label: 'Basic Info', value: 'basic' },
          { label: 'Contact Details', value: 'contact' },
          { label: 'Billing Information', value: 'billing' },
          { label: 'Project History', value: 'projects' },
          { label: 'Payment History', value: 'payments' },
          { label: 'Notes & Comments', value: 'notes' }
        ],
        description: 'Fields to include in exports'
      },
      {
        id: 'autoExport',
        label: 'Automated Exports',
        type: 'select',
        value: 'monthly',
        options: [
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Never', value: 'never' }
        ],
        description: 'Schedule automatic data exports'
      }
    ]
  },
  {
    id: 'backup',
    title: 'Backup Settings',
    description: 'Configure automated backup settings',
    options: [
      {
        id: 'backupEnabled',
        label: 'Enable Backups',
        type: 'boolean',
        value: true,
        description: 'Enable automated data backups'
      },
      {
        id: 'backupFrequency',
        label: 'Backup Frequency',
        type: 'select',
        value: 'daily',
        options: [
          { label: 'Every 6 hours', value: '6hours' },
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' }
        ],
        description: 'How often to create backups'
      },
      {
        id: 'retentionPeriod',
        label: 'Retention Period (days)',
        type: 'number',
        value: 30,
        min: 7,
        max: 365,
        description: 'Number of days to keep backups'
      }
    ]
  }
];

interface ImportExportConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function ImportExportConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: ImportExportConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving import/export settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Import & Export Settings"
      description="Configure how client data is imported and exported"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}