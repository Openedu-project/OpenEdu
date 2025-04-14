import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { OrganizationsManagement } from './components/organizations-management';

export function OrganizationsManagementList() {
  const tDashboard = useTranslations('dashboard.organizations');
  const t = useTranslations('organizationsManagement');

  return (
    <DashboardMainPageLayout
      title={t('title')}
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('organizations') }]}
      dashboard="admin"
    >
      <OrganizationsManagement />
    </DashboardMainPageLayout>
  );
}
