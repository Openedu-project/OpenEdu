import { getPermissionMyAccessService } from '@oe/api';
import { Affiliate } from '@oe/assets';
import { CREATOR_ROUTES, checkSidebarPermissions } from '@oe/core';
import { DashboardLayout } from '@oe/ui';
import { BookOpen, CirclePercent, House, LayoutTemplate, NotebookText, Receipt } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export async function CreatorLayout({ children }: { children: ReactNode }) {
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
        id: 'launchpad',
        label: tDashboard('launchpad.title'),
        icon: <Receipt className="h-5 w-5" />,
        href: CREATOR_ROUTES.creatorLaunchpadList,
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
        id: 'forms-templates',
        label: tDashboard('forms.formTemplates'),
        icon: <LayoutTemplate className="h-5 w-5" />,
        href: CREATOR_ROUTES.formList,
        // items: [
        //   {
        //     id: 'form-templates',
        //     label: tDashboard('forms.formTemplates'),
        //     icon: <LayoutTemplate className="h-5 w-5" />,
        //     href: CREATOR_ROUTES.formTemplates,
        //   },
        //   {
        //     id: 'form-list',
        //     label: tDashboard('forms.formList'),
        //     icon: <ReceiptText className="h-5 w-5" />,
        //     href: CREATOR_ROUTES.formList,
        //   },
        // ],
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
