import { DashboardLayout } from '@oe/ui';
import type { ReactNode } from 'react';

export function AffiliateLayoutNoSidebar({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
