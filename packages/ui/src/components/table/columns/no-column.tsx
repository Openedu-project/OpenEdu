import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

export function createNoColumn<TData>(): ColumnDef<TData> {
  const t = useTranslations('table');

  return {
    id: 'no',
    header: () => t('no'),
    cell: ({ row, table }) =>
      (table.getState().pagination.pageIndex - 1) * table.getState().pagination.pageSize + row.index + 1,
    size: 50,
  };
}
