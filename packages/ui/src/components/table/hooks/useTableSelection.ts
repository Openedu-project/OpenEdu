import type { RowSelectionState, TableOptions } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

export type TableSelectionOptions<T> = {
  rowSelection: RowSelectionState;
  selectionOptions: Partial<TableOptions<T>>;
};

export function useTableSelection<T>({
  hasSelection,
  options,
}: { options?: Partial<TableOptions<T>>; hasSelection?: boolean }): TableSelectionOptions<T> {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectionOptions = useMemo<Partial<TableOptions<T>>>(
    () =>
      hasSelection
        ? {
            onRowSelectionChange: setRowSelection,
            ...options,
          }
        : {},
    [options, hasSelection]
  );

  return { rowSelection, selectionOptions };
}
