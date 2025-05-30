import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import CreatorsManagementList from './_components/creator-management-list';

export default function CreatorsManagement() {
  const tDashboard = useTranslations('dashboard.creators');
  const t = useTranslations('creatorManagement');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('creators') }]}
      dashboard="admin"
      title={t('title')}
    >
      <CreatorsManagementList />
    </DashboardMainPageLayout>
  );
}
