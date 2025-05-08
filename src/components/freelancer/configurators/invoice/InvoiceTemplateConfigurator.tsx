import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'layout',
    title: 'Layout Settings',
    description: 'Configure invoice layout and design',
    options: [
      {
        id: 'template',
        label: 'Template Style',
        type: 'select',
        value: 'professional',
        options: [
          { label: 'Professional', value: 'professional' },
          { label: 'Minimalist', value: 'minimalist' },
          { label: 'Creative', value: 'creative' },
          { label: 'Classic', value: 'classic' },
          { label: 'Modern', value: 'modern' }
        ],
        description: 'Overall template style'
      },
      {
        id: 'colorScheme',
        label: 'Color Scheme',
        type: 'select',
        value: 'blue',
        options: [
          { label: 'Blue Professional', value: 'blue' },
          { label: 'Green Nature', value: 'green' },
          { label: 'Gray Corporate', value: 'gray' },
          { label: 'Purple Creative', value: 'purple' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Color scheme for the invoice'
      },
      {
        id: 'fontFamily',
        label: 'Font Family',
        type: 'select',
        value: 'inter',
        options: [
          { label: 'Inter', value: 'inter' },
          { label: 'Roboto', value: 'roboto' },
          { label: 'Open Sans', value: 'opensans' },
          { label: 'Lato', value: 'lato' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Main font family for the invoice'
      }
    ]
  },
  {
    id: 'content',
    title: 'Content Elements',
    description: 'Configure invoice content sections',
    options: [
      {
        id: 'headerElements',
        label: 'Header Elements',
        type: 'select',
        value: ['logo', 'company', 'title'],
        multiple: true,
        options: [
          { label: 'Logo', value: 'logo' },
          { label: 'Company Name', value: 'company' },
          { label: 'Invoice Title', value: 'title' },
          { label: 'Company Details', value: 'details' },
          { label: 'Website', value: 'website' }
        ],
        description: 'Elements to show in invoice header'
      },
      {
        id: 'itemColumns',
        label: 'Item Columns',
        type: 'select',
        value: ['description', 'quantity', 'rate', 'amount'],
        multiple: true,
        options: [
          { label: 'Description', value: 'description' },
          { label: 'Quantity', value: 'quantity' },
          { label: 'Rate', value: 'rate' },
          { label: 'Amount', value: 'amount' },
          { label: 'Tax', value: 'tax' },
          { label: 'Discount', value: 'discount' }
        ],
        description: 'Columns to show in item table'
      },
      {
        id: 'footerElements',
        label: 'Footer Elements',
        type: 'select',
        value: ['notes', 'terms', 'payment'],
        multiple: true,
        options: [
          { label: 'Notes', value: 'notes' },
          { label: 'Terms & Conditions', value: 'terms' },
          { label: 'Payment Info', value: 'payment' },
          { label: 'Due Date', value: 'due' },
          { label: 'Page Numbers', value: 'pages' }
        ],
        description: 'Elements to show in invoice footer'
      }
    ]
  },
  {
    id: 'customization',
    title: 'Custom Elements',
    description: 'Configure custom elements and branding',
    options: [
      {
        id: 'customHeader',
        label: 'Custom Header',
        type: 'text',
        value: '',
        description: 'Custom header text or HTML'
      },
      {
        id: 'customFooter',
        label: 'Custom Footer',
        type: 'text',
        value: '',
        description: 'Custom footer text or HTML'
      },
      {
        id: 'watermark',
        label: 'Watermark',
        type: 'boolean',
        value: false,
        description: 'Add watermark to invoice'
      },
      {
        id: 'signatureImage',
        label: 'Digital Signature',
        type: 'boolean',
        value: true,
        description: 'Include digital signature'
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Settings',
    description: 'Configure advanced template features',
    options: [
      {
        id: 'language',
        label: 'Default Language',
        type: 'select',
        value: 'en',
        options: [
          { label: 'English', value: 'en' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' },
          { label: 'German', value: 'de' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Default language for invoice text'
      },
      {
        id: 'numberFormat',
        label: 'Number Format',
        type: 'select',
        value: 'standard',
        options: [
          { label: 'Standard (1,234.56)', value: 'standard' },
          { label: 'European (1.234,56)', value: 'european' },
          { label: 'Plain (1234.56)', value: 'plain' }
        ],
        description: 'Format for numbers and amounts'
      },
      {
        id: 'dateFormat',
        label: 'Date Format',
        type: 'select',
        value: 'YYYY-MM-DD',
        options: [
          { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
          { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
          { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Format for dates on invoice'
      }
    ]
  }
];

interface InvoiceTemplateConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function InvoiceTemplateConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: InvoiceTemplateConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving invoice template settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Invoice Template Settings"
      description="Configure your invoice template appearance and content"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}