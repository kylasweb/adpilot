import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'design',
    title: 'Template Design',
    description: 'Configure the visual appearance of your invoices',
    options: [
      {
        id: 'template',
        label: 'Template Style',
        type: 'select',
        value: 'modern',
        options: [
          { label: 'Modern', value: 'modern' },
          { label: 'Classic', value: 'classic' },
          { label: 'Minimalist', value: 'minimalist' }
        ],
        description: 'Choose the overall design style'
      },
      {
        id: 'colorScheme',
        label: 'Color Scheme',
        type: 'select',
        value: 'blue',
        options: [
          { label: 'Blue Professional', value: 'blue' },
          { label: 'Green Nature', value: 'green' },
          { label: 'Gray Corporate', value: 'gray' }
        ],
        description: 'Select primary color scheme'
      },
      {
        id: 'logoPosition',
        label: 'Logo Position',
        type: 'select',
        value: 'top-left',
        options: [
          { label: 'Top Left', value: 'top-left' },
          { label: 'Top Center', value: 'top-center' },
          { label: 'Top Right', value: 'top-right' }
        ],
        description: 'Position of your company logo'
      }
    ]
  },
  {
    id: 'content',
    title: 'Content Layout',
    description: 'Configure invoice content sections',
    options: [
      {
        id: 'showHeader',
        label: 'Show Header',
        type: 'boolean',
        value: true,
        description: 'Display header section with company info'
      },
      {
        id: 'showFooter',
        label: 'Show Footer',
        type: 'boolean',
        value: true,
        description: 'Display footer with additional information'
      },
      {
        id: 'itemization',
        label: 'Item Display',
        type: 'select',
        value: 'detailed',
        options: [
          { label: 'Detailed', value: 'detailed' },
          { label: 'Compact', value: 'compact' },
          { label: 'Summary', value: 'summary' }
        ],
        description: 'How to display invoice items'
      }
    ]
  }
];

interface InvoiceTemplateConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceTemplateConfigurator({ open, onOpenChange }: InvoiceTemplateConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving invoice template settings:', values);
    // TODO: Implement template settings save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Invoice Template"
      description="Customize the appearance and layout of your invoices"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}