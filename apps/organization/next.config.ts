import { getNextConfig } from '@oe/config/next';
import type { NextConfig } from 'next/types';

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

export default getNextConfig(nextConfig);
