import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { LaunchpadRequestsList } from './_components/launchpad-request-list';

export function LaunchpadRequestsManagement() {
  const tDashboard = useTranslations('dashboard.launchpad');
  const t = useTranslations('adminLaunchpadRequest');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('requests') }]}
      dashboard="admin"
      title={
        <div className="flex flex-col justify-between gap-2">
          <h2 className="giant-iheading-semibold20 md:giant-iheading-semibold32 mb-1">{t('title')}</h2>
          <p className="mcaption-regular16">{t('description')}</p>
        </div>
      }
    >
      <LaunchpadRequestsList />
    </DashboardMainPageLayout>
  );
}
