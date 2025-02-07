import { Input, type InputProps } from '#shadcn/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';

export type InputValue = {
  input: string;
  select: string;
};

type InputSelectProps = {
  selectPosition?: 'start' | 'end';
  inputProps: InputProps & {
    type?: 'text' | 'number' | 'email' | 'password';
    placeholder?: string;
    className?: string;
    defaultValue?: string;
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
  containerClassName?: string;
};

export const InputSelect = ({
  selectPosition = 'end',
  inputProps,
  selectProps,
  value,
  onChange,
  containerClassName = '',
}: InputSelectProps) => {
  const getInputClasses = () => {
    const baseClasses = 'flex-1';
    if (selectPosition === 'start') {
      return `${baseClasses} rounded-l-none ${inputProps.className || ''}`;
    }
    return `${baseClasses} rounded-r-none ${inputProps.className || ''}`;
  };

  const getSelectClasses = () => {
    const baseClasses = 'min-w-20';
    if (selectPosition === 'start') {
      return `${baseClasses} rounded-r-none border-r-0 ${selectProps.className || ''}`;
    }
    return `${baseClasses} rounded-l-none border-l-0 ${selectProps.className || ''}`;
  };

  const handleInputChange = (inputValue: string) => {
    onChange({ ...value, input: inputValue });
  };

  const handleSelectChange = (selectValue: string) => {
    onChange({ ...value, select: selectValue });
  };

  const renderContent = () => {
    const inputElement = (
      <Input
        type={inputProps.type || 'text'}
        placeholder={inputProps.placeholder}
        className={getInputClasses()}
        value={value.input}
        defaultValue={inputProps.defaultValue}
        onChange={e => handleInputChange(e.target.value)}
      />
    );

    const selectElement = (
      <Select defaultValue={selectProps.defaultValue} value={value.select} onValueChange={handleSelectChange}>
        <SelectTrigger className={getSelectClasses()} disabled={selectProps.disabled}>
          <SelectValue placeholder={selectProps.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectProps.items.map(item => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    return selectPosition === 'start' ? [selectElement, inputElement] : [inputElement, selectElement];
  };

  return <div className={`flex ${containerClassName}`}>{renderContent()}</div>;
};
