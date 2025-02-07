import type {
  CreatorLaunchpadStatusType,
  IAdminLaunchpadDetailRes,
  IAdminLaunchpadInvestmentRes,
} from '@oe/api/types/admin-launchpad';
import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import CreatorLaunchpadDetailStatus from './_components/creator-launchpad-detail-status';
import CreatorLaunchpadDetail from './_components/launchpad-approved-detail';

interface LayoutProps {
  id: string;
  data: IAdminLaunchpadDetailRes | null;
  backerData: IAdminLaunchpadInvestmentRes | null;
}

export default function CreatorLaunchpadDetailMgm({ id, data, backerData }: LayoutProps) {
  const t = useTranslations('creatorLaunchpad');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: t('title') }, { label: data?.name ?? '', disabled: true }]}
      dashboard="admin"
      title={
        <div className="flex justify-between justify-between gap-2">
          <h2 className="giant-iheading-semibold20 md:giant-iheading-semibold32 mb-0">{data?.name ?? ''}</h2>
          <CreatorLaunchpadDetailStatus id={id} status={(data?.status as CreatorLaunchpadStatusType) ?? 'draft'} />
        </div>
      }
    >
      <CreatorLaunchpadDetail id={id} data={data} backerData={backerData} />
    </DashboardMainPageLayout>
  );
}
