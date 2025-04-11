import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { PagesList } from './_components/pages-list';

export function PageSettings() {
  const tDashboard = useTranslations('dashboard.permissionSettings');

  return (
    <DashboardMainPageLayout
      title={tDashboard('title')}
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('pages') }]}
      dashboard="admin"
      mainClassName="overflow-hidden"
    >
      <PagesList />
    </DashboardMainPageLayout>
  );
}
