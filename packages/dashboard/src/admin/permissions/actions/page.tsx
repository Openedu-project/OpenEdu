import { DashboardMainPageLayout } from '@oe/ui';
import { TableProvider } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { ActionsList } from './_components/actions-list';
import { CreateActionButton } from './_components/create-action-button';

export function ActionSettings() {
  const tDashboard = useTranslations('dashboard.permissionSettings');
  const tPermissionActionList = useTranslations('permissionActionList');

  return (
    <TableProvider>
      <DashboardMainPageLayout
        breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tPermissionActionList('title') }]}
        dashboard="admin"
        title={
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="mb-0 text-2xl">{tPermissionActionList('title')}</h2>
            <CreateActionButton />
          </div>
        }
      >
        <ActionsList />
      </DashboardMainPageLayout>
    </TableProvider>
  );
}
