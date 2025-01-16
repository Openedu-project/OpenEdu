import type { ReactNode } from 'react';
import type { ButtonProps } from '#shadcn/button';

export type OptionValue = string | number;

export interface OptionType {
  value?: OptionValue;
  label?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

export interface BaseAutocompleteProps<T> {
  options: T[];
  placeholder?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
  className?: string;
  triggerProps?: ButtonProps;
  getOptionLabel?: (option: T) => string | undefined;
  getOptionValue?: (option: T) => OptionValue | undefined;
  filterOption?: (option: T, searchValue: string) => boolean | undefined;
  renderOption?: (option: T) => ReactNode;
  renderTrigger?: (value: T | null) => ReactNode;
}
