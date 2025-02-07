import type { Metadata } from 'next';

import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import ReportAffiliateCampaignList from './_component/campaign-report-list';

export const metadata: Metadata = {
  title: 'Report',
};

export default function CreatorAffiliateReport() {
  const tDashboard = useTranslations('dashboard.affiliateCampaign');

  return (
    <>
      <DashboardMainPageLayout
        breadcrumbs={[
          { label: tDashboard('title'), disabled: true },
          { label: tDashboard('reportAffiliateCampaigns'), disabled: true },
        ]}
        dashboard="admin"
        title={tDashboard('reportAffiliateCampaigns')}
      >
        <ReportAffiliateCampaignList />
      </DashboardMainPageLayout>
    </>
  );
}
