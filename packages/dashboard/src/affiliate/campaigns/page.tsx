import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import AffiliateCampaignList from './_components/affiliate-campaign-list';

export default function UserAffiliateCampaignsManagement() {
  const tDashboard = useTranslations('dashboard.userAffiliateDashboard');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('affiliate'), disabled: true }, { label: tDashboard('campaigns') }]}
      dashboard="admin"
      title={tDashboard('campaigns')}
    >
      <AffiliateCampaignList />
    </DashboardMainPageLayout>
  );
}
