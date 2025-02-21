import type { ElementType } from 'react';
import { Input, type InputProps } from '#shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { cn } from '#utils/cn';

export type InputValue = {
  input: string;
  input2?: string;
  select: string;
};

interface InputSelectProps extends Omit<InputProps, 'onChange' | 'value'> {
  selectPosition?: 'start' | 'end';
  inputProps: InputProps & {
    type?: 'text' | 'number' | 'email' | 'password';
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    Component?: ElementType;
  };
  input2Props?: InputProps & {
    type?: 'text' | 'number' | 'email' | 'password';
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    Component?: ElementType;
  };
  selectProps: {
    placeholder?: string;
    className?: string;
    items: { value: string; label: string }[];
    defaultValue?: string;
    disabled?: boolean;
  };
  value: InputValue;
  onChange: (value: InputValue) => void;
  className?: string;
}

export const InputSelect = ({
  selectPosition = 'end',
  inputProps,
  input2Props,
  selectProps,
  value,
  onChange,
  className = '',
}: InputSelectProps) => {
  const handleInputChange = (inputValue: string) => {
    onChange({ ...value, input: inputValue });
  };

  const handleInput2Change = (inputValue: string) => {
    onChange({ ...value, input2: inputValue });
  };

  const handleSelectChange = (selectValue: string) => {
    onChange({ ...value, select: selectValue });
  };

  const renderInput = () => {
    const { Component, ...rest } = inputProps;
    const innerInputProps: InputProps = {
      ...rest,
      type: inputProps.type || 'text',
      className: cn(
        'flex-1',
        {
          'rounded-r-none rounded-l-md border-r-0': input2Props && selectPosition === 'end',
          'rounded-none border-r-0': input2Props && selectPosition === 'start',
          'rounded-r-none': !input2Props && selectPosition === 'end',
          'rounded-l-none': !input2Props && selectPosition === 'start',
        },
        inputProps.className
      ),
      value: value.input || '',
      onChange: e => handleInputChange((e?.target?.value || e) as string),
    };
    if (Component) {
      return <Component {...innerInputProps} />;
    }
    return <Input {...innerInputProps} />;
  };

  const renderInput2 = () => {
    if (!input2Props) {
      return null;
    }
    const { Component, ...rest } = input2Props;
    const innerInput2Props: InputProps = {
      ...rest,
      type: input2Props.type || 'text',
      className: cn(
        'flex-1',
        {
          'rounded-none': selectPosition === 'end',
          'rounded-r-md rounded-l-none': selectPosition === 'start',
        },
        'focus:ring-offset-0',
        input2Props.className
      ),
      value: value.input2 || '',
      onChange: e => handleInput2Change((e?.target?.value || e) as string),
    };
    if (Component) {
      return <Component {...innerInput2Props} />;
    }
    return <Input {...innerInput2Props} />;
  };

  const renderSelect = () => (
    <Select value={value.select} onValueChange={handleSelectChange} {...selectProps}>
      <SelectTrigger
        className={cn(
          {
            // Khi có input2
            'rounded-l-none border-l-0': selectPosition === 'end',
            'rounded-r-none border-r-0': selectPosition === 'start',
          },
          selectProps?.className
        )}
      >
        <SelectValue placeholder={selectProps?.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectProps?.items.map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className={`flex ${className}`}>
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
  );
};
