import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import CreatorRequestMngmList from './_components/creator-request-management';

export default function CreatorRequestManagement() {
  const tDashboard = useTranslations('dashboard.creators');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('requests') }]}
        dashboard="admin"
      />
      <div className="rounded bg-background p-4">
        <CreatorRequestMngmList />
      </div>
    </>
  );
}
