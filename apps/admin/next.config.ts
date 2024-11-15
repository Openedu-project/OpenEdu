import { getNextConfig } from '@oe/config/next';
import type { NextConfig } from 'next/types';

const nextConfig: NextConfig = {
  assetPrefix: '/admin-static',
};

export default getNextConfig(nextConfig);
