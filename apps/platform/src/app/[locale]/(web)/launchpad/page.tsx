import { generateSEO } from '@oe/core';
import { LaunchpadPage } from '@oe/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'Launchpad',
  keywords: ['launchpad', 'revenue'],
});

export default function () {
  return <LaunchpadPage />;
}
