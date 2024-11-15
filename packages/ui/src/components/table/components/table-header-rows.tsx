import { type HeaderGroup, flexRender } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
import { ArrowUp } from 'lucide-react';
import { TableHead, TableRow } from '#shadcn/table';
import { cn } from '#utils/cn';
import type { ColumnDef, TableBorder } from '../types';
import { getHeaderClassName } from '../utils';

export function TableHeaderRows<TData>({
  headerGroups,
  border,
}: { headerGroups: HeaderGroup<TData>[]; border: TableBorder }) {
  return headerGroups.map((headerGroup, index) => (
    <TableRow key={headerGroup.id} className="flex bg-muted last:border-b-2 hover:bg-muted">
      {headerGroup.headers.map(header => (
        <TableHead
          key={header.id}
          colSpan={header.colSpan}
          style={{
            minWidth: header.getSize(),
            width: header.getSize(),
          }}
          className={getHeaderClassName({
            header,
            index,
            border,
            headerGroupsLength: headerGroups.length,
            className: (header.column.columnDef as ColumnDef<TData>).className,
          })}
        >
          {header.id === 'expander' ? (
            flexRender(header.column.columnDef.header, header.getContext())
          ) : header.isPlaceholder ? null : (
            <div
              className={cn(
                'flex items-center gap-2',
                header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                (header.column.columnDef as ColumnDef<TData>).align &&
                  `justify-${(header.column.columnDef as ColumnDef<TData>).align}`
              )}
              onClick={header.column.getToggleSortingHandler()}
              onKeyDown={() => {
                void 0;
              }}
            >
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getCanSort() &&
                (header.column.getIsSorted() === 'asc' ? (
                  <ArrowUp className="h-4 w-4 text-primary" />
                ) : header.column.getIsSorted() === 'desc' ? (
                  <ArrowDown className="h-4 w-4 text-primary" />
                ) : (
                  <ArrowUpDown className="h-4 w-4" />
                ))}
            </div>
          )}
        </TableHead>
      ))}
    </TableRow>
  ));
}
