import AffiliateLayout from '@oe/dashboard/affiliate/layout';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <AffiliateLayout>{children}</AffiliateLayout>;
}
