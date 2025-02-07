'use client';
import { FormNestedProvider, type INestedFormsValues } from '@oe/ui/components/form-wrapper';
import type { ReactNode } from 'react';
import { CourseDetailHeader } from './_components/course-detail-header';

export function CourseDetailLayout({ children }: { children: ReactNode }) {
  // biome-ignore lint/suspicious/useAwait: <explanation>
  const handleSubmit = async (values: INestedFormsValues) => {
    console.log('submit', values);
  };

  return (
    <FormNestedProvider onSubmit={handleSubmit} className="flex h-full flex-col">
      <CourseDetailHeader />
      <div className="flex-1 overflow-hidden rounded">{children}</div>
    </FormNestedProvider>
  );
}
