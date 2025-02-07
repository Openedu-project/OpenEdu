import { DashboardLayout } from '@oe/ui/common/layout';
import type { ReactNode } from 'react';

export default function BlogLayoutNoSidebar({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
