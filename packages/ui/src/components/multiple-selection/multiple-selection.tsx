import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
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
  // onAddOtherOption?: (value: string) => void;
}

export function MultipleSelection({
  options,
  value,
  onChange,
  // onAddOtherOption,
  className,
  disabled = false,
  hasOtherOption = false,
}: MultipleSelectionProps) {
  // const tGeneral = useTranslations("general");
  const inputRef = useRef<HTMLInputElement>(null);
  const [otherValue, setOtherValue] = useState<string>('');
  const [previousOtherValue, setPreviousOtherValue] = useState<string>('');

  const handleValueChange = (checked: boolean, optionValue: string) => {
    if (checked) {
      // Add the value to the array if checked
      onChange(value ? [...value, optionValue] : [optionValue]);
    } else {
      // Remove the value from the array if unchecked
      onChange(value ? value.filter(val => val !== optionValue) : []);
    }
  };

  const handleOtherValueChange = (checked: boolean, newValue: string) => {
    if (checked) {
      // If we had a previous other value, remove it first
      const filteredValues = previousOtherValue ? value?.filter(val => val !== previousOtherValue) || [] : value || [];

      // Set the new value as the previous other value for future reference
      setPreviousOtherValue(newValue);

      // Add the new value
      onChange([...filteredValues, newValue]);
    } else {
      // Remove the other value from the array if unchecked
      onChange(value ? value.filter(val => val !== newValue) : []);
      // We keep track of previous value even when unchecked
    }
  };

  useEffect(() => {
    if (inputRef?.current) {
      // Add blur event listener to handle when user loses focus
      const handleBlur = () => {
        if (otherValue.trim() && otherValue !== previousOtherValue) {
          handleOtherValueChange(true, otherValue.trim());
        }
      };

      const inputElement = inputRef.current;
      inputElement.addEventListener('blur', handleBlur);

      // Clean up the event listener on component unmount
      return () => {
        inputElement.removeEventListener('blur', handleBlur);
      };
    }
  }, [otherValue, previousOtherValue, value]);

  // Check if the current otherValue is in the value array
  const isOtherValueChecked = otherValue && value?.includes(otherValue);

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
            checked={isOtherValueChecked || !!(previousOtherValue && value?.includes(previousOtherValue))}
            onCheckedChange={checked => {
              if (otherValue.trim()) {
                handleOtherValueChange(checked as boolean, otherValue.trim());
              }
            }}
            disabled={disabled || !otherValue.trim()}
          />
          <Label htmlFor="other-option" className="font-normal text-sm">
            Khac:
          </Label>
          <Input
            placeholder=""
            ref={inputRef}
            value={otherValue}
            onChange={e => setOtherValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && otherValue.trim()) {
                e.preventDefault(); // Prevent form submission
                handleOtherValueChange(true, otherValue.trim());
              }
            }}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}
