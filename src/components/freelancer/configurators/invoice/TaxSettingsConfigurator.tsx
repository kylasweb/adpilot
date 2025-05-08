import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'general',
    title: 'General Tax Settings',
    description: 'Configure basic tax settings',
    options: [
      {
        id: 'taxSystem',
        label: 'Tax System',
        type: 'select',
        value: 'vat',
        options: [
          { label: 'VAT', value: 'vat' },
          { label: 'GST', value: 'gst' },
          { label: 'Sales Tax', value: 'sales' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Type of tax system to use'
      },
      {
        id: 'defaultTaxRate',
        label: 'Default Tax Rate (%)',
        type: 'number',
        value: 20,
        min: 0,
        max: 100,
        description: 'Default tax rate for new items'
      },
      {
        id: 'taxRegistrationNo',
        label: 'Tax Registration Number',
        type: 'text',
        value: '',
        description: 'Your tax registration number'
      }
    ]
  },
  {
    id: 'categories',
    title: 'Tax Categories',
    description: 'Configure tax categories and rates',
    options: [
      {
        id: 'enabledCategories',
        label: 'Enabled Categories',
        type: 'select',
        value: ['standard', 'reduced', 'zero'],
        multiple: true,
        options: [
          { label: 'Standard Rate', value: 'standard' },
          { label: 'Reduced Rate', value: 'reduced' },
          { label: 'Zero Rate', value: 'zero' },
          { label: 'Exempt', value: 'exempt' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Active tax categories'
      },
      {
        id: 'reducedRate',
        label: 'Reduced Rate (%)',
        type: 'number',
        value: 5,
        min: 0,
        max: 100,
        description: 'Tax rate for reduced category'
      },
      {
        id: 'customRates',
        label: 'Custom Rates',
        type: 'boolean',
        value: false,
        description: 'Enable custom tax rates'
      }
    ]
  },
  {
    id: 'location',
    title: 'Location Settings',
    description: 'Configure location-based tax settings',
    options: [
      {
        id: 'taxRegion',
        label: 'Tax Region',
        type: 'select',
        value: 'domestic',
        options: [
          { label: 'Domestic', value: 'domestic' },
          { label: 'EU', value: 'eu' },
          { label: 'International', value: 'international' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Primary tax region'
      },
      {
        id: 'enabledRegions',
        label: 'Enabled Regions',
        type: 'select',
        value: ['domestic'],
        multiple: true,
        options: [
          { label: 'Domestic', value: 'domestic' },
          { label: 'EU Countries', value: 'eu' },
          { label: 'North America', value: 'na' },
          { label: 'Asia Pacific', value: 'apac' }
        ],
        description: 'Regions where you charge tax'
      },
      {
        id: 'reverseCharge',
        label: 'Reverse Charge',
        type: 'boolean',
        value: true,
        description: 'Enable reverse charge mechanism'
      }
    ]
  },
  {
    id: 'calculation',
    title: 'Calculation Settings',
    description: 'Configure tax calculation rules',
    options: [
      {
        id: 'calculationMethod',
        label: 'Calculation Method',
        type: 'select',
        value: 'line',
        options: [
          { label: 'Line Item', value: 'line' },
          { label: 'Subtotal', value: 'subtotal' },
          { label: 'Both', value: 'both' }
        ],
        description: 'How tax should be calculated'
      },
      {
        id: 'roundingMethod',
        label: 'Rounding Method',
        type: 'select',
        value: 'round',
        options: [
          { label: 'Round', value: 'round' },
          { label: 'Round Up', value: 'ceil' },
          { label: 'Round Down', value: 'floor' },
          { label: 'Two Decimals', value: 'decimal' }
        ],
        description: 'How tax amounts should be rounded'
      },
      {
        id: 'compoundTax',
        label: 'Compound Tax',
        type: 'boolean',
        value: false,
        description: 'Calculate tax on tax (compound)'
      }
    ]
  }
];

interface TaxSettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function TaxSettingsConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: TaxSettingsConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving tax settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Tax Settings"
      description="Configure tax rates and calculations"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}