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
        id: 'defaultTerms',
        label: 'Default Terms',
        type: 'select',
        value: 'net30',
        options: [
          { label: 'Due on Receipt', value: 'due' },
          { label: 'Net 15', value: 'net15' },
          { label: 'Net 30', value: 'net30' },
          { label: 'Net 45', value: 'net45' },
          { label: 'Net 60', value: 'net60' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Default payment terms for new invoices'
      },
      {
        id: 'customDueDays',
        label: 'Custom Due Days',
        type: 'number',
        value: 30,
        min: 1,
        max: 180,
        description: 'Number of days for custom payment terms'
      },
      {
        id: 'earlyPaymentDiscount',
        label: 'Early Payment Discount (%)',
        type: 'number',
        value: 2,
        min: 0,
        max: 100,
        description: 'Discount for early payment'
      }
    ]
  },
  {
    id: 'methods',
    title: 'Payment Methods',
    description: 'Configure accepted payment methods',
    options: [
      {
        id: 'acceptedMethods',
        label: 'Accepted Methods',
        type: 'select',
        value: ['bank', 'card', 'paypal'],
        multiple: true,
        options: [
          { label: 'Bank Transfer', value: 'bank' },
          { label: 'Credit Card', value: 'card' },
          { label: 'PayPal', value: 'paypal' },
          { label: 'Stripe', value: 'stripe' },
          { label: 'Cash', value: 'cash' },
          { label: 'Crypto', value: 'crypto' }
        ],
        description: 'Accepted payment methods'
      },
      {
        id: 'preferredMethod',
        label: 'Preferred Method',
        type: 'select',
        value: 'bank',
        options: [
          { label: 'Bank Transfer', value: 'bank' },
          { label: 'Credit Card', value: 'card' },
          { label: 'PayPal', value: 'paypal' },
          { label: 'Stripe', value: 'stripe' }
        ],
        description: 'Preferred payment method'
      },
      {
        id: 'onlinePayments',
        label: 'Online Payments',
        type: 'boolean',
        value: true,
        description: 'Enable online payment options'
      }
    ]
  },
  {
    id: 'late',
    title: 'Late Payment Settings',
    description: 'Configure late payment policies',
    options: [
      {
        id: 'lateFee',
        label: 'Late Fee Type',
        type: 'select',
        value: 'percentage',
        options: [
          { label: 'Percentage', value: 'percentage' },
          { label: 'Fixed Amount', value: 'fixed' },
          { label: 'Both', value: 'both' },
          { label: 'None', value: 'none' }
        ],
        description: 'Type of late payment fee'
      },
      {
        id: 'lateFeePercentage',
        label: 'Late Fee Percentage (%)',
        type: 'number',
        value: 5,
        min: 0,
        max: 100,
        description: 'Percentage for late payment fee'
      },
      {
        id: 'lateFeeFixed',
        label: 'Fixed Late Fee Amount',
        type: 'number',
        value: 50,
        min: 0,
        description: 'Fixed amount for late fee'
      },
      {
        id: 'gracePeriod',
        label: 'Grace Period (days)',
        type: 'number',
        value: 3,
        min: 0,
        max: 30,
        description: 'Grace period before late fees apply'
      }
    ]
  },
  {
    id: 'installments',
    title: 'Installment Settings',
    description: 'Configure payment installments',
    options: [
      {
        id: 'allowInstallments',
        label: 'Allow Installments',
        type: 'boolean',
        value: true,
        description: 'Enable payment in installments'
      },
      {
        id: 'maxInstallments',
        label: 'Maximum Installments',
        type: 'number',
        value: 3,
        min: 2,
        max: 12,
        description: 'Maximum number of installments'
      },
      {
        id: 'installmentFee',
        label: 'Installment Fee (%)',
        type: 'number',
        value: 2,
        min: 0,
        max: 100,
        description: 'Fee for payment in installments'
      }
    ]
  }
];

interface PaymentTermsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function PaymentTermsConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: PaymentTermsConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving payment terms settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Payment Terms Settings"
      description="Configure payment terms and conditions"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}