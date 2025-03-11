'use client';

import type { IProtectedRoutes } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { DashboardHeaderCard } from '#common/layout';
import { FieldConfig } from '../form-config';
import { Components } from './components';
import { Editor } from './editor';
import { Header } from './header';

export function FormEditorLayout({
  dashboard,
}: {
  dashboard: IProtectedRoutes;
}) {
  const tDynamicForms = useTranslations('dynamicForms');
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  return (
    <>
      <DashboardHeaderCard
        dashboard={dashboard}
        breadcrumbs={
          type === 'component' ? [] : [{ label: tDynamicForms('formList') }, { label: tDynamicForms('noName') }]
        }
        className="mb-0 border-b"
      >
        <Header isComponent={type === 'component'} />
      </DashboardHeaderCard>
      <div className="flex h-full flex-1 flex-col overflow-hidden md:flex-row">
        <div className="scrollbar flex flex-shrink-0 flex-wrap gap-2 overflow-auto bg-background p-2 md:block md:w-60">
          {/* <Templates /> */}
          <Components />
        </div>
        <div className="relative flex flex-1 gap-4 overflow-hidden p-4">
          <div className="scrollbar h-full flex-1 overflow-auto bg-background py-4">
            <Editor />
          </div>
          <FieldConfig />
        </div>
      </div>
    </>
  );
}
