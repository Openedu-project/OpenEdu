// import withBundleAnalyzer from '@next/bundle-analyzer';
// import { withNextIntl } from '@oe/i18n';
// // import createNextIntlPlugin from 'next-intl/plugin';

// const bundleAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

// export const withNextIntl = createNextIntlPlugin();
// import crypto from 'node:crypto';
import type { NextConfig } from 'next/types';

// const frameworkRegex = /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|next|@next)[\\/]/;
// const libRegex = /node_modules[/\\]/;
// const libFilesRegex = /node_modules[/\\](.*?)([/\\]|$)/;

export function getNextConfig(config: NextConfig = {}): NextConfig {
  // const nextConfig: NextConfig = {
  //   reactStrictMode: true,
  //   // output: 'standalone',
  //   transpilePackages: ['@oe/core', '@oe/ui', '@oe/i18n', '@oe/api', '@oe/assets'],
  //   experimental: {
  //     // ppr: 'incremental',
  //     reactCompiler: true,
  //     optimizeServerReact: true,
  //     optimizePackageImports: ['@oe/core', '@oe/ui', '@oe/i18n', '@oe/api', '@oe/assets'],
  //   },
  //   images: {
  //     loader: 'default',
  //     formats: ['image/avif', 'image/webp'],
  //     remotePatterns: [
  //       {
  //         protocol: 'https',
  //         hostname: process.env.NEXT_PUBLIC_MEDIA_CDN_HOST ?? '',
  //         pathname: process.env.NODE_ENV === 'development' ? '/**' : '/**',
  //       },
  //       {
  //         protocol: 'https',
  //         hostname: 's3.ap-southeast-1.amazonaws.com',
  //         pathname: '/**',
  //       },
  //       {
  //         protocol: 'https',
  //         hostname: 'qr.sepay.vn',
  //         pathname: '/**',
  //       },
  //     ],
  //   },
  //   typescript: {
  //     // !! WARN !!
  //     // Dangerously allow production builds to successfully complete even if
  //     // your project has type errors.
  //     // !! WARN !!
  //     ignoreBuildErrors: true,
  //   },
  //   eslint: {
  //     // Warning: This allows production builds to successfully complete even if
  //     // your project has ESLint errors.
  //     ignoreDuringBuilds: true,
  //   },
  //   ...config,
  // };
  // return nextConfig;
  // // return bundleAnalyzer(withNextIntl(nextConfig));
  const internalPackages = [
    '@oe/ui',
    '@oe/config',
    '@oe/core',
    '@oe/types',
    '@oe/api',
    '@oe/i18n',
    '@oe/assets',
    '@oe/dashboard',
    '@oe/themes',
  ];
  const externalPackages = [
    'radix-ui',
    'radix-ui/internal',
    'sonner',
    'lucide-react',
    'react-hook-form',
    'zod',
    'zustand',
    'swr',
    'react-day-picker',
    'date-fns',
    'input-otp',
    'recharts',
    'react-chartjs-2',
    'chart.js',
    'chartjs-plugin-datalabels',
    'react-day-picker',
    'date-fns',
    'input-otp',
    'recharts',
    'react-chartjs-2',
    'chart.js',
  ];
  const imageRemotePatterns = config.images?.remotePatterns || [];
  const nextConfig: NextConfig = {
    ...config,
    output: 'standalone' as const,
    poweredByHeader: false,
    transpilePackages: [...(config.transpilePackages ?? [])],
    // headers: async () => [
    //   {
    //     source: '/(.*)',
    //     headers: [
    //       {
    //         key: 'Content-Security-Policy',
    //         value:
    //           "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://res.cloudinary.com; font-src 'self' data:; connect-src 'self' https://*.openedu.com https://api.openedu.com https://*.algolia.net https://*.algolianet.com https://vitals.vercel-insights.com;",
    //       },
    //       { key: 'X-DNS-Prefetch-Control', value: 'on' },
    //       { key: 'X-Frame-Options', value: 'DENY' },
    //       { key: 'X-Content-Type-Options', value: 'nosniff' },
    //       { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
    //       { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    //     ],
    //   },
    // ],
    // outputFileTracingRoot: join(__dirname, '../../'),
    experimental: {
      ppr: 'incremental',
      optimizePackageImports: [
        ...internalPackages,
        ...externalPackages,
        ...(config.experimental?.optimizePackageImports ?? []),
      ],
      optimizeServerReact: true,
      inlineCss: true,
      reactCompiler: true,
      ...config.experimental,
    },
    serverExternalPackages: ['sharp'],
    images: {
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
        ...imageRemotePatterns,
      ],
      minimumCacheTTL: 31536000,
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      ...config.images,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };

  return nextConfig;
}
