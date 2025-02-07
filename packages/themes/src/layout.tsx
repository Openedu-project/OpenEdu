import Favicon from '@oe/assets/images/favicon.png';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'OpenEdu',
  icons: {
    icon: Favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return { children };
}
