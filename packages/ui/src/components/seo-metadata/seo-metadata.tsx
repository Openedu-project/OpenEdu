import bannerOpenEdu from "@oe/assets/images/openedu-homepage/hero-banner/hero-banner.png";
import { extractHtmlToText } from "@oe/core";
import type { Metadata } from "next";

export interface SEOProps {
  title?: string | { absolute: string };
  description?: string;
  keywords?: string | string[];
  author?: string;
  canonicalUrl?: string;
  path?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string;
  favicon?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * SEO Component for Metadata
 */
export function SEOMetadata(props: SEOProps = {}): Metadata {
  const {
    title,
    description = "",
    keywords,
    author,
    canonicalUrl = "https://openedu.net",
    path = "",
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard = "summary_large_image",
    twitterSite = "@openedu",
    favicon,
    robots,
    noindex = false,
    nofollow = false,
  } = props;

  // Format title
  const baseTitle = typeof title === "string" ? title : title?.absolute;
  const formattedTitle = baseTitle?.substring(0, 60) || "OpenEdu";

  // Format description
  const formattedDescription = extractHtmlToText(description);

  // Keywords
  const keywordsList = [
    "openedu.net",
    ...(typeof keywords === "string"
      ? keywords.split(",").map((k) => k.trim())
      : keywords || []),
  ];

  // Robots
  const shouldIndex = robots?.index ?? !noindex;
  const shouldFollow = robots?.follow ?? !nofollow;

  // Canonical URL
  const fullPath = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = `${canonicalUrl}${path ? fullPath : ""}`;

  // Open Graph Image
  const resolvedOGImage = ogImage?.url
    ? {
        url: ogImage.url,
        width: ogImage.width ?? 1200,
        height: ogImage.height ?? 630,
        alt: ogImage.alt || ogTitle || formattedTitle,
      }
    : {
        url: bannerOpenEdu.src,
        width: 1200,
        height: 630,
        alt: ogTitle || formattedTitle,
      };

  return {
    title:
      typeof title === "string" ? formattedTitle : { absolute: formattedTitle },
    description: formattedDescription,
    keywords: keywordsList,

    ...(author && { authors: [{ name: author }] }),

    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: ogTitle || formattedTitle,
      description: ogDescription || formattedDescription,
      url: fullUrl,
      siteName: "OpenEdu",
      images: [resolvedOGImage],
      locale: "vi_VN",
      type: "website",
    },

    twitter: {
      card: twitterCard,
      site: twitterSite,
      title: ogTitle || formattedTitle,
      description: ogDescription || formattedDescription,
      images: ogImage?.url ? [ogImage.url] : [],
    },

    metadataBase: new URL(canonicalUrl),

    alternates: {
      canonical: fullUrl,
      languages: {
        "vi-VN": "/vi",
        "en-US": "/en",
      },
    },

    ...(favicon && {
      icons: {
        icon: favicon,
        apple: favicon,
      },
    }),

    // viewport: {
    //   width: 'device-width',
    //   initialScale: 1,
    //   maximumScale: 5,
    // },
  };
}
