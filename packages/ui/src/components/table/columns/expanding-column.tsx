import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '#shadcn/button';
import type { ColumnDef } from '../types';

export function createExpandingColumn<TData>(props?: Partial<ColumnDef<TData>>): ColumnDef<TData> {
  return {
    ...props,
    id: 'expander',
    header: ({ table }) => (
      <Button variant="ghost" size="icon" onClick={table.getToggleAllRowsExpandedHandler()} className="mx-auto">
        {table.getIsAllRowsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) =>
      row.getCanExpand() && (
        <Button variant="ghost" size="icon" onClick={row.getToggleExpandedHandler()} className="mx-auto">
          {row.getIsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      ),
    size: 50,
  };
}
