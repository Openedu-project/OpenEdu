import type { IProtectedRoutes } from '@oe/core';
import { useTranslations } from 'next-intl';
import { DashboardMainPageLayout } from '#common/layout/dashboard-layout';
import { TableProvider } from '#components/table';
import { CreateFormButton } from './create-form-button';
import { Forms } from './forms';

export function FormsListPage({ dashboard }: { dashboard: IProtectedRoutes }) {
  const tDynamicForms = useTranslations('dynamicForms');

  return (
    <TableProvider>
      <DashboardMainPageLayout
        dashboard={dashboard}
        breadcrumbs={[{ label: tDynamicForms('formList') }]}
        header={
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-2xl">{tDynamicForms('formList')}</h1>
            <CreateFormButton variant="default" />
          </div>
        }
      >
        <Forms />
      </DashboardMainPageLayout>
    </TableProvider>
  );
}
