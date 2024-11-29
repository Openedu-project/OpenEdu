import type { TThemeTypeConfig } from '@oe/themes/types';

interface Field {
  id: string;
  type: 'text' | 'color' | 'number' | 'select' | 'switch' | 'image' | 'textarea' | 'radio';
  label: string;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  helperText?: string;
}

interface Tab {
  id: string;
  label: string;
  fields: Field[];
}

interface ContentConfig {
  title: string;
  description: string;
  tabs: Tab[];
}

// Components Configurations
const componentsConfig: Record<string, ContentConfig> = {
  header: {
    title: 'Header Component',
    description: 'Configure the site header appearance and behavior',
    tabs: [
      {
        id: 'style',
        label: 'Style',
        fields: [
          {
            id: 'backgroundColor',
            type: 'color',
            label: 'Background Color',
            defaultValue: '#ffffff',
          },
          {
            id: 'height',
            type: 'number',
            label: 'Header Height',
            defaultValue: 64,
            min: 40,
            max: 120,
          },
          {
            id: 'sticky',
            type: 'switch',
            label: 'Sticky Header',
            defaultValue: true,
          },
        ],
      },
      {
        id: 'layout',
        label: 'Layout',
        fields: [
          {
            id: 'layout',
            type: 'radio',
            label: 'Layout Type',
            defaultValue: 'default',
            options: [
              { label: 'Default', value: 'default' },
              { label: 'Centered', value: 'centered' },
              { label: 'Full Width', value: 'full' },
            ],
          },
        ],
      },
    ],
  },
  footer: {
    title: 'Footer Component',
    description: 'Configure the site footer appearance and content',
    tabs: [
      {
        id: 'content',
        label: 'Content',
        fields: [
          {
            id: 'columns',
            type: 'number',
            label: 'Number of Columns',
            defaultValue: 4,
            min: 1,
            max: 6,
          },
          {
            id: 'showSocial',
            type: 'switch',
            label: 'Show Social Links',
            defaultValue: true,
          },
        ],
      },
    ],
  },
};

// Site Settings Configurations
const siteSettingsConfig: Record<string, ContentConfig> = {
  'site-title': {
    title: 'Site Title & Branding',
    description: 'Configure your site title and basic SEO settings',
    tabs: [
      {
        id: 'general',
        label: 'General',
        fields: [
          {
            id: 'siteTitle',
            type: 'text',
            label: 'Site Title',
            placeholder: 'Enter your site title',
            helperText: 'This appears in browser tabs and search results',
          },
          {
            id: 'separator',
            type: 'text',
            label: 'Title Separator',
            defaultValue: '|',
            placeholder: 'e.g., |, -, or •',
          },
        ],
      },
    ],
  },
  'meta-description': {
    title: 'Meta Description',
    description: 'Set up your site meta description for better SEO',
    tabs: [
      {
        id: 'seo',
        label: 'SEO',
        fields: [
          {
            id: 'metaDescription',
            type: 'textarea',
            label: 'Meta Description',
            placeholder: 'Enter a description for search engines',
            helperText: 'Keep it between 150-160 characters for best results',
          },
        ],
      },
    ],
  },
};

// Page Section Configurations
const pageSectionsConfig: Record<string, Record<string, ContentConfig>> = {
  homepage: {
    'hero-section': {
      title: 'Hero Section',
      description: 'Configure the homepage hero section',
      tabs: [
        {
          id: 'content',
          label: 'Content',
          fields: [
            {
              id: 'heading',
              type: 'text',
              label: 'Heading',
              placeholder: 'Enter hero heading',
            },
            {
              id: 'subheading',
              type: 'text',
              label: 'Subheading',
              placeholder: 'Enter hero subheading',
            },
            {
              id: 'buttonText',
              type: 'text',
              label: 'Button Text',
              defaultValue: 'Learn More',
            },
          ],
        },
        {
          id: 'style',
          label: 'Style',
          fields: [
            {
              id: 'height',
              type: 'select',
              label: 'Section Height',
              defaultValue: 'medium',
              options: [
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
                { label: 'Full Screen', value: 'full' },
              ],
            },
            {
              id: 'background',
              type: 'image',
              label: 'Background Image',
            },
          ],
        },
      ],
    },
    slider: {
      title: 'Slider Section',
      description: 'Configure the homepage slider',
      tabs: [
        {
          id: 'settings',
          label: 'Settings',
          fields: [
            {
              id: 'autoplay',
              type: 'switch',
              label: 'Enable Autoplay',
              defaultValue: true,
            },
            {
              id: 'interval',
              type: 'number',
              label: 'Slide Interval (ms)',
              defaultValue: 5000,
              min: 2000,
              max: 10000,
            },
          ],
        },
      ],
    },
  },
};

// Helper function to get the appropriate configuration
export const getContentConfig = (menu: TThemeTypeConfig, key: string, page?: string): ContentConfig | null => {
  if (menu === 'components') {
    return componentsConfig[key] || null;
  }

  if (menu === 'site-setting') {
    return siteSettingsConfig[key] || null;
  }

  if (page) {
    return pageSectionsConfig[page]?.[key] || null;
  }

  return null;
};

export type { ContentConfig, Field, Tab };
