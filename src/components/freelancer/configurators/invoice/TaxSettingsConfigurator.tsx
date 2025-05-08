import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'general',
    title: 'General Tax Settings',
    description: 'Configure default tax settings',
    options: [
      {
        id: 'enableTax',
        label: 'Enable Tax Calculation',
        type: 'boolean',
        value: true,
        description: 'Enable tax calculations on invoices'
      },
      {
        id: 'defaultTaxRate',
        label: 'Default Tax Rate (%)',
        type: 'number',
        value: 20,
        description: 'Default tax percentage to apply'
      },
      {
        id: 'taxNumberLabel',
        label: 'Tax Number Label',
        type: 'select',
        value: 'vat',
        options: [
          { label: 'VAT Number', value: 'vat' },
          { label: 'GST Number', value: 'gst' },
          { label: 'Tax ID', value: 'taxid' }
        ],
        description: 'Label to use for tax identification number'
      }
    ]
  },
  {
    id: 'rules',
    title: 'Tax Rules',
    description: 'Configure tax calculation rules',
    options: [
      {
        id: 'compoundTax',
        label: 'Compound Tax',
        type: 'boolean',
        value: false,
        description: 'Apply tax on top of other taxes'
      },
      {
        id: 'taxOnShipping',
        label: 'Tax on Shipping',
        type: 'boolean',
        value: true,
        description: 'Apply tax to shipping charges'
      },
      {
        id: 'roundingMethod',
        label: 'Tax Rounding',
        type: 'select',
        value: 'nearest',
        options: [
          { label: 'Nearest', value: 'nearest' },
          { label: 'Up', value: 'up' },
          { label: 'Down', value: 'down' }
        ],
        description: 'How to round tax calculations'
      }
    ]
  },
  {
    id: 'display',
    title: 'Display Settings',
    description: 'Configure how tax information is displayed',
    options: [
      {
        id: 'showTaxSummary',
        label: 'Show Tax Summary',
        type: 'boolean',
        value: true,
        description: 'Display tax breakdown in invoice'
      },
      {
        id: 'taxItemization',
        label: 'Tax Itemization',
        type: 'select',
        value: 'grouped',
        options: [
          { label: 'Grouped by Rate', value: 'grouped' },
          { label: 'Per Line Item', value: 'peritem' },
          { label: 'Summary Only', value: 'summary' }
        ],
        description: 'How to display tax calculations'
      },
      {
        id: 'pricesIncludeTax',
        label: 'Prices Include Tax',
        type: 'boolean',
        value: false,
        description: 'Show prices with tax included'
      }
    ]
  }
];

interface TaxSettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaxSettingsConfigurator({ open, onOpenChange }: TaxSettingsConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving tax settings:', values);
    // TODO: Implement tax settings save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Tax Settings"
      description="Configure tax calculation and display settings for your invoices"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}