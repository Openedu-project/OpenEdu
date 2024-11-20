'use no memo';

import { type RowData, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useImperativeHandle, useMemo, useRef } from 'react';
import { createExpandingColumn, createNoColumn, createSelectionColumn } from '../columns';
import {
  useTableData,
  useTableExpand,
  useTableFetching,
  useTableFilters,
  useTablePagination,
  useTableSelection,
  useTableSorting,
} from '../hooks';
import type { TableProps } from '../types';
import { TableFilterSearch } from './table-filter-search';
import { TablePagination } from './table-pagination';
import { TableUnvirtualized } from './table-unvirtualized';
import { TableVirtualized } from './table-virtualized';

export default function Table<TData>({
  api,
  apiParams,
  data: staticData,
  columns,
  filterOptions,
  ref,
  tableOptions,
  children,
  border = 'bordered-rows',
  height,
  hasPagination = true,
  stickyHeader = true,
  hasVirtualized = false,
  hasExpand = false,
  hasSelection = false,
  hasNoColumn = false,
  isLoading,
  className,
  filterSearchProps,
  renderSubComponent,
}: TableProps<TData>) {
  const memoizedColumns = useMemo(() => {
    let innerColumns = columns;

    if (hasNoColumn) {
      innerColumns = [createNoColumn(), ...innerColumns];
    }
    if (hasExpand) {
      innerColumns = [createExpandingColumn(), ...innerColumns];
    }
    if (hasSelection) {
      innerColumns = [createSelectionColumn(), ...innerColumns];
    }
    return innerColumns;
  }, [columns, hasExpand, hasSelection, hasNoColumn]);

  const { sorting, sortingOptions } = useTableSorting<TData>(tableOptions);
  const { columnFilters, globalFilter, tableFilterOptions, setColumnFilters, setGlobalFilter } =
    useTableFilters<TData>(tableOptions);
  const { expanded, expandOptions } = useTableExpand<TData>({ options: tableOptions, hasExpand });
  const { rowSelection, selectionOptions } = useTableSelection<TData>({
    options: tableOptions,
    hasSelection,
  });
  const { pagination, paginationOptions } = useTablePagination<TData>({
    options: tableOptions,
    apiParams,
    hasPagination,
    hasVirtualized,
  });

  const {
    data,
    error,
    isLoading: fetchingIsLoading,
    mutate,
  } = useTableFetching<TData>({
    api,
    sorting,
    columnFilters,
    globalFilter,
    pagination,
    apiParams,
  });
  const { tableData, updateTableData } = useTableData<TData>({
    data: data?.results ?? staticData,
    isLoading: fetchingIsLoading,
  });

  const rowCountRef = useRef(0);

  const rowCount = useMemo(() => {
    if (!rowCountRef.current && data?.pagination?.total_items) {
      rowCountRef.current = data.pagination.total_items ?? tableData.length;
    }
    return rowCountRef.current;
  }, [data?.pagination?.total_items, tableData.length]);

  const table = useReactTable({
    data: tableData,
    columns: memoizedColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      expanded,
      rowSelection,
      pagination,
    },
    meta: {
      updateData: updateTableData,
    },
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    ...(tableOptions?.manualPagination && {
      rowCount,
    }),
    ...sortingOptions,
    ...tableFilterOptions,
    ...expandOptions,
    ...selectionOptions,
    ...paginationOptions,
    ...tableOptions,
  });

  // const tableRef = useRef(table);

  useImperativeHandle(ref, () => ({
    getData: () => tableData,
    table: table,
  }));

  const { rows } = table.getRowModel();

  return (
    <div className="flex h-full flex-col space-y-4">
      <TableFilterSearch
        filterOptions={filterOptions}
        setGlobalFilter={setGlobalFilter}
        setColumnFilters={setColumnFilters}
        resetColumnFilters={table.resetColumnFilters}
        {...filterSearchProps}
      >
        {children}
      </TableFilterSearch>
      {hasVirtualized ? (
        <TableVirtualized
          rows={rows}
          border={border}
          height={height}
          table={table}
          isLoading={isLoading ?? fetchingIsLoading}
          error={error}
          mutate={mutate}
          renderSubComponent={renderSubComponent}
          className={className}
        />
      ) : (
        <TableUnvirtualized
          rows={rows}
          border={border}
          height={height}
          table={table}
          stickyHeader={stickyHeader}
          isLoading={isLoading ?? fetchingIsLoading}
          error={error}
          mutate={mutate}
          renderSubComponent={renderSubComponent}
          className={className}
        />
      )}
      {hasPagination && !hasVirtualized && (
        <TablePagination
          // pageIndex={table.getState().pagination.pageIndex}
          // pageSize={table.getState().pagination.pageSize}
          // pageCount={table.getPageCount()}
          // selectedRows={table.getFilteredSelectedRowModel().rows.length}
          // totalRows={table.getFilteredRowModel().rows.length}
          // canPreviousPage={table.getCanPreviousPage()}
          // canNextPage={table.getCanNextPage()}
          // setPageIndex={table.setPageIndex}
          // setPageSize={table.setPageSize}
          // previousPage={table.previousPage}
          // nextPage={table.nextPage}
          table={table}
          hasSelection={hasSelection}
        />
      )}
    </div>
  );
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: TData) => void;
  }
}
