'use client';

import { Suspense } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFieldWithLabel } from '#shadcn/form';
import { Skeleton } from '#shadcn/skeleton';
import { cn } from '#utils/cn';
import { componentWithoutLabel } from '../constants';
import { formComponents } from '../form-components';
import type { FormFieldType } from '../types';

interface FormRendererProps {
  fields: FormFieldType[];
  className?: string;
}

export function FormRenderer({ fields, className }: FormRendererProps) {
  const form = useFormContext();

  return (
    <div className={cn('space-y-4', className)}>
      {fields.map(field => {
        const { fieldType, fieldId, ...rest } = field;
        const Component = formComponents[fieldType]?.component;

        if (!Component) {
          return null;
        }

        return (
          <Suspense key={fieldId} fallback={<Skeleton className="h-10 w-full" />}>
            {componentWithoutLabel.includes(fieldType) ? (
              <div className="p-2">
                <Component {...rest} text={rest.label} />
              </div>
            ) : (
              <div className={cn(fieldType === 'checkbox' && 'p-2')}>
                <FormFieldWithLabel
                  name={rest.name}
                  label={rest.label}
                  form={form}
                  infoText={rest.infoText}
                  required={rest.required}
                  description={rest.description}
                  className={cn('flex-1 p-2', rest.border && 'border p-4')}
                  fieldType={fieldType}
                >
                  <Component
                    {...('min' in rest && { min: rest.min })}
                    {...('max' in rest && { max: rest.max })}
                    {...('placeholder' in rest && { placeholder: rest.placeholder })}
                    {...('text' in rest && { text: rest.text })}
                    {...(rest.disabled && { disabled: rest.disabled })}
                    {...(fieldType === 'selectbox' && { options: rest.options })}
                  />
                </FormFieldWithLabel>
              </div>
            )}
          </Suspense>
        );
      })}
    </div>
  );
}
