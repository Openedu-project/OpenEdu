import type { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '#shadcn/button';

export function createExpandingColumn<TData>(): ColumnDef<TData> {
  return {
    id: 'expander',
    header: ({ table }) => (
      <Button variant="ghost" size="icon" onClick={table.getToggleAllRowsExpandedHandler()}>
        {table.getIsAllRowsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    ),
    cell: ({ row }) =>
      row.getCanExpand() && (
        <Button variant="ghost" size="icon" onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      ),
    size: 50,
  };
}
