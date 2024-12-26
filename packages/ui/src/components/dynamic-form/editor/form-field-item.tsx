import { type ComponentType, Suspense } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormFieldWithLabel } from '#shadcn/form';
import { Skeleton } from '#shadcn/skeleton';
import { cn } from '#utils/cn';
import { componentWithoutLabel } from '../constants';
import { formComponents } from '../form-components';
import type { FormComponentConfig, FormFieldType } from '../types';

export default function FormFieldItem({ field, form }: { field: FormFieldType; form: UseFormReturn<FieldValues> }) {
  const { fieldType, ...rest } = field;
  const Component = formComponents[fieldType]?.component as ComponentType<
    Partial<FormComponentConfig> & { className?: string }
  >;

  if (!Component) {
    return null;
  }

  return (
    <Suspense fallback={<Skeleton className="h-10 w-full" />}>
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
}
