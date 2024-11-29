import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { useTranslations } from 'next-intl';
import ActionsList from './_components/actions-list';

export default function ActionSettings() {
  const tDashboard = useTranslations('dashboard.permissionSettings');

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('action') }]}
        dashboard="admin"
      />
      <div className="rounded bg-background p-4">
        <ActionsList />
      </div>
    </>
  );
}
