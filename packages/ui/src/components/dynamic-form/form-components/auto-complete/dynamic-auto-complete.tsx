import type { ReactNode } from 'react';
import { Autocomplete, type OptionType } from '#components/autocomplete';
import { cn } from '#utils/cn';

export interface DynamicAutoCompleteOption {
  id: string;
  value: string;
  label: ReactNode;
}

export interface DynamicAutoCompleteProps {
  options: DynamicAutoCompleteOption[];
  value?: string;
  onChange: (val: string) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string>;
}

export const DynamicAutoComplete = ({ options, value = '', onChange, className, errors }: DynamicAutoCompleteProps) => {
  const selectedOption = options.find(option => option.value === value) as OptionType;

  return (
    <div className={cn('space-y-4', className)}>
      <div className=" overflow-x-auto">
        <Autocomplete
          showSearch
          options={options as OptionType[]}
          value={selectedOption}
          onChange={option => onChange(String(option?.value ?? ''))}
        />
      </div>

      {/* Error messages below the table */}
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

DynamicAutoComplete.displayName = 'DynamicAutoComplete';
