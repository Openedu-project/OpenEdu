import withBundleAnalyzer from '@next/bundle-analyzer';
import { getNextConfig } from '@oe/config/next';
// import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next/types';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// export const withNextIntl = createNextIntlPlugin('./src/config/i18n-request-config.ts');

// const { NEXT_PUBLIC_APP_ADMIN_ORIGIN } = process.env;

const nextConfig: NextConfig = getNextConfig({
  turbopack: {
    resolveAlias: {
      '@/*': './src/*',
      '@oe/ui': '../../packages/ui/src',
      '@oe/core': '../../packages/core/src',
      '@oe/types': '../../packages/types/src',
      '@oe/api': '../../packages/api/src',
      '@oe/config': '../../packages/config',
      '@oe/i18n': '../../packages/i18n/src',
      '@oe/themes': '../../packages/themes/src',
      '@oe/assets': '../../packages/assets/src',
      '@oe/dashboard': '../../packages/dashboard/src',
      'next-intl/config': './src/config/i18n-request-config.ts',
    },
  },
  ...(!process.env.TURBOPACK && {
    webpack: (config) => {
      config.resolve.alias['next-intl/config'] = './src/config/i18n-request-config.ts';
      return config;
    },
  }),
  // async rewrites() {
  //   return [
  //     // {
  //     //   source: '/:locale/admin',
  //     //   destination: `${NEXT_PUBLIC_APP_ADMIN_ORIGIN}/:locale/`,
  //     // },
  //     {
  //       source: '/:locale/admin/:path*',
  //       destination: `${NEXT_PUBLIC_APP_ADMIN_ORIGIN}/:locale/admin/:path*`,
  //     },
  //     {
  //       source: '/admin-static/_next/:path+',
  //       destination: `${NEXT_PUBLIC_APP_ADMIN_ORIGIN}/admin-static/_next/:path+`,
  //     },
  //   ];
});

export default process.env.ANALYZE === 'true' ? bundleAnalyzer(nextConfig) : nextConfig;
