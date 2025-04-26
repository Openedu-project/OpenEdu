import type { Metadata } from 'next';
import { extractHtmlToText } from './helpers';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
    locale?: string;
    type?: 'website';
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  alternates?: {
    languages?: Record<string, string>;
    canonical?: string;
    types?: Record<string, string>;
  };
}

export function generateSEO({
  title,
  description,
  keywords = [],
  noindex = false,
  nofollow = false,
  openGraph,
  twitter,
  alternates,
}: SEOProps): Metadata {
  // Make sure the title does not exceed 60 characters
  const formattedTitle = title?.substring(0, 60);
  const formattedDescription = extractHtmlToText(description ?? '');

  return {
    title: formattedTitle,
    description: formattedDescription,
    keywords: ['openedu.net', ...keywords],

    // Robots settings
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },

    // Open Graph meta tags
    openGraph: {
      title: openGraph?.title || formattedTitle,
      description: openGraph?.description || formattedDescription,
      url: openGraph?.url || 'https://openedu.net',
      siteName: openGraph?.siteName || 'OpenEdu',
      images: openGraph?.images || [
        {
          url: 'https://openedu.net/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'OpenEdu',
        },
      ],
      locale: openGraph?.locale || 'vi_VN',
      type: openGraph?.type || 'website',
    },

    // Twitter meta tags
    twitter: {
      card: twitter?.card || 'summary_large_image',
      site: twitter?.site || '@openedu',
      creator: twitter?.creator || '@openedu',
      title: twitter?.title || formattedTitle,
      description: twitter?.description || formattedDescription,
      images: twitter?.image ? [twitter.image] : ['https://openedu.net/twitter-image.jpg'],
    },

    // Alternates configuration
    alternates: alternates || {
      canonical: 'https://openedu.net',
      languages: {
        'vi-VN': 'https://openedu.net/vi',
        'en-US': 'https://openedu.net/en',
      },
    },

    // Viewport settings
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
  };
}
