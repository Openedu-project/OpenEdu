import type { IAdminLaunchpadDetailRes, IAdminLaunchpadInvestmentRes } from '@oe/api/types/admin-launchpad';
import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import CreatorLaunchpadDetailStatus, {
  type CreatorLaunchpadStatusType,
} from './_components/creator-launchpad-detail-status';
import CreatorLaunchpadDetail from './_components/launchpad-approved-detail';

interface LayoutProps {
  data: IAdminLaunchpadDetailRes | null;
  backerData: IAdminLaunchpadInvestmentRes | null;
}

export default function CreatorLaunchpadDetailMgm({ data, backerData }: LayoutProps) {
  const t = useTranslations('creatorLaunchpad');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: t('title') }, { label: data?.name ?? '', disabled: true }]}
      dashboard="admin"
      title={
        <div className="flex justify-between justify-between gap-2">
          <h2 className="giant-iheading-semibold20 md:giant-iheading-semibold32 mb-0">{data?.name ?? ''}</h2>
          <CreatorLaunchpadDetailStatus status={(data?.status as CreatorLaunchpadStatusType) ?? 'draft'} />
        </div>
      }
    >
      <CreatorLaunchpadDetail data={data} backerData={backerData} />
    </DashboardMainPageLayout>
  );
}
