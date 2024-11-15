import type { TableProps } from '../types';
import { TableRowComponent } from './table-row';

export function TableRows<TData>({ table, border, renderSubComponent }: Partial<TableProps<TData>>) {
  return table
    ?.getRowModel()
    .rows.map(row => (
      <TableRowComponent key={row.id} row={row} border={border} renderSubComponent={renderSubComponent} />
    ));
}
