import type { HTTPPagination } from '@oe/api';
import { fetchAPI } from '@oe/api';
import { buildUrl } from '@oe/core';
import type { SortingState } from '@tanstack/react-table';
import type { PaginationState } from '@tanstack/react-table';
import type { ColumnFiltersState } from '@tanstack/react-table';
import { useMemo } from 'react';
import useSWR from 'swr';

async function paginationFetcher<T>(url: string): Promise<HTTPPagination<T>> {
  const response = await fetchAPI(url);
  return response.data as HTTPPagination<T>;
}

export const useTableFetching = <T>({
  api,
  sorting,
  columnFilters,
  globalFilter,
  pagination,
  apiParams,
  apiQueryParams,
}: {
  api?: string;
  apiParams?: Record<string, unknown>;
  apiQueryParams?: Record<string, unknown>;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  pagination: PaginationState;
}) => {
  const queryParams = useMemo(() => {
    const params: Record<string, unknown> = {
      ...apiQueryParams,
      page: pagination?.pageIndex + 1,
      per_page: pagination?.pageSize,
    };

    if (sorting?.length > 0) {
      params.sort = `${sorting[0]?.id} ${sorting[0]?.desc ? 'desc' : 'asc'}`;
    }

    if (columnFilters.length > 0) {
      params.search_categories = columnFilters[0]?.id;
      params.search_term = columnFilters[0]?.value;
    } else if (globalFilter) {
      params.search_term = globalFilter;
    }
    return params;
  }, [sorting, columnFilters, globalFilter, pagination, apiQueryParams]);

  const { data, error, isLoading, mutate } = useSWR(
    api ? buildUrl({ endpoint: api, queryParams, params: apiParams }) : null,
    paginationFetcher<T>
  );

  return { data, error, isLoading, mutate };
};
