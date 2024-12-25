import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import OrganizationRequest from './_components/organization-requests';

export default function OrganizationRequests() {
  const tDashboard = useTranslations('dashboard.organizations');
  const t = useTranslations('organizationRequests');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('requests') }]}
        dashboard="admin"
      >
        <h1 className="mb-4 text-2xl">{t('organizationRequests')}</h1>
      </DashboardHeaderCard>

      <div className="rounded bg-background p-4">
        <OrganizationRequest />
      </div>
    </>
  );
}
