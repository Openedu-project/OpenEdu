import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { AffiliateManagementContent } from './_components/affiliate-campaign-list';

export function UserAffiliateCampaignsManagement() {
  const tDashboard = useTranslations('dashboard.userAffiliateDashboard');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('affiliate'), disabled: true }, { label: tDashboard('campaigns') }]}
      dashboard="admin"
      title={tDashboard('campaigns')}
    >
      <AffiliateManagementContent />
    </DashboardMainPageLayout>
  );
}
