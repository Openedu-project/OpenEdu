import { formatDateTime } from '@oe/core';
import { DashboardMainPageLayout } from '@oe/ui';

import { formatNumber } from '@oe/core';
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CampaignDetail } from './_components/campaign-detail';

export function UserAffiliateCampaignsDetailManagement({
  campaignName,
  courseName,
  coursePrice,
  startDate,
  endDate,
  currency,
}: {
  campaignName: string | undefined;
  courseName: string | undefined;
  coursePrice: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  currency: string | undefined;
}) {
  const tDashboard = useTranslations('dashboard.userAffiliateDashboard');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('affiliate'), disabled: true }, { label: tDashboard('campaignDetail') }]}
      dashboard="admin"
      title={tDashboard('campaignDetail')}
      header={
        <div className="flex flex-col justify-between">
          <h1 className="giant-iheading-semibold20 md:giant-iheading-semibold32 tracking-tight">{campaignName}</h1>
          <div className="mt-1 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <h3 className="giant-iheading-semibold16 md:giant-iheading-semibold20">
              {tDashboard('course')}: {courseName} - {tDashboard('price')}
              :&nbsp;
              <span className="text-success">
                {formatNumber(Number(coursePrice))} {currency}
              </span>
            </h3>
            <div className="mbutton-regular16 flex items-start gap-1 text-muted">
              <Calendar />
              {formatDateTime(Number(startDate ?? '') || 0)} -&nbsp;
              {formatDateTime(Number(endDate ?? '') || 0)}
            </div>
          </div>
        </div>
      }
    >
      <CampaignDetail />
    </DashboardMainPageLayout>
  );
}
