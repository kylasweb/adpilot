import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'blocks',
    title: 'Content Blocks',
    description: 'Configure available content blocks',
    options: [
      {
        id: 'enabledBlocks',
        label: 'Enabled Blocks',
        type: 'select',
        value: ['text', 'image', 'table'],
        multiple: true,
        options: [
          { label: 'Text Block', value: 'text' },
          { label: 'Image Block', value: 'image' },
          { label: 'Table Block', value: 'table' },
          { label: 'Quote Block', value: 'quote' },
          { label: 'List Block', value: 'list' },
          { label: 'Code Block', value: 'code' },
          { label: 'Chart Block', value: 'chart' },
          { label: 'Video Block', value: 'video' }
        ],
        description: 'Available content block types'
      },
      {
        id: 'defaultBlock',
        label: 'Default Block',
        type: 'select',
        value: 'text',
        options: [
          { label: 'Text Block', value: 'text' },
          { label: 'Image Block', value: 'image' },
          { label: 'Table Block', value: 'table' },
          { label: 'List Block', value: 'list' }
        ],
        description: 'Default block type when adding content'
      },
      {
        id: 'customBlocks',
        label: 'Allow Custom Blocks',
        type: 'boolean',
        value: true,
        description: 'Enable custom block creation'
      }
    ]
  },
  {
    id: 'formatting',
    title: 'Block Formatting',
    description: 'Configure block formatting options',
    options: [
      {
        id: 'textStyles',
        label: 'Text Styles',
        type: 'select',
        value: ['heading', 'paragraph', 'emphasis'],
        multiple: true,
        options: [
          { label: 'Headings', value: 'heading' },
          { label: 'Paragraphs', value: 'paragraph' },
          { label: 'Emphasis', value: 'emphasis' },
          { label: 'Links', value: 'links' },
          { label: 'Code', value: 'code' }
        ],
        description: 'Available text styling options'
      },
      {
        id: 'layoutOptions',
        label: 'Layout Options',
        type: 'select',
        value: ['full', 'split', 'cards'],
        multiple: true,
        options: [
          { label: 'Full Width', value: 'full' },
          { label: 'Split View', value: 'split' },
          { label: 'Card Layout', value: 'cards' },
          { label: 'Grid Layout', value: 'grid' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Block layout options'
      },
      {
        id: 'responsiveDesign',
        label: 'Responsive Design',
        type: 'boolean',
        value: true,
        description: 'Enable responsive block layouts'
      }
    ]
  },
  {
    id: 'media',
    title: 'Media Settings',
    description: 'Configure media block settings',
    options: [
      {
        id: 'imageSettings',
        label: 'Image Settings',
        type: 'select',
        value: ['resize', 'optimize'],
        multiple: true,
        options: [
          { label: 'Auto Resize', value: 'resize' },
          { label: 'Image Optimization', value: 'optimize' },
          { label: 'Lazy Loading', value: 'lazy' },
          { label: 'Captions', value: 'captions' },
          { label: 'Alt Text', value: 'alt' }
        ],
        description: 'Image handling options'
      },
      {
        id: 'videoSettings',
        label: 'Video Settings',
        type: 'select',
        value: ['embed', 'autoplay'],
        multiple: true,
        options: [
          { label: 'Embed Support', value: 'embed' },
          { label: 'Autoplay', value: 'autoplay' },
          { label: 'Controls', value: 'controls' },
          { label: 'Responsive', value: 'responsive' }
        ],
        description: 'Video handling options'
      },
      {
        id: 'mediaLibrary',
        label: 'Media Library',
        type: 'boolean',
        value: true,
        description: 'Enable media library integration'
      }
    ]
  },
  {
    id: 'interaction',
    title: 'Interactive Features',
    description: 'Configure block interactions',
    options: [
      {
        id: 'dragDrop',
        label: 'Drag & Drop',
        type: 'boolean',
        value: true,
        description: 'Enable drag and drop reordering'
      },
      {
        id: 'inlineEditing',
        label: 'Inline Editing',
        type: 'boolean',
        value: true,
        description: 'Enable inline content editing'
      },
      {
        id: 'interactiveElements',
        label: 'Interactive Elements',
        type: 'select',
        value: ['buttons', 'forms'],
        multiple: true,
        options: [
          { label: 'Buttons', value: 'buttons' },
          { label: 'Forms', value: 'forms' },
          { label: 'Tooltips', value: 'tooltips' },
          { label: 'Accordions', value: 'accordions' },
          { label: 'Tabs', value: 'tabs' }
        ],
        description: 'Interactive block elements'
      }
    ]
  }
];

interface ContentBlockConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function ContentBlockConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: ContentBlockConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving content block settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Content Block Settings"
      description="Configure content block types and formatting"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}