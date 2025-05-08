import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorProps, ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'template',
    title: 'Template Settings',
    description: 'Configure the proposal template settings',
    options: [
      {
        id: 'layout',
        label: 'Layout Style',
        type: 'select',
        value: 'modern',
        options: [
          { label: 'Modern', value: 'modern' },
          { label: 'Classic', value: 'classic' },
          { label: 'Minimal', value: 'minimal' }
        ],
        description: 'Choose the overall layout style'
      },
      {
        id: 'branding',
        label: 'Show Branding',
        type: 'boolean',
        value: true,
        description: 'Include your logo and brand colors'
      }
    ]
  },
  {
    id: 'sections',
    title: 'Section Management',
    description: 'Customize proposal sections and their order',
    options: [
      {
        id: 'enableExecutiveSummary',
        label: 'Executive Summary',
        type: 'boolean',
        value: true,
        description: 'Include an executive summary section'
      },
      {
        id: 'enablePricing',
        label: 'Pricing Table',
        type: 'boolean',
        value: true,
        description: 'Include detailed pricing breakdown'
      },
      {
        id: 'enableTimeline',
        label: 'Project Timeline',
        type: 'boolean',
        value: true,
        description: 'Include project timeline and milestones'
      }
    ]
  }
];

export function TemplateEditorConfigurator({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  initialValues
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & ConfiguratorProps) {
  return (
    <BaseConfiguratorDialog
      title="Proposal Template Editor"
      description="Customize your proposal template layout and sections"
      open={open}
      onOpenChange={onOpenChange}
      sections={sections}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}