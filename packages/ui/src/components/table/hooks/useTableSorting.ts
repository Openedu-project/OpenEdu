import { type SortingState, type TableOptions, getSortedRowModel } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

export type TableSortingOptions<T> = {
  sorting: SortingState;
  sortingOptions: Partial<TableOptions<T>>;
};

export function useTableSorting<T>(options?: Partial<TableOptions<T>>): TableSortingOptions<T> {
  const [sorting, setSorting] = useState<SortingState>([]);
  const sortingOptions = useMemo<Partial<TableOptions<T>>>(
    () => ({
      enableSortingRemoval: false,
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      ...options,
    }),
    [options]
  );
  return { sorting, sortingOptions };
}
