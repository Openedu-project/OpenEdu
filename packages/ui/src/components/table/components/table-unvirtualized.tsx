'use no memo';

import { TableBody, TableHeader, Table as TableUI } from '#shadcn/table';
import { cn } from '#utils/cn';
import type { TableProps } from '../types';
import { TableException } from './table-exception';
import { TableHeaderRows } from './table-header-rows';
import { TableLoading } from './table-loading';
import { TableRows } from './table-rows';

export function TableUnvirtualized<TData>({
  rows = [],
  height = '100%',
  border = 'bordered-rows',
  table,
  stickyHeader = false,
  isLoading = false,
  error,
  className,
  mutate,
  renderSubComponent,
}: Partial<TableProps<TData>>) {
  return (
    <div className={cn('scrollbar relative w-full overflow-auto [overflow-anchor:none]', className)} style={{ height }}>
      <TableUI className="h-full border-separate border-spacing-0">
        <TableHeader className={cn(stickyHeader ? 'sticky top-0 z-30' : '')}>
          <TableHeaderRows headerGroups={table?.getHeaderGroups() ?? []} border={border} />
        </TableHeader>
        <TableBody className="relative">
          <TableLoading isLoading={isLoading} table={table} rows={rows} />
          {rows.length === 0 && !isLoading ? (
            <TableException error={error} table={table} mutate={mutate} />
          ) : (
            <TableRows table={table} border={border} renderSubComponent={renderSubComponent} />
          )}
        </TableBody>
      </TableUI>
    </div>
  );
}
