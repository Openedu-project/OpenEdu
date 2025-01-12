import { formatDateTime } from '@oe/core/utils/datetime';
import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { formatCurrency } from '@oe/ui/components/input-currency';
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CampaignDetail from './_components/campaign-detail';

export default function UserAffiliateCampaignsDetailManagement({
  campaignName,
  courseName,
  coursePrice,
  startDate,
  endDate,
}: {
  campaignName: string | undefined;
  courseName: string | undefined;
  coursePrice: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
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
              <span className="text-[#2BA830]">{formatCurrency(coursePrice ?? '')}</span>
            </h3>
            <div className="mbutton-regular16 flex items-start gap-1 text-[#6E6E6E]">
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
