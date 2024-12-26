import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import OrganizationsManagement from './components/organizations-management';

export default function OrganizationsManagementList() {
  const tDashboard = useTranslations('dashboard.organizations');
  const t = useTranslations('organizationsManagement');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('organizations') }]}
        dashboard="admin"
      >
        <h1 className="mb-4 text-2xl">{t('title')}</h1>
      </DashboardHeaderCard>
      <div className="rounded bg-background p-4">
        <OrganizationsManagement />
      </div>
    </>
  );
}
