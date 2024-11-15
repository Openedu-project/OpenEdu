import { type ColumnFiltersState, type TableOptions, getFilteredRowModel } from '@tanstack/react-table';
import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';

export type TableFiltersOptions<T> = {
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  tableFilterOptions: Partial<TableOptions<T>>;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
};

export function useTableFilters<T>(options?: Partial<TableOptions<T>>): TableFiltersOptions<T> {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const tableFilterOptions = useMemo<Partial<TableOptions<T>>>(
    () => ({
      onGlobalFilterChange: setGlobalFilter,
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      ...options,
    }),
    [options]
  );

  return { columnFilters, globalFilter, tableFilterOptions, setColumnFilters, setGlobalFilter };
}
