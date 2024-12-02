import CreatorLayoutNoSidebar from '@oe/dashboard/creator/layout-no-sidebar';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <CreatorLayoutNoSidebar>{children}</CreatorLayoutNoSidebar>;
}
