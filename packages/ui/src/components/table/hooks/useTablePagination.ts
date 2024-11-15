import { type PaginationState, type TableOptions, getPaginationRowModel } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

export type TablePaginationOptions<T> = {
  pagination: PaginationState;
  paginationOptions: Partial<TableOptions<T>>;
};

export function useTablePagination<T>({
  options,
  apiParams,
  hasPagination,
  hasVirtualized,
}: {
  options?: Partial<TableOptions<T>>;
  apiParams?: Record<string, unknown>;
  hasPagination?: boolean;
  hasVirtualized?: boolean;
}): TablePaginationOptions<T> {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: apiParams?.page ? Number(apiParams.page) - 1 : 0,
    pageSize: apiParams?.per_page ? Number(apiParams.per_page) : 10,
  });

  const paginationOptions = useMemo<Partial<TableOptions<T>>>(
    () =>
      hasPagination && !hasVirtualized
        ? {
            onPaginationChange: setPagination,
            ...(!options?.manualPagination && {
              getPaginationRowModel: getPaginationRowModel(),
            }),
            ...options,
          }
        : {},
    [options, hasPagination, hasVirtualized]
  );

  return { pagination, paginationOptions };
}
