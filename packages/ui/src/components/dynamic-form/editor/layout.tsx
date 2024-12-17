import type { IProtectedRoutes } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { DashboardHeaderCard } from '#common/layout';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { FieldConfig } from '../form-config';
import { Components } from './components';
import { Editor } from './editor';
import { Templates } from './templates';

export function FormEditorLayout({ dashboard }: { dashboard: IProtectedRoutes }) {
  const tDynamicForms = useTranslations('dynamicForms');
  const tGeneral = useTranslations('general');

  return (
    <>
      <DashboardHeaderCard
        dashboard={dashboard}
        breadcrumbs={[{ label: tDynamicForms('formList') }, { label: tDynamicForms('createForm') }]}
        className="mb-0 border-b"
      >
        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
            <Input name="name" placeholder="Form name" className="min-w-60 " autoComplete="off" />
            <Input name="description" placeholder="Form description" className="min-w-60 md:max-w-full" />
          </div>
          <Button variant="default">{tGeneral('save')}</Button>
        </div>
      </DashboardHeaderCard>
      <div className="flex h-full flex-1 flex-col overflow-hidden md:flex-row">
        <div className="scrollbar flex flex-shrink-0 flex-wrap gap-2 overflow-auto bg-background p-2 md:block md:w-60">
          <Templates />
          <Components />
        </div>
        <div className="flex flex-1 gap-4 overflow-hidden p-4">
          <div className="scrollbar h-full flex-1 overflow-auto bg-background py-4">
            <Editor />
          </div>
          <div className="scrollbar h-full flex-1 overflow-auto bg-background">
            <FieldConfig />
          </div>
        </div>
      </div>
    </>
  );
}
