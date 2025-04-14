import { DashboardLayout } from '@oe/ui';
import type { ReactNode } from 'react';

export function AdminLayoutNoSidebar({ children }: { children: ReactNode }) {
  return <DashboardLayout className="overflow-hidden">{children}</DashboardLayout>;
}
