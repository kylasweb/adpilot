import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorProps, ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'contentGeneration',
    title: 'Content Generation',
    description: 'Configure AI content generation settings',
    options: [
      {
        id: 'model',
        label: 'AI Model',
        type: 'select',
        value: 'gpt-4',
        options: [
          { label: 'GPT-4 (Recommended)', value: 'gpt-4' },
          { label: 'GPT-3.5', value: 'gpt-3.5' }
        ],
        description: 'Select AI model for content generation'
      },
      {
        id: 'temperature',
        label: 'Creativity Level',
        type: 'select',
        value: '0.7',
        options: [
          { label: 'Conservative', value: '0.3' },
          { label: 'Balanced', value: '0.7' },
          { label: 'Creative', value: '1.0' }
        ],
        description: 'Control the creativity of generated content'
      }
    ]
  },
  {
    id: 'sections',
    title: 'Section Generation',
    description: 'Configure which sections use AI assistance',
    options: [
      {
        id: 'generateExecutiveSummary',
        label: 'Executive Summary',
        type: 'boolean',
        value: true,
        description: 'Auto-generate executive summary'
      },
      {
        id: 'generateProjectScope',
        label: 'Project Scope',
        type: 'boolean',
        value: true,
        description: 'Auto-generate project scope'
      },
      {
        id: 'generateMethodology',
        label: 'Methodology',
        type: 'boolean',
        value: true,
        description: 'Auto-generate methodology section'
      }
    ]
  },
  {
    id: 'tone',
    title: 'Content Tone',
    description: 'Configure the tone of generated content',
    options: [
      {
        id: 'contentTone',
        label: 'Writing Tone',
        type: 'select',
        value: 'professional',
        options: [
          { label: 'Professional', value: 'professional' },
          { label: 'Friendly', value: 'friendly' },
          { label: 'Technical', value: 'technical' },
          { label: 'Persuasive', value: 'persuasive' }
        ],
        description: 'Select the tone for generated content'
      },
      {
        id: 'industryContext',
        label: 'Industry Context',
        type: 'text',
        value: '',
        description: 'Provide industry-specific context for better results'
      }
    ]
  }
];

export function AISettingsConfigurator({
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
      title="AI Settings"
      description="Configure AI-powered content generation settings for your proposals"
      open={open}
      onOpenChange={onOpenChange}
      sections={sections}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}