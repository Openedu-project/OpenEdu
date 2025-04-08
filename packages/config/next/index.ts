// import withBundleAnalyzer from '@next/bundle-analyzer';
// import { withNextIntl } from '@oe/i18n/config';
// // import createNextIntlPlugin from 'next-intl/plugin';

// const bundleAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

// export const withNextIntl = createNextIntlPlugin();
import type { NextConfig } from 'next/types';

export function getNextConfig(config: NextConfig = {}): NextConfig {
  const nextConfig: NextConfig = {
    reactStrictMode: true,
    // output: 'standalone',
    transpilePackages: ['@oe/core', '@oe/ui', '@oe/i18n', '@oe/api', '@oe/assets'],
    experimental: {
      // ppr: 'incremental',
      reactCompiler: true,
      optimizeServerReact: true,
      optimizePackageImports: ['@oe/core', '@oe/ui', '@oe/i18n', '@oe/api', '@oe/assets'],
    },
    images: {
      loader: 'default',
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.NEXT_PUBLIC_MEDIA_CDN_HOST ?? '',
          pathname: process.env.NODE_ENV === 'development' ? '/**' : '/**',
        },
        {
          protocol: 'https',
          hostname: 's3.ap-southeast-1.amazonaws.com',
          pathname: '/**',
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
  return nextConfig;
  // return bundleAnalyzer(withNextIntl(nextConfig));
}
