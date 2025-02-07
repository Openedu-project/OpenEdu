import { Spinner } from '#components/spinner';
import { cn } from '#utils/cn';
import type { TableProps } from '../types';

export function TableLoading<TData>({ isLoading, table, rows }: Partial<TableProps<TData>>) {
  if (isLoading) {
    return (
      <tr>
        <td colSpan={table?.getVisibleLeafColumns().length} className={cn(rows?.length === 0 ? 'h-[200px]' : '')}>
          <Spinner backdrop center className="z-40" />
        </td>
      </tr>
    );
  }
  return null;
}
