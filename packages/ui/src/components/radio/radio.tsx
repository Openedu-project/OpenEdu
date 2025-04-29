'use client';
import { type ReactNode, useRef, useState } from 'react';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { RadioGroup, RadioGroupItem } from '#shadcn/radio-group';
import { cn } from '#utils/cn';

export interface RadioOption {
  id: string;
  value: string;
  label: ReactNode;
}

export interface RadioProps {
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  hasOtherOption?: boolean;
  errors?: Record<string, string>; // Map of rowId -> error message
}

export const Radio = ({
  options,
  value = '',
  onChange,
  className,
  required = false,
  disabled = false,
  errors,
  hasOtherOption = false,
}: RadioProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [otherValue, setOtherValue] = useState<string>('');
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false);

  const handleValueChange = (newValue: string) => {
    // Check if the "other" option was selected
    if (newValue === 'other') {
      setIsOtherSelected(true);
      // If there's already a value in the other input, use that
      if (otherValue.trim()) {
        onChange(otherValue);
      } else {
        onChange(newValue);
      }
    } else {
      setIsOtherSelected(false);
      onChange(newValue);
    }
  };

  const handleOtherInputChange = (newInputValue: string) => {
    setOtherValue(newInputValue);

    // Only update the selection if "other" is currently selected
    if (isOtherSelected) {
      onChange(newInputValue);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="overflow-x-auto">
        <RadioGroup
          required={required}
          value={isOtherSelected ? 'other' : value}
          onValueChange={handleValueChange}
          disabled={disabled}
          className="flex flex-col justify-center"
        >
          {options.map(option => (
            <div className="flex items-center space-x-2" key={option.id}>
              <RadioGroupItem value={option.value} id={option.id} />
              <Label htmlFor={option.id} className="font-normal text-sm">
                {option.label}
              </Label>
            </div>
          ))}
          {hasOtherOption && (
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other-option-radio" disabled={disabled} />
              <Label htmlFor="other-option-radio" className="!opacity-100 font-normal text-sm">
                Khác:
              </Label>
              <Input
                placeholder=""
                ref={inputRef}
                value={otherValue}
                onChange={e => handleOtherInputChange(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && otherValue.trim() && isOtherSelected) {
                    e.preventDefault(); // Prevent form submission
                  }
                }}
                disabled={disabled || !isOtherSelected}
              />
            </div>
          )}
        </RadioGroup>
      </div>

      {/* Error messages */}
      {errors && Object.keys(errors).length > 0 && (
        <div className="space-y-1">
          {Object.entries(errors).map(([rowId, errorMessage]) => (
            <p key={rowId} className="font-medium text-red-500 text-sm">
              {errorMessage}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

Radio.displayName = 'Radio';
