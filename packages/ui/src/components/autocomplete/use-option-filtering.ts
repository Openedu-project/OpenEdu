import { useMemo } from 'react';
import type { OptionValue } from './types';

interface UseOptionFilteringProps<T> {
  options: T[];
  searchValue: string;
  filterOption: (option: T, search: string) => boolean;
  fixedValue?: OptionValue[];
  getOptionValue: (option: T) => OptionValue;
}

export function useOptionFiltering<T>({
  options,
  searchValue,
  filterOption,
  fixedValue = [],
  getOptionValue,
}: UseOptionFilteringProps<T>) {
  const sortedOptions = useMemo(() => {
    return [...options].sort((a, b) => {
      const aIsFixed = fixedValue.includes(getOptionValue(a));
      const bIsFixed = fixedValue.includes(getOptionValue(b));
      if (aIsFixed && !bIsFixed) {
        return -1;
      }
      if (!aIsFixed && bIsFixed) {
        return 1;
      }
      return 0;
    });
  }, [options, fixedValue, getOptionValue]);

  const filteredOptions = useMemo(() => {
    return sortedOptions.filter(option => filterOption(option, searchValue));
  }, [sortedOptions, searchValue, filterOption]);

  return { sortedOptions, filteredOptions };
}
