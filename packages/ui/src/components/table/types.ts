import type { HTTPPagination } from '@oe/api/types/fetch';
import type { ColumnDef as ColumnDefTanstack, Row, Table, TableOptions } from '@tanstack/react-table';
import type { ReactNode, Ref } from 'react';
import type { KeyedMutator } from 'swr';
import type { FilterOption, FilterSearchProps } from '../filter-search';

export type TableBorder = 'bordered' | 'bordered-rows';

export interface TableRef<T> {
  getData: () => T[];
  table: Table<T>;
  mutate: KeyedMutator<HTTPPagination<T>>;
  mutateAndClearCache: () => void;
}

export type ColumnDef<T> = ColumnDefTanstack<T> & {
  align?: 'left' | 'center' | 'right';
  sticky?: 'left' | 'right';
  className?: string;
  headerClassName?: string;
};

export type TableProps<TData> = {
  columns: ColumnDef<TData>[];
  api?: string;
  apiParams?: Record<string, unknown>;
  data?: TData[];
  rows?: Row<TData>[];
  table?: Table<TData>;
  filterOptions?: FilterOption[];
  ref?: Ref<TableRef<TData>>;
  tableOptions?: Partial<TableOptions<TData>>;
  children?: ReactNode;
  hasPagination?: boolean;
  border?: TableBorder;
  height?: string | number;
  stickyHeader?: boolean;
  hasVirtualized?: boolean;
  isLoading?: boolean;
  error?: Error;
  hasExpand?: boolean;
  hasSelection?: boolean;
  hasNoColumn?: boolean;
  className?: string;
  wrapperClassName?: string;
  filterSearchProps?: Omit<FilterSearchProps, 'filterOptions'>;
  expandColumnProps?: Partial<ColumnDef<TData>>;
  mutate?: KeyedMutator<HTTPPagination<TData>>;
  renderSubComponent?: (props: { row: Row<TData> }) => ReactNode;
};
