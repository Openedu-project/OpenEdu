import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MultipleChoiceGrid, type MultipleChoiceGridOption } from '#components/multiple-choice-grid';
import { FormDescription, FormItem, FormLabel, FormMessage } from '#shadcn/form';

interface MultipleChoiceGridFormFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  rows: MultipleChoiceGridOption[];
  columns: MultipleChoiceGridOption[];
}

export function MultipleChoiceGridFormField({
  name,
  label,
  description,
  required,
  className,
  rows,
  columns,
}: MultipleChoiceGridFormFieldProps) {
  // Access form context directly
  const { control, setValue, getValues } = useFormContext();

  // Set initial value to empty object when component mounts
  useEffect(() => {
    // Only set if the current value isn't already an object
    const currentValue = getValues(name);
    if (!currentValue || typeof currentValue !== 'object') {
      setValue(name, {});
    }
  }, [name, setValue, getValues]);

  return (
    <FormItem className={className}>
      {label && (
        <FormLabel className="font-medium">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </FormLabel>
      )}

      {description && <FormDescription>{description}</FormDescription>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          // Force the value to be an object
          let valueObject = {};

          // If field.value is an object, use it
          if (field.value && typeof field.value === 'object' && !Array.isArray(field.value)) {
            valueObject = field.value;
          }
          // If it's a string (the problem you're facing), convert it to an object with that string as a key
          else if (typeof field.value === 'string' && field.value) {
            // This is the case you're seeing where field.value is "pUdFZ3XCXwPxT3RT"
            // We'll temporarily store this as { lastRowId: columnId }
            const rowId = field.value;
            const existingSelections = getValues(name) || {};

            // Only convert if we don't already have an object
            if (typeof existingSelections !== 'object' || Object.keys(existingSelections).length === 0) {
              // Start with an empty object, add the string value if it exists
              valueObject = { lastRowId: rowId };

              // Update form value to be an object
              setValue(name, valueObject);
              //   console.log("Converted string value to object:", valueObject);
            } else {
              valueObject = existingSelections;
            }
          }

          const handleChange = (rowId: string, columnId: string) => {
            // Update the object
            const updatedValue = {
              ...valueObject,
              [rowId]: columnId,
            };

            // Update form value
            setValue(name, updatedValue);
            // console.log("Updated grid value:", updatedValue);
          };

          //   console.log("Current field value type:", typeof field.value);
          //   console.log("Current field value:", field.value);
          //   console.log("Using value object:", valueObject);

          return <MultipleChoiceGrid rows={rows} columns={columns} value={valueObject} onChange={handleChange} />;
        }}
      />

      <FormMessage />
    </FormItem>
  );
}
