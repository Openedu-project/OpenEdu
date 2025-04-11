import type { IAdminLaunchpadDetailRes, IAdminLaunchpadInvestmentRes } from '@oe/api';
import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { LaunchpadApprovedDetail } from './_components/launchpad-approved-detail';

interface LayoutProps {
  data: IAdminLaunchpadDetailRes | null;
  backerData: IAdminLaunchpadInvestmentRes | null;
}

export function LaunchpadApprovedDetailMgm({ data, backerData }: LayoutProps) {
  const tDashboard = useTranslations('dashboard.launchpad');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[
        { label: tDashboard('title'), disabled: true },
        { label: tDashboard('approved') },
        { label: data?.name ?? '', disabled: true },
      ]}
      dashboard="admin"
      title={
        <div className="flex justify-between justify-between gap-2">
          <h2 className="giant-iheading-semibold20 md:giant-iheading-semibold32 mb-0">{data?.name ?? ''}</h2>
        </div>
      }
    >
      <LaunchpadApprovedDetail data={data} backerData={backerData} />
    </DashboardMainPageLayout>
  );
}
