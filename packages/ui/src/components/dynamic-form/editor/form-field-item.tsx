import { Suspense } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import type { MultipleChoiceGridOption } from '#components/multiple-choice-grid';
import { FormFieldWithLabel } from '#shadcn/form';
import { Skeleton } from '#shadcn/skeleton';
import { cn } from '#utils/cn';
import { componentWithoutLabel } from '../constants';
import { formComponents } from '../form-components';
import { MultipleChoiceGridFormField } from '../form-components/multiple-choice-grid/multiple-choice-grid-form-field';
import type { FormFieldType } from '../types';

export function FormFieldItem({
  field,
  form,
}: {
  field: FormFieldType;
  form: UseFormReturn<FieldValues>;
}) {
  const { fieldType, fieldId, ...rest } = field;
  const Component = formComponents[fieldType]?.component;

  if (!Component) {
    return null;
  }

  return (
    <Suspense fallback={<Skeleton className="h-10 w-full" />}>
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
            form={form}
            infoText={rest.infoText}
            required={rest.required}
            description={rest.description}
            className={cn('flex-1 p-2', rest.border && 'border p-4')}
            isToggleField={fieldType === 'checkbox' || fieldType === 'switch'}
          >
            <Component
              {...('min' in rest && { min: rest.min })}
              {...('max' in rest && { max: rest.max })}
              {...('placeholder' in rest && { placeholder: rest.placeholder })}
              {...('text' in rest && { text: rest.text })}
              {...(rest.disabled && { disabled: rest.disabled })}
              {...(fieldType === 'selectbox' && { options: rest.options })}
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
}
