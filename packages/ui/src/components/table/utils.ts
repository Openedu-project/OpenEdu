import type { ColumnDef, TableBorder } from './types';

import type { Cell, Header } from '@tanstack/react-table';
import { cn } from '#utils/cn';

export function getCellClassName<TData>(
  cell: Cell<TData, unknown>,
  border: 'bordered' | 'bordered-rows',
  className?: string
) {
  const isSticky = (cell.column.columnDef as ColumnDef<TData>).sticky;
  const alignClass =
    (cell.column.columnDef as ColumnDef<TData>).align &&
    `text-${(cell.column.columnDef as ColumnDef<TData>).align} justify-${(cell.column.columnDef as ColumnDef<TData>).align}`;

  const stickyClasses = isSticky
    ? [
        'md:sticky md:isolate md:z-20',
        border === 'bordered'
          ? 'md:after:absolute md:after:inset-y-0 md:after:z-[-1] md:after:w-[10px] md:first:border-l'
          : 'md:[&:has([role=checkbox])]:pr-0 md:after:absolute md:after:inset-y-0 md:after:z-[-1] md:after:w-[10px]',
        isSticky === 'right'
          ? 'md:right-0 md:after:left-0 md:after:shadow-[inset_-10px_0_8px_-8px_rgba(5,5,5,0.06)]'
          : 'md:left-0 md:after:right-0 md:after:shadow-[inset_10px_0_8px_-8px_rgba(5,5,5,0.06)]',
      ]
    : border === 'bordered'
      ? 'border-r first:border-l'
      : '[&:has([role=checkbox])]:pr-0';

  return cn(
    'flex items-center self-stretch bg-background px-4 py-2',
    alignClass,
    stickyClasses,
    cell.column.id === 'expander' ? 'p-0' : '',
    className
  );
}

export function getHeaderClassName<TData>({
  header,
  index,
  border,
  headerGroupsLength,
  className,
}: {
  header: Header<TData, unknown>;
  index: number;
  border?: TableBorder;
  headerGroupsLength: number;
  className?: string;
}) {
  const isSticky = (header.column.columnDef as ColumnDef<TData>).sticky;
  const alignClass =
    (header.column.columnDef as ColumnDef<TData>).align &&
    `text-${(header.column.columnDef as ColumnDef<TData>).align} justify-${(header.column.columnDef as ColumnDef<TData>).align}`;
  const stickyClasses = isSticky
    ? [
        'md:sticky md:isolate md:z-20',
        border === 'bordered'
          ? 'md:border-t md:after:absolute md:after:inset-y-0 md:after:z-[-1] md:after:w-[10px] md:first:border-l'
          : 'md:[&:has([role=checkbox])]:pr-0 md:after:absolute md:after:inset-y-0 md:after:z-[-1] md:after:w-[10px]',
        isSticky === 'right'
          ? 'md:right-0 md:after:left-0 md:after:shadow-[inset_-10px_0_8px_-8px_rgba(5,5,5,0.06)]'
          : 'md:left-0 md:after:right-0 md:after:shadow-[inset_10px_0_8px_-8px_rgba(5,5,5,0.06)]',
      ]
    : index === headerGroupsLength - 1
      ? border === 'bordered'
        ? 'border-t border-r first:border-l'
        : ' [&:has([role=checkbox])]:pr-0'
      : border === 'bordered'
        ? 'border-t border-r first:border-l'
        : '[&:has([role=checkbox])]:pr-0 border-b';

  return cn('flex items-center bg-muted', alignClass, stickyClasses, header.id === 'expander' ? 'p-0' : '', className);
}
