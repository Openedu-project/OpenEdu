import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import CreatorsManagementList from './_components/creator-management-list';

export default function CreatorsManagement() {
  const tDashboard = useTranslations('dashboard.creators');
  const t = useTranslations('creatorManagement');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('creators') }]}
        dashboard="admin"
      >
        <h1 className="mb-4 text-2xl">{t('title')}</h1>
      </DashboardHeaderCard>
      <div className="rounded bg-background p-4">
        <CreatorsManagementList />
      </div>
    </>
  );
}
