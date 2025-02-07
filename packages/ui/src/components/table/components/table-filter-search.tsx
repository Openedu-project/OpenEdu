import type { ColumnFiltersState } from '@tanstack/react-table';
import { type Dispatch, type ReactNode, type SetStateAction, useCallback } from 'react';
import { type FilterOption, type FilterPayload, FilterSearch, type FilterSearchProps } from '../../filter-search';

export function TableFilterSearch({
  filterOptions,
  children,
  setGlobalFilter,
  setColumnFilters,
  resetColumnFilters,
  ...props
}: {
  filterOptions?: FilterOption[];
  children?: ReactNode;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  resetColumnFilters: (defaultState?: boolean) => void;
} & Omit<FilterSearchProps, 'filterOptions'>) {
  const handleFilter = useCallback(
    ({ filter, value }: FilterPayload) => {
      resetColumnFilters(true);
      if (filter.global) {
        setGlobalFilter(value as string);
      } else if (filter.customFilter) {
        setColumnFilters(prev => filter.customFilter?.({ filter, value, prev }) ?? prev);
      } else {
        setColumnFilters(prev => {
          const valueExists = value !== undefined || value !== null || value !== '';
          const existing = prev.find(f => f.id === (filter.value as string));

          if (existing && !valueExists) {
            return prev.filter(f => f.id !== (filter.value as string));
          }
          if (!existing && valueExists) {
            return [...prev, { id: filter.value as string, value }];
          }
          if (existing && valueExists) {
            return prev.map(f => (f.id === filter.value ? { ...f, value } : f));
          }
          return prev;
        });
      }
    },
    [resetColumnFilters, setGlobalFilter, setColumnFilters]
  );

  if (!filterOptions) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {filterOptions && (
        <FilterSearch filterOptions={filterOptions} onSearch={handleFilter} className="max-w-sm" {...props} />
      )}
      {children && <div className="flex flex-1 flex-wrap justify-start gap-2 md:justify-end">{children}</div>}
    </div>
  );
}
