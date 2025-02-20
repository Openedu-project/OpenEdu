import type { SelectProps } from '@radix-ui/react-select';
import type { ElementType } from 'react';
import { get, useFormContext } from 'react-hook-form';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input, type InputProps } from '#shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { cn } from '#utils/cn';

interface InputFormProps extends Omit<InputProps, 'name'> {
  name: string;
  type?: 'text' | 'number' | 'email' | 'password';
  Component?: ElementType;
}

interface SelectFormProps extends Omit<SelectProps, 'name'> {
  name: string;
  items: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface InputSelectFormProps {
  selectPosition?: 'start' | 'end';
  inputProps: InputFormProps;
  input2Props?: InputFormProps;
  selectProps: SelectFormProps;
  className?: string;
  label?: string;
}

export const InputSelectForm = ({
  selectPosition = 'end',
  inputProps,
  input2Props,
  selectProps,
  className = '',
  label,
}: InputSelectFormProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const inputError = get(errors, inputProps.name);
  const input2Error = input2Props?.name ? get(errors, input2Props.name) : null;
  const selectError = get(errors, selectProps.name);

  const renderInput = () => {
    const { Component, name, ...rest } = inputProps;
    return (
      <FormFieldWithLabel
        name={name}
        showErrorMessage={false}
        className="flex-1"
        render={({ field }) => {
          const innerInputProps: InputFormProps = {
            ...rest,
            ...field,
            type: inputProps.type || 'text',
            className: cn(
              {
                'rounded-r-none rounded-l-md border-r-0': input2Props && selectPosition === 'end',
                'rounded-none border-r-0': input2Props && selectPosition === 'start',
                'rounded-r-none': !input2Props && selectPosition === 'end',
                'rounded-l-none': !input2Props && selectPosition === 'start',
              },
              inputProps.className
            ),
          };

          if (Component) {
            return <Component {...innerInputProps} />;
          }
          return <Input {...innerInputProps} />;
        }}
      />
    );
  };

  const renderInput2 = () => {
    if (!input2Props) {
      return null;
    }

    const { Component, name, ...rest } = input2Props;
    return (
      <FormFieldWithLabel
        name={name}
        showErrorMessage={false}
        className="flex-1"
        render={({ field }) => {
          const innerInput2Props: InputProps = {
            ...rest,
            ...field,
            type: input2Props.type || 'text',
            className: cn(
              {
                'rounded-none': selectPosition === 'end',
                'rounded-r-md rounded-l-none': selectPosition === 'start',
              },
              'focus:ring-offset-0',
              input2Props.className
            ),
          };

          if (Component) {
            return <Component {...innerInput2Props} />;
          }
          return <Input {...innerInput2Props} />;
        }}
      />
    );
  };

  const renderSelect = () => {
    const { name, items, placeholder, disabled, className, ...rest } = selectProps;
    return (
      <FormFieldWithLabel
        name={name}
        showErrorMessage={false}
        render={({ field }) => {
          return (
            <Select
              disabled={disabled}
              {...rest}
              value={field.value || ''}
              onValueChange={value => {
                if (!value) {
                  return;
                }
                field.onChange(value);
              }}
            >
              <SelectTrigger
                className={cn(
                  {
                    'rounded-l-none border-l-0': selectPosition === 'end',
                    'rounded-r-none border-r-0': selectPosition === 'start',
                  },
                  className
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {items.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />
    );
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <p className="font-medium text-sm">{label}</p>}
      <div className="flex flex-1">
        {selectPosition === 'end' ? (
          <>
            {renderInput()}
            {renderInput2()}
            {renderSelect()}
          </>
        ) : (
          <>
            {renderSelect()}
            {renderInput()}
            {renderInput2()}
          </>
        )}
      </div>
      {inputError && <p className="text-destructive text-sm">{inputError?.message as string}</p>}
      {input2Error && <p className="text-destructive text-sm">{input2Error?.message as string}</p>}
      {selectError && <p className="text-destructive text-sm">{selectError?.message as string}</p>}
    </div>
  );
};
