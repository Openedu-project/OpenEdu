import { flexRender } from '@tanstack/react-table';

import { TableCell } from '#shadcn/table';

import type { Row } from '@tanstack/react-table';
import type { HTMLAttributes, ReactNode } from 'react';
import { TableRow } from '#shadcn/table';
import type { ColumnDef, TableBorder } from '../types';
import { getCellClassName } from '../utils';

export const TableRowComponent = <TData,>({
  rows,
  row,
  border = 'bordered-rows',
  renderSubComponent,
  ...props
}: {
  rows?: Row<TData>[];
  row?: Row<TData>;
  border?: TableBorder;
  renderSubComponent?: (props: { row: Row<TData> }) => ReactNode;
} & HTMLAttributes<HTMLTableRowElement> & { 'data-index'?: number }) => {
  const index = props?.['data-index'] ?? 0;
  const innerRow = rows?.[index] ?? row;

  if (!innerRow) {
    return null;
  }

  return (
    <TableRow
      key={innerRow.id}
      data-state={innerRow.getIsSelected() && 'selected'}
      className="flex flex-wrap items-center hover:bg-background"
      {...props}
    >
      {innerRow.getVisibleCells().map(cell => (
        <TableCell
          key={cell.id}
          className={getCellClassName(cell, border, (cell.column.columnDef as ColumnDef<TData>).className)}
          style={{ minWidth: cell.column.getSize(), width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
      {innerRow.getIsExpanded() && renderSubComponent && (
        <TableCell className="basis-full p-0" colSpan={innerRow.getVisibleCells().length}>
          {renderSubComponent({ row: innerRow })}
        </TableCell>
      )}
    </TableRow>
  );
};
