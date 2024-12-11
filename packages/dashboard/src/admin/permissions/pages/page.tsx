import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import PagesList from './_components/pages-list';

export default function PageSettings() {
  const tDashboard = useTranslations('dashboard.permissionSettings');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('pages') }]}
        dashboard="admin"
      />
      <div className="rounded bg-background p-4">
        <PagesList />
      </div>
    </>
  );
}
