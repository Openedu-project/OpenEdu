import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import CreatorRequestMngmList from './_components/creator-request-management';

export default function CreatorRequestManagement() {
  const tDashboard = useTranslations('dashboard.creators');
  const t = useTranslations('creatorManagement.requestCreator');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('requests') }]}
      dashboard="admin"
      title={t('requestTitle')}
    >
      <CreatorRequestMngmList />
    </DashboardMainPageLayout>
  );
}
