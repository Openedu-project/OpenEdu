import { type ExpandedState, type TableOptions, getExpandedRowModel } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

export type TableExpandOptions<T> = {
  expanded: ExpandedState;
  expandOptions: Partial<TableOptions<T>>;
};

export function useTableExpand<T>({
  options,
  hasExpand,
}: { options?: Partial<TableOptions<T>>; hasExpand?: boolean }): TableExpandOptions<T> {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const expandOptions = useMemo<Partial<TableOptions<T>>>(
    () =>
      hasExpand
        ? {
            getRowCanExpand: () => true,
            onExpandedChange: setExpanded,
            getExpandedRowModel: getExpandedRowModel(),
            ...options,
          }
        : {},
    [options, hasExpand]
  );

  return { expanded, expandOptions };
}
