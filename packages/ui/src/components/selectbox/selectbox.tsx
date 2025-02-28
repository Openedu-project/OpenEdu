import { useTranslations } from 'next-intl';
import type { CSSProperties, ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { cn } from '#utils/cn';

export interface SelectboxOption {
  id: string;
  value: string;
  label: ReactNode;
  className?: string;
  style?: CSSProperties;
}

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
  style?: CSSProperties;
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
  style,
}: SelectboxProps) {
  const tGeneral = useTranslations('general');

  const renderSelectedValue = () => {
    if (!value) {
      return null;
    }

    if (displayValue) {
      return displayValue(value);
    }

    return options.find(option => option.value === value)?.label;
  };

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={className} hasIcon={hasIcon} style={style}>
        <SelectValue placeholder={placeholder ?? `${tGeneral('select')}...`} className={valueClassName}>
          {renderSelectedValue()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options?.map(option => (
          <SelectItem
            key={option.id}
            value={option.value}
            className={cn('cursor-pointer', option.className)}
            style={option.style}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
