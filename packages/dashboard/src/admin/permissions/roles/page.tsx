import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import RolesList from './_components/roles-list';

export default function RoleSettings() {
  const tDashboard = useTranslations('dashboard.permissionSettings');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('role') }]}
        dashboard="admin"
      />
      <div className="rounded bg-background p-4">
        <RolesList />
      </div>
    </>
  );
}
