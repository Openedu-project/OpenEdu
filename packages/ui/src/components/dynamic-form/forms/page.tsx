import { DYNAMIC_FORMS_ROUTES, type IProtectedRoutes } from '@oe/core/utils/routes';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { DashboardHeaderCard } from '#common/layout/dashboard-layout';
import { Link } from '#common/navigation';
import Forms from './forms';

export default async function FormsListPage({ dashboard }: { dashboard: IProtectedRoutes }) {
  const tDynamicForms = await getTranslations('dynamicForms');

  return (
    <>
      <DashboardHeaderCard dashboard={dashboard} breadcrumbs={[{ label: tDynamicForms('formList') }]}>
        <h1 className="mb-4 flex justify-between text-2xl">
          {tDynamicForms('formList')}
          <Link exact variant="default" size="xs" href={`/${dashboard}${DYNAMIC_FORMS_ROUTES.createForm}`}>
            <Plus className="mr-2 h-4 w-4" />
            {tDynamicForms('createForm')}
          </Link>
        </h1>
      </DashboardHeaderCard>
      <div className="rounded bg-background p-4">
        <Forms />
      </div>
    </>
  );
}
