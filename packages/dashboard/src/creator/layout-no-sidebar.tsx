import { DashboardLayout } from '@oe/ui';
import type { ReactNode } from 'react';

export function CreatorLayoutNoSidebar({ children }: { children: ReactNode }) {
  return <DashboardLayout className="overflow-hidden">{children}</DashboardLayout>;
}
