import { useTranslations } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';

export type SelectboxOption = {
  id: string;
  value: string;
  label: string;
};

export interface SelectboxProps {
  options: SelectboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Selectbox({ options, value, onChange, placeholder, disabled = false, className }: SelectboxProps) {
  const tGeneral = useTranslations('general');
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder ?? `${tGeneral('select')}...`} />
      </SelectTrigger>
      <SelectContent>
        {options?.map(option => (
          <SelectItem key={option.id} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
