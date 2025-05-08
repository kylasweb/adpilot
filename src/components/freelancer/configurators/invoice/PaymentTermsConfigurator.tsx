import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'terms',
    title: 'Payment Terms',
    description: 'Configure standard payment terms',
    options: [
      {
        id: 'defaultPaymentTerm',
        label: 'Default Term',
        type: 'select',
        value: 'net30',
        options: [
          { label: 'Net 30', value: 'net30' },
          { label: 'Net 15', value: 'net15' },
          { label: 'Due on Receipt', value: 'immediate' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Standard payment term for invoices'
      },
      {
        id: 'customDays',
        label: 'Custom Days',
        type: 'number',
        value: 30,
        description: 'Number of days for custom payment term'
      },
      {
        id: 'earlyPaymentDiscount',
        label: 'Early Payment Discount (%)',
        type: 'number',
        value: 2,
        description: 'Discount percentage for early payments'
      }
    ]
  },
  {
    id: 'lateFees',
    title: 'Late Payment Fees',
    description: 'Configure late payment penalties',
    options: [
      {
        id: 'enableLateFees',
        label: 'Enable Late Fees',
        type: 'boolean',
        value: true,
        description: 'Apply fees to late payments'
      },
      {
        id: 'lateFeePercentage',
        label: 'Late Fee Percentage',
        type: 'number',
        value: 1.5,
        description: 'Monthly late fee percentage'
      },
      {
        id: 'gracePeriodDays',
        label: 'Grace Period (Days)',
        type: 'number',
        value: 5,
        description: 'Days after due date before late fees apply'
      }
    ]
  },
  {
    id: 'methods',
    title: 'Payment Methods',
    description: 'Configure accepted payment methods',
    options: [
      {
        id: 'bankTransfer',
        label: 'Bank Transfer',
        type: 'boolean',
        value: true,
        description: 'Accept bank transfer payments'
      },
      {
        id: 'creditCard',
        label: 'Credit Card',
        type: 'boolean',
        value: true,
        description: 'Accept credit card payments'
      },
      {
        id: 'paypal',
        label: 'PayPal',
        type: 'boolean',
        value: true,
        description: 'Accept PayPal payments'
      },
      {
        id: 'crypto',
        label: 'Cryptocurrency',
        type: 'boolean',
        value: false,
        description: 'Accept cryptocurrency payments'
      }
    ]
  }
];

interface PaymentTermsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentTermsConfigurator({ open, onOpenChange }: PaymentTermsConfiguratorProps) {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Saving payment terms settings:', values);
    // TODO: Implement payment terms save logic
    onOpenChange(false);
  };

  return (
    <BaseConfiguratorDialog
      title="Payment Terms"
      description="Configure payment terms and conditions for your invoices"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}