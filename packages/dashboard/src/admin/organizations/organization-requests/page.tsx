import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { OrganizationRequest } from './_components/organization-requests';

export function OrganizationRequests() {
  const tDashboard = useTranslations('dashboard.organizations');
  const t = useTranslations('organizationRequests');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('requests') }]}
      dashboard="admin"
      title={t('organizationRequests')}
    >
      <OrganizationRequest />
    </DashboardMainPageLayout>
  );
}
