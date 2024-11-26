import withBundleAnalyzer from '@next/bundle-analyzer';
import { withNextIntl } from '@oe/i18n/config';
// import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next/types';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// export const withNextIntl = createNextIntlPlugin();

export function getNextConfig(config: NextConfig = {}): NextConfig {
  const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    transpilePackages: ['@oe/core', '@oe/ui', '@oe/i18n', '@oe/api', '@oe/assets'],
    // experimental: {
    //   optimizePackageImports: ['icon-library'],
    // },
    experimental: {
      ppr: 'incremental',
      reactCompiler: true,
      optimizeServerReact: true,
    },
    images: {
      loader: 'default',
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.NEXT_PUBLIC_MEDIA_CDN_HOST ?? '',
          pathname: process.env.NODE_ENV === 'development' ? '/images/**' : '/**',
        },
        {
          protocol: 'https',
          hostname: 'qr.sepay.vn',
          pathname: '/**',
        },
      ],
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    ...config,
  };

  return bundleAnalyzer(withNextIntl(nextConfig));
}
