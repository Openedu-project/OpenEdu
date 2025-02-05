import type { IAdminLaunchpadDetailRes } from '@oe/api/types/admin-launchpad';
import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import { LaunchpadDetailActionButton } from './_components/action-button';
import LaunchpadRequestsDetail from './_components/launchpad-request-detail';

interface LayoutProps {
  orderId: string;
  data: IAdminLaunchpadDetailRes | null;
}

export default function LaunchpadRequestsDetailMgm({ orderId, data }: LayoutProps) {
  const tDashboard = useTranslations('dashboard.launchpad');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[
        { label: tDashboard('title'), disabled: true },
        { label: tDashboard('requests') },
        { label: data?.name ?? '', disabled: true },
      ]}
      dashboard="admin"
      title={
        <div className="flex justify-between justify-between gap-2">
          <h2 className="giant-iheading-semibold20 md:giant-iheading-semibold32 mb-0">{data?.name ?? ''}</h2>
          <LaunchpadDetailActionButton orderId={orderId} />
        </div>
      }
    >
      <LaunchpadRequestsDetail data={data} />
    </DashboardMainPageLayout>
  );
}
