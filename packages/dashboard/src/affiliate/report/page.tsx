import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { UserAffiliateReportFilter } from './_component/user-campaign-report-filter';
import ReportUserAffiliateCampaignList from './_component/user-campaign-report-list';
import { UserAffiliateReportProvider } from './_component/user-campaign-report-provider';

export const metadata: Metadata = {
  title: 'Affiliate Report',
};

export default function UserAffiliateCampaignReport() {
  const tDashboard = useTranslations('dashboard.userAffiliateDashboard');

  return (
    <UserAffiliateReportProvider>
      <DashboardMainPageLayout
        breadcrumbs={[
          { label: tDashboard('affiliate'), disabled: true },
          { label: tDashboard('reportAffiliateCampaigns') },
        ]}
        dashboard="admin"
        header={
          <div className="flex justify-between gap-2">
            <h1 className="giant-iheading-semibold20 md:giant-iheading-semibold32 tracking-tight">
              {tDashboard('reportAffiliateCampaigns')}
            </h1>
            <UserAffiliateReportFilter />
          </div>
        }
      >
        <ReportUserAffiliateCampaignList />
      </DashboardMainPageLayout>
    </UserAffiliateReportProvider>
  );
}
