import type { ColumnDef } from '@tanstack/react-table';

export function createNoColumn<TData>(): ColumnDef<TData> {
  return {
    id: 'no',
    header: () => 'No',
    cell: ({ row, table }) => {
      const pageSize = table.getState().pagination.pageSize;
      const pageIndex = table.getState().pagination.pageIndex;
      return pageIndex * pageSize + row.index + 1;
    },
    size: 50,
  };
}
