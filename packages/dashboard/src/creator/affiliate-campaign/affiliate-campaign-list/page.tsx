import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { AffiliateCampaignList } from './affiliate-campaign-list';

export function AffiliateCampaigns() {
  const tDashboard = useTranslations('dashboard.affiliateCampaign');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[
        { label: tDashboard('title'), disabled: true },
        { label: tDashboard('campaigns'), disabled: true },
      ]}
      dashboard="admin"
      title={tDashboard('campaigns')}
    >
      <AffiliateCampaignList />
    </DashboardMainPageLayout>
  );
}
