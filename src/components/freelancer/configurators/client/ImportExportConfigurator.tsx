import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'import',
    title: 'Import Settings',
    description: 'Configure client data import options',
    options: [
      {
        id: 'fileFormat',
        label: 'Import Format',
        type: 'select' as const,
        value: 'csv',
        options: [
          { label: 'CSV', value: 'csv' },
          { label: 'Excel', value: 'xlsx' },
          { label: 'JSON', value: 'json' }
        ],
        description: 'Select file format for importing client data'
      },
      {
        id: 'updateExisting',
        label: 'Update Existing',
        type: 'boolean' as const,
        value: true,
        description: 'Update existing clients if duplicates found'
      },
      {
        id: 'dateFormat',
        label: 'Date Format',
        type: 'select' as const,
        value: 'yyyy-mm-dd',
        options: [
          { label: 'YYYY-MM-DD', value: 'yyyy-mm-dd' },
          { label: 'MM/DD/YYYY', value: 'mm/dd/yyyy' },
          { label: 'DD/MM/YYYY', value: 'dd/mm/yyyy' }
        ],
        description: 'Date format in import file'
      }
    ]
  },
  {
    id: 'export',
    title: 'Export Settings',
    description: 'Configure client data export options',
    options: [
      {
        id: 'exportFormat',
        label: 'Export Format',
        type: 'select' as const,
        value: 'csv',
        options: [
          { label: 'CSV', value: 'csv' },
          { label: 'Excel', value: 'xlsx' },
          { label: 'JSON', value: 'json' }
        ],
        description: 'Select file format for exporting client data'
      },
      {
        id: 'includeArchived',
        label: 'Include Archived',
        type: 'boolean' as const,
        value: false,
        description: 'Include archived clients in export'
      },
      {
        id: 'exportFields',
        label: 'Export Fields',
        type: 'text' as const,
        value: 'name,email,phone,address',
        description: 'Comma-separated list of fields to export'
      }
    ]
  }
];

interface ImportExportConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportExportConfigurator({ open, onOpenChange }: ImportExportConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving import/export settings:', values);
    // TODO: Implement settings save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Import/Export Settings"
      description="Configure client data import and export options"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}