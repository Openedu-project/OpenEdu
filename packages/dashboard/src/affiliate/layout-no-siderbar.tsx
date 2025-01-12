import { DashboardLayout } from '@oe/ui/common/layout';
import type { ReactNode } from 'react';

export default function AffiliateLayoutNoSidebar({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
