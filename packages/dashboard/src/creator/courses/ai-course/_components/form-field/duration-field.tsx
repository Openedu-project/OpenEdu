'use client';

import type { ICreateAICourseOutline } from '@oe/api/schemas/courses/createCourseSchema';
import { Autocomplete } from '@oe/ui/components/autocomplete';
import { InputNumber } from '@oe/ui/components/input-number';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';

export function DurationField({
  form,
}: {
  form: UseFormReturn<ICreateAICourseOutline>;
}) {
  const tAICourseForm = useTranslations('course.aiCourse');

  return (
    <>
      <p className="mbutton-semibold16 mb-2">
        {tAICourseForm('courseDuration')}
        <span className="ml-1 text-destructive">*</span>
      </p>
      <div className="flex rounded border">
        <FormFieldWithLabel name="duration_type" className="min-w-24">
          <Autocomplete
            options={['day', 'week']}
            getOptionLabel={val => tAICourseForm(val)}
            triggerProps={{ className: 'bg-muted border-0 rounded-r-none' }}
          />
        </FormFieldWithLabel>

        <FormFieldWithLabel name="duration" className="grow">
          <InputNumber min={1} className="!border-0 flex-1 rounded-r-radius-m" />
        </FormFieldWithLabel>
      </div>
      {form.formState.errors.duration && (
        <p className="mcaption-regular16 !mt-3 text-negative">
          {tAICourseForm(form.formState.errors.duration?.message as string)}
        </p>
      )}
    </>
  );
}
