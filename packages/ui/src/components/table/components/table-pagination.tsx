'use no memo';
import type { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';

interface TablePaginationProps<TData> {
  // pageIndex: number;
  // pageSize: number;
  // pageCount: number;
  // selectedRows: number;
  // totalRows: number;
  // canPreviousPage: boolean;
  // canNextPage: boolean;
  hasSelection: boolean;
  // setPageIndex: (index: number) => void;
  // setPageSize: (size: number) => void;
  // previousPage: () => void;
  // nextPage: () => void;
  table: Table<TData>;
}

export function TablePagination<TData>({
  hasSelection,
  // pageIndex,
  // pageSize,
  // pageCount,
  // selectedRows,
  // totalRows,
  // canPreviousPage,
  // canNextPage,
  // setPageIndex,
  // setPageSize,
  // previousPage,
  // nextPage,
  table,
}: TablePaginationProps<TData>) {
  const t = useTranslations('table');
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const totalRows = table.getFilteredRowModel().rows.length;
  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();
  const setPageIndex = table.setPageIndex;
  const setPageSize = table.setPageSize;
  const previousPage = table.previousPage;
  const nextPage = table.nextPage;

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-4 py-3 md:flex-row">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {hasSelection && (
          <div className="flex-1 whitespace-nowrap text-center text-muted-foreground text-sm md:text-left">
            {t('selectedRows', { selectedRows, totalRows })}
          </div>
        )}
        <div className="flex items-center space-x-3">
          <p className="font-medium text-sm">{t('rowsPerPage')}</p>
          <Select
            value={pageSize.toString()}
            onValueChange={value => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] border-gray-200">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{t('page')}</span>
          <Input
            type="number"
            min={1}
            max={pageCount}
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
            className="h-8 w-14"
          />
          <span className="whitespace-nowrap font-medium text-sm"> / {pageCount.toLocaleString()}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(0)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">{t('firstPage')}</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={previousPage} disabled={!canPreviousPage}>
            <span className="sr-only">{t('previousPage')}</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={nextPage} disabled={!canNextPage}>
            <span className="sr-only">{t('nextPage')}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">{t('lastPage')}</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
