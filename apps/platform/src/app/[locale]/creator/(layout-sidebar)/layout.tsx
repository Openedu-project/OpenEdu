import CreatorLayout from '@oe/dashboard/creator/layout';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <CreatorLayout>{children}</CreatorLayout>;
}
