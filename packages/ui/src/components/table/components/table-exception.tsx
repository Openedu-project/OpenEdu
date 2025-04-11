import type { HTTPError } from '@oe/api';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import { TableCell } from '#shadcn/table';
import { TableRow } from '#shadcn/table';
import type { TableProps } from '../types';

export function TableException<TData>({ error, table, mutate }: Partial<TableProps<TData>>) {
  const tError = useTranslations('errors');
  const tTable = useTranslations('table');

  return (
    <TableRow>
      <TableCell colSpan={table?.getVisibleLeafColumns().length} className="h-24 text-center">
        {error ? (
          <div>
            <p className="mb-4 font-medium text-lg">{tError((error as HTTPError).message)}</p>
            <Button onClick={() => mutate?.()}>{tError('tryAgain')}</Button>
          </div>
        ) : (
          tTable('noDataAvailable')
        )}
      </TableCell>
    </TableRow>
  );
}
