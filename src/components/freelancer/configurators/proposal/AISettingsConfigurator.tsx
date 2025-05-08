import React from 'react';
import { BaseConfiguratorDialog } from '../BaseConfiguratorDialog';
import { ConfiguratorSection } from '../types';

const sections: ConfiguratorSection[] = [
  {
    id: 'generation',
    title: 'AI Generation Settings',
    description: 'Configure AI proposal generation',
    options: [
      {
        id: 'aiModel',
        label: 'AI Model',
        type: 'select',
        value: 'gpt4',
        options: [
          { label: 'GPT-4 (Best Quality)', value: 'gpt4' },
          { label: 'GPT-3.5 (Faster)', value: 'gpt35' },
          { label: 'Custom Model', value: 'custom' }
        ],
        description: 'AI model for content generation'
      },
      {
        id: 'creativityLevel',
        label: 'Creativity Level',
        type: 'select',
        value: 'balanced',
        options: [
          { label: 'Conservative', value: 'conservative' },
          { label: 'Balanced', value: 'balanced' },
          { label: 'Creative', value: 'creative' },
          { label: 'Highly Creative', value: 'high' }
        ],
        description: 'Level of creativity in generated content'
      },
      {
        id: 'maxTokens',
        label: 'Max Tokens',
        type: 'number',
        value: 2000,
        min: 500,
        max: 4000,
        description: 'Maximum tokens per generation'
      }
    ]
  },
  {
    id: 'content',
    title: 'Content Enhancement',
    description: 'Configure AI content enhancement',
    options: [
      {
        id: 'enhancementFeatures',
        label: 'Enhancement Features',
        type: 'select',
        value: ['grammar', 'tone', 'persuasion'],
        multiple: true,
        options: [
          { label: 'Grammar Check', value: 'grammar' },
          { label: 'Tone Adjustment', value: 'tone' },
          { label: 'Persuasive Language', value: 'persuasion' },
          { label: 'Technical Review', value: 'technical' },
          { label: 'SEO Optimization', value: 'seo' }
        ],
        description: 'Content enhancement features'
      },
      {
        id: 'writingStyle',
        label: 'Writing Style',
        type: 'select',
        value: 'professional',
        options: [
          { label: 'Professional', value: 'professional' },
          { label: 'Conversational', value: 'conversational' },
          { label: 'Technical', value: 'technical' },
          { label: 'Academic', value: 'academic' }
        ],
        description: 'Preferred writing style'
      },
      {
        id: 'industryContext',
        label: 'Industry Context',
        type: 'select',
        value: ['technology', 'business'],
        multiple: true,
        options: [
          { label: 'Technology', value: 'technology' },
          { label: 'Business', value: 'business' },
          { label: 'Healthcare', value: 'healthcare' },
          { label: 'Education', value: 'education' },
          { label: 'Creative', value: 'creative' }
        ],
        description: 'Industry-specific context'
      }
    ]
  },
  {
    id: 'optimization',
    title: 'AI Optimization',
    description: 'Configure AI optimization settings',
    options: [
      {
        id: 'targetAudience',
        label: 'Target Audience',
        type: 'select',
        value: ['executive', 'technical'],
        multiple: true,
        options: [
          { label: 'Executive Level', value: 'executive' },
          { label: 'Technical Team', value: 'technical' },
          { label: 'Marketing Team', value: 'marketing' },
          { label: 'General Business', value: 'business' },
          { label: 'Custom', value: 'custom' }
        ],
        description: 'Target audience for optimization'
      },
      {
        id: 'optimizationGoals',
        label: 'Optimization Goals',
        type: 'select',
        value: ['clarity', 'persuasion'],
        multiple: true,
        options: [
          { label: 'Clarity', value: 'clarity' },
          { label: 'Persuasion', value: 'persuasion' },
          { label: 'Technical Accuracy', value: 'technical' },
          { label: 'Engagement', value: 'engagement' },
          { label: 'Conversion', value: 'conversion' }
        ],
        description: 'Content optimization goals'
      },
      {
        id: 'confidentiality',
        label: 'Data Confidentiality',
        type: 'boolean',
        value: true,
        description: 'Ensure data privacy in AI processing'
      }
    ]
  },
  {
    id: 'review',
    title: 'AI Review Settings',
    description: 'Configure AI review process',
    options: [
      {
        id: 'reviewCriteria',
        label: 'Review Criteria',
        type: 'select',
        value: ['completeness', 'accuracy'],
        multiple: true,
        options: [
          { label: 'Completeness', value: 'completeness' },
          { label: 'Technical Accuracy', value: 'accuracy' },
          { label: 'Value Proposition', value: 'value' },
          { label: 'Competitive Analysis', value: 'competitive' },
          { label: 'Risk Assessment', value: 'risk' }
        ],
        description: 'AI review criteria'
      },
      {
        id: 'autoReview',
        label: 'Automated Review',
        type: 'boolean',
        value: true,
        description: 'Enable automated AI review'
      },
      {
        id: 'feedbackLoop',
        label: 'Feedback Loop',
        type: 'boolean',
        value: true,
        description: 'Enable AI learning from feedback'
      }
    ]
  }
];

interface AISettingsConfiguratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsUpdate?: (settings: Record<string, any>) => Promise<void>;
}

export function AISettingsConfigurator({
  open,
  onOpenChange,
  onSettingsUpdate
}: AISettingsConfiguratorProps) {
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (onSettingsUpdate) {
        await onSettingsUpdate(values);
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving AI settings:', error);
      // TODO: Show error toast
    }
  };

  return (
    <BaseConfiguratorDialog
      title="AI Settings"
      description="Configure AI-powered proposal generation and enhancement"
      sections={sections}
      onSubmit={handleSubmit}
      onCancel={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}