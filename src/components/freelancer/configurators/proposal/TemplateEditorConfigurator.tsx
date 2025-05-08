import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'layout',
    title: 'Template Layout',
    description: 'Configure proposal template layout',
    options: [
      {
        id: 'templateStyle',
        label: 'Template Style',
        type: 'select',
        value: 'professional',
        options: [
          { label: 'Professional', value: 'professional' },
          { label: 'Modern', value: 'modern' },
          { label: 'Creative', value: 'creative' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Overall template style'
      },
      {
        id: 'sections',
        label: 'Template Sections',
        type: 'select',
        value: ['cover', 'summary', 'scope', 'pricing'],
        multiple: true,
        options: [
          { label: 'Cover Page', value: 'cover' },
          { label: 'Executive Summary', value: 'summary' },
          { label: 'Project Scope', value: 'scope' },
          { label: 'Pricing Table', value: 'pricing' },
          { label: 'Timeline', value: 'timeline' },
          { label: 'Team', value: 'team' },
          { label: 'Terms', value: 'terms' },
          { label: 'Testimonials', value: 'testimonials' }
        ],
        description: 'Sections to include in proposal'
      },
      {
        id: 'pageSize',
        label: 'Page Size',
        type: 'select',
        value: 'a4',
        options: [
          { label: 'A4', value: 'a4' },
          { label: 'Letter', value: 'letter' },
          { label: 'Legal', value: 'legal' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Proposal page size'
      }
    ]
  },
  {
    id: 'branding',
    title: 'Branding Settings',
    description: 'Configure proposal branding elements',
    options: [
      {
        id: 'colorScheme',
        label: 'Color Scheme',
        type: 'select',
        value: 'brand',
        options: [
          { label: 'Brand Colors', value: 'brand' },
          { label: 'Professional Blue', value: 'blue' },
          { label: 'Modern Gray', value: 'gray' },
          { label: 'Creative Purple', value: 'purple' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Color scheme for the proposal'
      },
      {
        id: 'brandingElements',
        label: 'Branding Elements',
        type: 'select',
        value: ['logo', 'colors', 'fonts'],
        multiple: true,
        options: [
          { label: 'Logo', value: 'logo' },
          { label: 'Brand Colors', value: 'colors' },
          { label: 'Custom Fonts', value: 'fonts' },
          { label: 'Watermark', value: 'watermark' },
          { label: 'Header/Footer', value: 'headerFooter' }
        ],
        description: 'Branding elements to include'
      },
      {
        id: 'customBranding',
        label: 'Allow Client Branding',
        type: 'boolean',
        value: true,
        description: 'Use client branding when available'
      }
    ]
  },
  {
    id: 'content',
    title: 'Content Settings',
    description: 'Configure proposal content options',
    options: [
      {
        id: 'contentBlocks',
        label: 'Content Blocks',
        type: 'select',
        value: ['text', 'table', 'image'],
        multiple: true,
        options: [
          { label: 'Text Block', value: 'text' },
          { label: 'Table', value: 'table' },
          { label: 'Image Gallery', value: 'image' },
          { label: 'Timeline', value: 'timeline' },
          { label: 'Charts', value: 'charts' },
          { label: 'Video', value: 'video' }
        ],
        description: 'Available content block types'
      },
      {
        id: 'textFormatting',
        label: 'Text Formatting',
        type: 'select',
        value: ['headings', 'lists', 'quotes'],
        multiple: true,
        options: [
          { label: 'Headings', value: 'headings' },
          { label: 'Lists', value: 'lists' },
          { label: 'Blockquotes', value: 'quotes' },
          { label: 'Code Blocks', value: 'code' },
          { label: 'Tables', value: 'tables' }
        ],
        description: 'Available text formatting options'
      },
      {
        id: 'dynamicContent',
        label: 'Dynamic Content',
        type: 'boolean',
        value: true,
        description: 'Enable dynamic content placeholders'
      }
    ]
  },
  {
    id: 'export',
    title: 'Export Settings',
    description: 'Configure proposal export options',
    options: [
      {
        id: 'exportFormats',
        label: 'Export Formats',
        type: 'select',
        value: ['pdf', 'docx'],
        multiple: true,
        options: [
          { label: 'PDF', value: 'pdf' },
          { label: 'Word (DOCX)', value: 'docx' },
          { label: 'HTML', value: 'html' },
          { label: 'Plain Text', value: 'txt' }
        ],
        description: 'Available export formats'
      },
      {
        id: 'securityOptions',
        label: 'Security Options',
        type: 'select',
        value: ['password', 'watermark'],
        multiple: true,
        options: [
          { label: 'Password Protection', value: 'password' },
          { label: 'Watermark', value: 'watermark' },
          { label: 'Digital Signature', value: 'signature' },
          { label: 'Copy Protection', value: 'copy' }
        ],
        description: 'Document security options'
      },
      {
        id: 'compressionLevel',
        label: 'Compression Level',
        type: 'select',
        value: 'medium',
        options: [
          { label: 'High Quality', value: 'high' },
          { label: 'Medium', value: 'medium' },
          { label: 'Low (Smaller Size)', value: 'low' }
        ],
        description: 'Export file compression level'
      }
    ]
  }
];

interface TemplateEditorConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function TemplateEditorConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: TemplateEditorConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving template settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="Proposal Template Settings"
      description="Configure proposal template layout and content"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}