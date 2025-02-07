import { DashboardLayout } from '@oe/ui/common/layout';
import type { ReactNode } from 'react';

export default function CreatorLayoutNoSidebar({ children }: { children: ReactNode }) {
  return <DashboardLayout className="overflow-hidden">{children}</DashboardLayout>;
}
