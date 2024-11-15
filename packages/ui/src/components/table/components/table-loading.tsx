import { Spinner } from '#components/spinner';
import type { TableProps } from '../types';

export function TableLoading<TData>({ isLoading, table }: Partial<TableProps<TData>>) {
  if (isLoading) {
    return (
      <tr>
        <td colSpan={table?.getVisibleLeafColumns().length}>
          <Spinner backdrop center className="z-40" />
        </td>
      </tr>
    );
  }
  return null;
}
