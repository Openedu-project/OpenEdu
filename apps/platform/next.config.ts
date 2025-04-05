import withBundleAnalyzer from '@next/bundle-analyzer';
import { getNextConfig } from '@oe/config/next';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next/types';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export const withNextIntl = createNextIntlPlugin('./src/config/i18n-request-config.ts');

// const { NEXT_PUBLIC_APP_ADMIN_ORIGIN } = process.env;

const nextConfig: NextConfig = {
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
  // },
};

export default bundleAnalyzer(withNextIntl(getNextConfig(nextConfig)));
