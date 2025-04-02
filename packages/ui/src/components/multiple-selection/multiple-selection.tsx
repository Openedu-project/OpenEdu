import type { CSSProperties, ReactNode } from 'react';
import { Checkbox } from '#shadcn/checkbox';
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
}

export function MultipleSelection({ options, value, onChange, className, disabled = false }: MultipleSelectionProps) {
  // const tGeneral = useTranslations("general");
  const handleValueChange = (checked: boolean, optionValue: string) => {
    if (checked) {
      // Add the value to the array if checked
      onChange(value ? [...value, optionValue] : [optionValue]);
    } else {
      // Remove the value from the array if unchecked
      onChange(value ? value.filter(val => val !== optionValue) : []);
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
    </div>
  );
}
