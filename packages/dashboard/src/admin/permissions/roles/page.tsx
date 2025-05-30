import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import RolesList from './_components/roles-list';

export default function RoleSettings() {
  const tDashboard = useTranslations('dashboard.permissionSettings');

  return (
    <DashboardMainPageLayout
      title={tDashboard('title')}
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('role') }]}
      dashboard="admin"
      mainClassName="overflow-hidden"
    >
      <RolesList />
    </DashboardMainPageLayout>
  );
}
