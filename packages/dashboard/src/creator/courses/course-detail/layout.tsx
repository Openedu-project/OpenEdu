'use client';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { FormNestedProvider, type INestedFormsValues } from '@oe/ui/components/form-wrapper';
import type { ReactNode } from 'react';

export function CourseDetailLayout({ children }: { children: ReactNode }) {
  // biome-ignore lint/suspicious/useAwait: <explanation>
  const handleSubmit = async (values: INestedFormsValues) => {
    console.log(values);
  };

  return (
    <FormNestedProvider onSubmit={handleSubmit} className="flex h-full flex-col">
      <DashboardHeaderCard breadcrumbs={[{ label: 'Course Detail' }]} className="mb-0">
        <h1 className="text-2xl">Course Detail</h1>
      </DashboardHeaderCard>
      <div className="flex-1 overflow-hidden rounded p-4">{children}</div>
    </FormNestedProvider>
  );
}
