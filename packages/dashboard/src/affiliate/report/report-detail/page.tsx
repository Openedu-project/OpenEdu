import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { UserAffiliateReportDetailList } from './_component/campaign-report-detail';

export function UserAffiliateCampaignsReportDetail({
  campaignName,
  courseName,
}: {
  campaignName: string | undefined;
  courseName: string | undefined;
}) {
  const tDashboard = useTranslations('dashboard.userAffiliateDashboard');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[
        { label: tDashboard('affiliate'), disabled: true },
        { label: tDashboard('reportAffiliateCampaigns'), disabled: true },
        { label: tDashboard('detailReportAffiliateCampaigns'), disabled: true },
      ]}
      dashboard="admin"
      header={
        <div className="flex flex-col justify-between">
          <h1 className="giant-iheading-semibold20 md:giant-iheading-semibold32 tracking-tight">{campaignName}</h1>
          <div className="mt-1 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <h3 className="giant-iheading-semibold16 md:giant-iheading-semibold20">
              {tDashboard('course')}: {courseName}
            </h3>
          </div>
        </div>
      }
    >
      <UserAffiliateReportDetailList />
    </DashboardMainPageLayout>
  );
}
