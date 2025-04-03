import { type CSSProperties, type ReactNode, useRef, useState } from 'react';
import { Checkbox } from '#shadcn/checkbox';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { cn } from '#utils/cn';

export interface MultipleSelectionOption {
  id: string;
  value: string;
  label: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface MultipleSelectionProps {
  options?: MultipleSelectionOption[];
  value?: string[]; // Array of selected values
  onChange: (value: string[]) => void;
  className?: string;
  disabled?: boolean;
  hasOtherOption?: boolean;
}

export function MultipleSelection({
  options,
  value,
  onChange,
  className,
  disabled = false,
  hasOtherOption = false,
}: MultipleSelectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [otherValue, setOtherValue] = useState<string>('');
  const [isOtherChecked, setIsOtherChecked] = useState<boolean>(false);

  const handleValueChange = (checked: boolean, optionValue: string) => {
    if (checked) {
      // Add the value to the array if checked
      onChange(value ? [...value, optionValue] : [optionValue]);
    } else {
      // Remove the value from the array if unchecked
      onChange(value ? value.filter(val => val !== optionValue) : []);
    }
  };

  const handleOtherCheckboxChange = (checked: boolean) => {
    setIsOtherChecked(checked);

    if (!checked) {
      // If unchecked, remove the other value from the selection
      onChange(value ? value.filter(val => val !== otherValue) : []);
    } else if (otherValue.trim()) {
      // If checked and there's a value, add it to selection
      onChange(value ? [...value, otherValue] : [otherValue]);
    }
  };

  const handleOtherInputChange = (newValue: string) => {
    const oldValue = otherValue;
    setOtherValue(newValue);

    // Only update the selection if the checkbox is checked
    if (isOtherChecked) {
      // Remove old value if it exists
      const filteredValues = value ? value.filter(val => val !== oldValue) : [];

      // Add new value if it's not empty
      if (newValue.trim()) {
        onChange([...filteredValues, newValue]);
      } else {
        onChange(filteredValues);
      }
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {options?.map(option => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox
            id={option.id}
            checked={value?.includes(option.value)}
            onCheckedChange={checked => handleValueChange(checked as boolean, option.value)}
            disabled={disabled}
          />
          <Label htmlFor={option.id} className="font-normal text-sm">
            {option.label}
          </Label>
        </div>
      ))}
      {hasOtherOption && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="other-option"
            checked={isOtherChecked}
            onCheckedChange={checked => handleOtherCheckboxChange(checked as boolean)}
            disabled={disabled}
          />
          <Label htmlFor="other-option" className="!opacity-100 font-normal text-sm">
            Khác:
          </Label>
          <Input
            placeholder=""
            ref={inputRef}
            value={otherValue}
            onChange={e => handleOtherInputChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && otherValue.trim() && isOtherChecked) {
                e.preventDefault(); // Prevent form submission
                // The value is already being updated via handleOtherInputChange
              }
            }}
            disabled={disabled || !isOtherChecked}
          />
        </div>
      )}
    </div>
  );
}
