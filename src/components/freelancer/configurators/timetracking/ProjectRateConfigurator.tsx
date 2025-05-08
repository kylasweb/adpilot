import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'rates',
    title: 'Rate Settings',
    description: 'Configure project rate settings',
    options: [
      {
        id: 'defaultRate',
        label: 'Default Hourly Rate',
        type: 'number',
        value: 75,
        min: 0,
        max: 1000,
        description: 'Default hourly billing rate'
      },
      {
        id: 'rateType',
        label: 'Rate Type',
        type: 'select',
        value: 'hourly',
        options: [
          { label: 'Hourly Rate', value: 'hourly' },
          { label: 'Daily Rate', value: 'daily' },
          { label: 'Weekly Rate', value: 'weekly' },
          { label: 'Monthly Rate', value: 'monthly' }
        ],
        description: 'Default rate calculation type'
      },
      {
        id: 'currency',
        label: 'Default Currency',
        type: 'select',
        value: 'USD',
        options: [
          { label: 'USD ($)', value: 'USD' },
          { label: 'EUR (€)', value: 'EUR' },
          { label: 'GBP (£)', value: 'GBP' },
          { label: 'INR (₹)', value: 'INR' },
          { label: 'AUD ($)', value: 'AUD' }
        ],
        description: 'Currency for rates'
      }
    ]
  },
  {
    id: 'tiers',
    title: 'Rate Tiers',
    description: 'Configure rate tiers and roles',
    options: [
      {
        id: 'roleTiers',
        label: 'Role-based Tiers',
        type: 'select',
        value: ['junior', 'senior', 'lead'],
        multiple: true,
        options: [
          { label: 'Junior Level', value: 'junior' },
          { label: 'Mid Level', value: 'mid' },
          { label: 'Senior Level', value: 'senior' },
          { label: 'Lead Level', value: 'lead' },
          { label: 'Expert Level', value: 'expert' }
        ],
        description: 'Available role tiers'
      },
      {
        id: 'experienceTiers',
        label: 'Experience Tiers',
        type: 'select',
        value: ['standard', 'premium'],
        multiple: true,
        options: [
          { label: 'Standard Rate', value: 'standard' },
          { label: 'Premium Rate', value: 'premium' },
          { label: 'Enterprise Rate', value: 'enterprise' },
          { label: 'Custom Rate', value: 'custom' }
        ],
        description: 'Experience-based rate tiers'
      },
      {
        id: 'customTiers',
        label: 'Allow Custom Tiers',
        type: 'boolean',
        value: true,
        description: 'Enable custom rate tiers'
      }
    ]
  },
  {
    id: 'modifiers',
    title: 'Rate Modifiers',
    description: 'Configure rate adjustment rules',
    options: [
      {
        id: 'overtimeRate',
        label: 'Overtime Modifier',
        type: 'number',
        value: 1.5,
        min: 1,
        max: 3,
        description: 'Multiplier for overtime hours'
      },
      {
        id: 'specialRates',
        label: 'Special Rates',
        type: 'select',
        value: ['weekend', 'holiday'],
        multiple: true,
        options: [
          { label: 'Weekend Rate', value: 'weekend' },
          { label: 'Holiday Rate', value: 'holiday' },
          { label: 'Rush Rate', value: 'rush' },
          { label: 'Off-hours Rate', value: 'offhours' }
        ],
        description: 'Special rate conditions'
      },
      {
        id: 'discountRules',
        label: 'Discount Rules',
        type: 'select',
        value: ['volume', 'loyalty'],
        multiple: true,
        options: [
          { label: 'Volume Discount', value: 'volume' },
          { label: 'Loyalty Discount', value: 'loyalty' },
          { label: 'Early Payment', value: 'early' },
          { label: 'Package Deal', value: 'package' }
        ],
        description: 'Rate discount rules'
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing Rules',
    description: 'Configure billing calculation rules',
    options: [
      {
        id: 'minimumBilling',
        label: 'Minimum Billing',
        type: 'number',
        value: 0.25,
        min: 0,
        max: 8,
        description: 'Minimum billable hours'
      },
      {
        id: 'roundingRule',
        label: 'Time Rounding',
        type: 'select',
        value: 'nearest15',
        options: [
          { label: 'Nearest 15min', value: 'nearest15' },
          { label: 'Nearest 30min', value: 'nearest30' },
          { label: 'Round Up', value: 'up' },
          { label: 'Round Down', value: 'down' }
        ],
        description: 'Time rounding rules'
      },
      {
        id: 'nonBillableCategories',
        label: 'Non-billable Categories',
        type: 'select',
        value: ['admin', 'internal'],
        multiple: true,
        options: [
          { label: 'Administrative', value: 'admin' },
          { label: 'Internal Meetings', value: 'internal' },
          { label: 'Training', value: 'training' },
          { label: 'Support', value: 'support' }
        ],
        description: 'Categories not billed to client'
      }
    ]
  }
];

interface ProjectRateConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function ProjectRateConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: ProjectRateConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving project rate settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Project Rate Settings"
      description="Configure project rates and billing rules"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}