import type { ReactNode } from 'react';

export type OptionValue = string | number;

export interface OptionType {
  value: OptionValue;
  label: string;
}

export interface BaseAutocompleteProps<T> {
  options: T[];
  placeholder?: string;
  width?: string;
  height?: string;
  disabled?: boolean;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => OptionValue;
  filterOption?: (option: T, searchValue: string) => boolean;
  renderOption?: (option: T) => ReactNode;
}
