import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import CreatorsManagementList from './_components/creator-management-list';

export default function CreatorsManagement() {
  const tDashboard = useTranslations('dashboard.creators');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('creators') }]}
        dashboard="admin"
      />
      <div className="rounded bg-background p-4">
        <CreatorsManagementList />
      </div>
    </>
  );
}
