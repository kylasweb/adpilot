import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorProps, ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'blockSettings',
    title: 'Block Settings',
    description: 'Configure content block properties',
    options: [
      {
        id: 'blockType',
        label: 'Block Type',
        type: 'select',
        value: 'text',
        options: [
          { label: 'Text Block', value: 'text' },
          { label: 'Image Gallery', value: 'gallery' },
          { label: 'Pricing Table', value: 'pricing' },
          { label: 'Timeline', value: 'timeline' },
          { label: 'Feature List', value: 'features' }
        ],
        description: 'Select the type of content block'
      },
      {
        id: 'blockWidth',
        label: 'Block Width',
        type: 'select',
        value: 'full',
        options: [
          { label: 'Full Width', value: 'full' },
          { label: 'Half Width', value: 'half' },
          { label: 'One-Third', value: 'third' }
        ],
        description: 'Set the width of the content block'
      }
    ]
  },
  {
    id: 'styling',
    title: 'Style Settings',
    description: 'Configure block appearance',
    options: [
      {
        id: 'backgroundColor',
        label: 'Background Color',
        type: 'select',
        value: 'white',
        options: [
          { label: 'White', value: 'white' },
          { label: 'Light Gray', value: 'gray' },
          { label: 'Brand Color', value: 'brand' },
          { label: 'Accent Color', value: 'accent' }
        ],
        description: 'Choose block background color'
      },
      {
        id: 'padding',
        label: 'Block Padding',
        type: 'select',
        value: 'medium',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' }
        ],
        description: 'Set content padding'
      },
      {
        id: 'borderEnabled',
        label: 'Show Border',
        type: 'boolean',
        value: false,
        description: 'Add border around the block'
      }
    ]
  },
  {
    id: 'content',
    title: 'Content Settings',
    description: 'Configure block content behavior',
    options: [
      {
        id: 'dynamicContent',
        label: 'Dynamic Content',
        type: 'boolean',
        value: false,
        description: 'Enable dynamic content population'
      },
      {
        id: 'contentSource',
        label: 'Content Source',
        type: 'select',
        value: 'manual',
        options: [
          { label: 'Manual Entry', value: 'manual' },
          { label: 'Project Data', value: 'project' },
          { label: 'Client Data', value: 'client' },
          { label: 'AI Generated', value: 'ai' }
        ],
        description: 'Select content population source'
      },
      {
        id: 'updateFrequency',
        label: 'Auto-Update Frequency',
        type: 'select',
        value: 'never',
        options: [
          { label: 'Never', value: 'never' },
          { label: 'On Open', value: 'open' },
          { label: 'Daily', value: 'daily' }
        ],
        description: 'Set content update frequency'
      }
    ]
  }
];

export function ContentBlockConfigurator({
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
      title="Content Block Configuration"
      description="Configure content block settings and appearance"
      open={open}
      onOpenChange={onOpenChange}
      sections={sections}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}