import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import OrganizationRequest from './_components/organization-requests';

export default function OrganizationRequests() {
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
