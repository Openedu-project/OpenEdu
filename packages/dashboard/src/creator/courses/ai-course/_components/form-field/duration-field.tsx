'use client';

import type { ICreateAICourseOutline } from '@oe/api';
import { Autocomplete, cn } from '@oe/ui';
import { InputNumber } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
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
      <p className={cn("mbutton-semibold16 mb-2", !!form.formState.errors.duration && 'text-destructive')}>
        {tAICourseForm('courseDuration')}
        <span className="ml-1 text-destructive">*</span>
      </p>
      <div className="flex rounded">
        <FormFieldWithLabel name="duration_type" className="min-w-24">
          <Autocomplete
            options={['day', 'week']}
            getOptionLabel={val => tAICourseForm(val)}
            triggerProps={{ className: 'bg-muted border-r-0 rounded-r-none' }}
          />
        </FormFieldWithLabel>

        <FormFieldWithLabel name="duration" className="grow">
          <InputNumber min={1} step={1} className="flex-1 rounded-r-radius-m rounded-l-none" />
        </FormFieldWithLabel>
      </div>
    </>
  );
}
