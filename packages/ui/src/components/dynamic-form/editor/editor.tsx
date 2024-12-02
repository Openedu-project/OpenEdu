import type { IProtectedRoutes } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { DashboardHeaderCard } from '#common/layout';

export default function FormEditor({ dashboard }: { dashboard: IProtectedRoutes }) {
  const tDynamicForms = useTranslations('dynamicForms');
  return (
    <>
      <DashboardHeaderCard
        dashboard={dashboard}
        breadcrumbs={[{ label: tDynamicForms('formList') }, { label: tDynamicForms('createForm') }]}
        className="mb-0 border-b"
      >
        <h1 className="flex justify-between text-2xl">{tDynamicForms('createForm')}</h1>
      </DashboardHeaderCard>
      <div className="flex gap-4">
        <div className="w-[280px] border-r">
          {/* Cột bên trái */}
          Cột bên trái
        </div>
        <div className="flex-1">
          {/* Editor ở giữa */}
          Editor ở giữa
        </div>
        <div className="flex-1">
          {/* Form preview bên phải */}
          Form preview bên phải
        </div>
      </div>
    </>
  );
}
