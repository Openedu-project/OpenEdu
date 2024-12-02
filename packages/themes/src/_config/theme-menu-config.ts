import type { TThemeMenuDefinition } from '../types';

export const THEME_SETTINGS_MENU: TThemeMenuDefinition = [
  {
    type: 'group',
    key: 'colors',
    label: 'Color',
    items: [
      {
        key: 'light',
        label: 'Light',
        href: '/theme/colors/light',
        items: [],
      },
      {
        key: 'dark',
        label: 'Dark',
        href: '/theme/colors/dark',
        items: [],
      },
    ],
  },
  {
    type: 'group',
    key: 'css',
    label: 'CSS',
    items: [
      {
        key: 'font',
        label: 'Font',
        href: '/theme/font',
        items: [],
      },
      {
        key: 'container',
        label: 'Container',
        href: '/theme/container',
        items: [],
      },
      {
        key: 'radius',
        label: 'Radius',
        href: '/theme/radius',
        items: [],
      },
      {
        key: 'key-frames',
        label: 'Keyframes',
        href: '/theme/keyframes',
        items: [],
      },
      {
        key: 'animations',
        label: 'Animations',
        href: '/theme/animations',
        items: [],
      },
    ],
  },
];

// System-wide Components settings
export const COMPONENTS_MENU: TThemeMenuDefinition = [
  {
    type: 'group',
    key: 'layout-components',
    label: 'Layout',
    items: [
      {
        key: 'header',
        label: 'Header',
        href: '/components/header',
        items: [],
      },
      {
        key: 'footer',
        label: 'Footer',
        href: '/components/footer',
        items: [],
      },
      {
        key: 'navigation',
        label: 'Navigation',
        href: '/components/navigation',
        items: [],
      },
    ],
  },
  {
    type: 'group',
    key: 'common-components',
    label: 'Common Components',
    items: [
      {
        key: 'button',
        label: 'Button',
        href: '/components/button',
        items: [],
      },
      {
        key: 'card',
        label: 'Card',
        href: '/components/card',
        items: [],
      },
      {
        key: 'form',
        label: 'Form',
        href: '/components/form',
        items: [],
      },
      {
        key: 'table',
        label: 'Table',
        href: '/components/table',
        items: [],
      },
    ],
  },
];

// System-wide SEO settings
export const SITE_SETTINGS_MENU: TThemeMenuDefinition = [
  {
    type: 'group',
    key: 'seo',
    label: 'SEO',
    items: [
      {
        key: 'site-title',
        label: 'Site Title',
        href: '/site/title',
        items: [],
      },
      {
        key: 'meta-description',
        label: 'Meta Description',
        href: '/site/meta-description',
        items: [],
      },
      {
        key: 'favicon',
        label: 'Favicon',
        href: '/site/favicon',
        items: [],
      },
      {
        key: 'robots',
        label: 'Robots.txt',
        href: '/site/robots',
        items: [],
      },
    ],
  },
  {
    type: 'group',
    key: 'analytics',
    label: 'Analytics',
    items: [
      {
        key: 'google-analytics',
        label: 'Google Analytics',
        href: '/site/google-analytics',
        items: [],
      },
      {
        key: 'facebook-pixel',
        label: 'Facebook Pixel',
        href: '/site/facebook-pixel',
        items: [],
      },
    ],
  },
];

// Page-specific sections
export const PAGE_SECTIONS: Record<string, TThemeMenuDefinition> = {
  homepage: [
    {
      type: 'group',
      key: 'homepage-sections',
      label: 'Homepage Sections',
      items: [
        {
          key: 'hero-section',
          label: 'Hero Section',
          href: '/pages/homepage/hero',
          items: [],
        },
        {
          key: 'slider',
          label: 'Slider',
          href: '/pages/homepage/slider',
          items: [],
        },
        {
          key: 'banner',
          label: 'Banner',
          href: '/pages/homepage/banner',
          items: [],
        },
        {
          key: 'featured-products',
          label: 'Featured Products',
          href: '/pages/homepage/featured',
          items: [],
        },
        {
          key: 'categories',
          label: 'Categories',
          href: '/pages/homepage/categories',
          items: [],
        },
      ],
    },
  ],
  'about-us': [
    {
      type: 'group',
      key: 'about-sections',
      label: 'About Us Sections',
      items: [
        {
          key: 'company-intro',
          label: 'Company Intro',
          href: '/pages/about/intro',
          items: [],
        },
        {
          key: 'team',
          label: 'Team',
          href: '/pages/about/team',
          items: [],
        },
        {
          key: 'mission',
          label: 'Mission & Vision',
          href: '/pages/about/mission',
          items: [],
        },
        {
          key: 'history',
          label: 'History',
          href: '/pages/about/history',
          items: [],
        },
      ],
    },
  ],
  'contact-us': [
    {
      type: 'group',
      key: 'contact-sections',
      label: 'Contact Sections',
      items: [
        {
          key: 'contact-form',
          label: 'Contact Form',
          href: '/pages/contact/form',
          items: [],
        },
        {
          key: 'contact-info',
          label: 'Contact Information',
          href: '/pages/contact/info',
          items: [],
        },
        {
          key: 'map',
          label: 'Map',
          href: '/pages/contact/map',
          items: [],
        },
      ],
    },
  ],
};
