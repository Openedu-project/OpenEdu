import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { DashboardLayout } from '@oe/ui/common/layout';
import { House } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const tDashboard = useTranslations('dashboard');
  return (
    <DashboardLayout
      sidebarItems={[
        {
          id: 'dashboard',
          label: tDashboard('dashboard'),
          icon: <House className="h-5 w-5" />,
          href: CREATOR_ROUTES.dashboard,
          isRoot: true,
        },
      ]}
    >
      {children}
    </DashboardLayout>
  );
}
