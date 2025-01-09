import { getPermissionMyAccessService } from '@oe/api/services/permissions';
import { Affiliate } from '@oe/assets/icons/affliliate';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { checkSidebarPermissions } from '@oe/core/utils/sidebar-menu';
import { DashboardLayout } from '@oe/ui/common/layout';
import {
  BookOpen,
  CirclePercent,
  FileText,
  House,
  LayoutTemplate,
  NotebookText,
  Receipt,
  ReceiptText,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const [permissions, tDashboard] = await Promise.all([
    getPermissionMyAccessService('', { params: undefined }),
    getTranslations('dashboard'),
  ]);

  const filteredMenu = checkSidebarPermissions(
    [
      {
        id: 'dashboard',
        label: tDashboard('dashboard'),
        icon: <House className="h-5 w-5" />,
        href: CREATOR_ROUTES.dashboard,
        isRoot: true,
      },
      {
        id: 'coupon',
        label: tDashboard('coupon'),
        icon: <CirclePercent className="h-5 w-5" />,
        href: CREATOR_ROUTES.coupon,
      },
      {
        id: 'courses',
        label: tDashboard('courses.title'),
        icon: <BookOpen className="h-5 w-5" />,
        href: CREATOR_ROUTES.courses,
      },
      {
        id: 'forms',
        label: tDashboard('forms.title'),
        icon: <FileText className="h-5 w-5" />,
        items: [
          {
            id: 'form-templates',
            label: tDashboard('forms.formTemplates'),
            icon: <LayoutTemplate className="h-5 w-5" />,
            href: CREATOR_ROUTES.formTemplates,
          },
          {
            id: 'form-list',
            label: tDashboard('forms.formList'),
            icon: <ReceiptText className="h-5 w-5" />,
            href: CREATOR_ROUTES.formList,
          },
        ],
      },
      {
        id: 'affiliate-campaigns',
        label: tDashboard('affiliateCampaign.title'),
        icon: <Affiliate className="text-content" color="#000" height={18} width={18} />,
        items: [
          {
            id: 'affiliate-campaigns-list',
            label: tDashboard('affiliateCampaign.campaigns'),
            icon: <NotebookText className="h-5 w-5" />,
            href: CREATOR_ROUTES.campaigns,
          },
          {
            id: 'report-affiliate-campaigns',
            label: tDashboard('affiliateCampaign.reportAffiliateCampaigns'),
            icon: <Receipt className="h-5 w-5" />,
            href: CREATOR_ROUTES.campaignReport,
          },
        ],
      },
    ],
    permissions ?? []
  );

  return (
    <DashboardLayout className="p-4 pt-0" sidebarItems={filteredMenu}>
      {children}
    </DashboardLayout>
  );
}
