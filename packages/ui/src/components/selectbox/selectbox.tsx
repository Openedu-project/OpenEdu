import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';

export type SelectboxOption = {
  id: string;
  value: string;
  label: ReactNode;
};

export interface SelectboxProps {
  options: SelectboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  valueClassName?: string;
  hasIcon?: boolean;
  displayValue?: (value: string) => ReactNode;
}

export function Selectbox({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  valueClassName,
  hasIcon = true,
  displayValue,
}: SelectboxProps) {
  const tGeneral = useTranslations('general');
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={className} hasIcon={hasIcon}>
        <SelectValue placeholder={placeholder ?? `${tGeneral('select')}...`} className={valueClassName}>
          {value && displayValue ? displayValue(value) : options.find(option => option.value === value)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options?.map(option => (
          <SelectItem key={option.id} value={option.value} className="cursor-pointer">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
