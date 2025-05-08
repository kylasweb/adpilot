import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const projectRateSections: ConfiguratorSection[] = [
  {
    id: 'rates',
    title: 'Project Rate Settings',
    description: 'Configure default rates and billing settings',
    options: [
      {
        id: 'defaultRate',
        label: 'Default Hourly Rate',
        description: 'Base hourly rate for new projects',
        type: 'number',
        value: 50
      },
      {
        id: 'currency',
        label: 'Currency',
        description: 'Currency for rates and billing',
        type: 'select',
        value: 'USD',
        options: [
          { label: 'USD ($)', value: 'USD' },
          { label: 'EUR (€)', value: 'EUR' },
          { label: 'GBP (£)', value: 'GBP' }
        ]
      },
      {
        id: 'minimumBillable',
        label: 'Minimum Billable Time',
        description: 'Minimum time that can be billed (in minutes)',
        type: 'number',
        value: 15
      }
    ]
  },
  {
    id: 'overtime',
    title: 'Overtime Rules',
    description: 'Configure overtime rates and thresholds',
    options: [
      {
        id: 'overtimeEnabled',
        label: 'Enable Overtime Rates',
        description: 'Apply different rates for overtime hours',
        type: 'boolean',
        value: false
      },
      {
        id: 'overtimeThreshold',
        label: 'Daily Overtime Threshold',
        description: 'Hours worked before overtime rate applies',
        type: 'number',
        value: 8
      },
      {
        id: 'overtimeMultiplier',
        label: 'Overtime Rate Multiplier',
        description: 'Multiplier for overtime hours (e.g., 1.5 for time-and-a-half)',
        type: 'number',
        value: 1.5
      }
    ]
  },
  {
    id: 'rounding',
    title: 'Rate Rounding',
    description: 'Configure how calculated amounts are rounded',
    options: [
      {
        id: 'roundingRule',
        label: 'Amount Rounding',
        description: 'How to round calculated amounts',
        type: 'select',
        value: 'nearest',
        options: [
          { label: 'Round to nearest cent', value: 'nearest' },
          { label: 'Round up to next cent', value: 'up' },
          { label: 'Round down to previous cent', value: 'down' }
        ]
      }
    ]
  }
];

interface ProjectRateConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
  initialValues?: Record<string, any>;
}

export function ProjectRateConfigurator({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  initialValues
}: ProjectRateConfiguratorProps) {
  return (
    <BaseConfiguratorDialog
      title="Project Rate Settings"
      description="Configure billing rates and overtime rules"
      open={open}
      onOpenChange={onOpenChange}
      sections={projectRateSections}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}