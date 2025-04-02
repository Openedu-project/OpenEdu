'use client';

import { Suspense } from 'react';
import { FormWrapper } from '#components/form-wrapper';
import type { MultipleChoiceGridOption } from '#components/multiple-choice-grid';
// import { useFormContext } from 'react-hook-form';
import { FormFieldWithLabel } from '#shadcn/form';
import { Skeleton } from '#shadcn/skeleton';
import { cn } from '#utils/cn';
import { componentWithoutLabel } from '../constants';
import { formComponents } from '../form-components';
import { MultipleChoiceGridFormField } from '../form-components/multiple-choice-grid/multiple-choice-grid-form-field';
import type { FormFieldType } from '../types';
import { generateZodSchema } from '../utils';

interface FormRendererProps {
  fields: FormFieldType[];
  className?: string;
}

export function FormRenderer({ fields, className }: FormRendererProps) {
  // const form = useFormContext();
  const formSchema = generateZodSchema(fields);

  return (
    <FormWrapper id="form-renderer" schema={formSchema} className={cn('space-y-4', className)}>
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
            ) : fieldType === 'multipleChoiceGrid' ? (
              <MultipleChoiceGridFormField
                name={rest.name}
                label={rest.label}
                required={rest.required}
                description={rest.description}
                className={cn('flex-1 p-2', rest.border && 'border p-4')}
                rows={rest?.rows as MultipleChoiceGridOption[]}
                columns={rest?.columns as MultipleChoiceGridOption[]}
              />
            ) : (
              <div className={cn(fieldType === 'checkbox' && 'p-2')}>
                <FormFieldWithLabel
                  name={rest.name}
                  label={rest.label}
                  infoText={rest.infoText}
                  required={rest.required}
                  description={rest.description}
                  className={cn('flex-1 p-2', rest.border && 'border p-4')}
                  isToggleField={fieldType === 'checkbox' || fieldType === 'switch'}
                >
                  <Component
                    {...('min' in rest && { min: rest.min })}
                    {...('max' in rest && { max: rest.max })}
                    {...('placeholder' in rest && {
                      placeholder: rest.placeholder,
                    })}
                    {...('text' in rest && { text: rest.text })}
                    {...(rest.disabled && { disabled: rest.disabled })}
                    {...(fieldType === 'selectbox' && {
                      options: rest.options,
                    })}
                    {...(fieldType === 'multipleSelection' && {
                      options: rest.options,
                      hasOtherOption: rest?.otherOption,
                      // onAddOtherOption: (val: string) => {
                      //   rest?.onChange?.(val);
                      // },
                    })}
                  />
                </FormFieldWithLabel>
              </div>
            )}
          </Suspense>
        );
      })}
    </FormWrapper>
  );
}
