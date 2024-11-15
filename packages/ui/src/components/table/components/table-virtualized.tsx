'use no memo';
import { TableVirtuoso } from 'react-virtuoso';
import { Table, TableBody, TableHeader } from '#shadcn/table';
import { cn } from '#utils/cn';
import type { TableProps } from '../types';
import { TableException } from './table-exception';
import { TableHeaderRows } from './table-header-rows';
import { TableLoading } from './table-loading';
import { TableRowComponent } from './table-row';

export function TableVirtualized<TData>({
  rows = [],
  height = '100%',
  border = 'bordered-rows',
  isLoading,
  table,
  error,
  className,
  mutate,
  renderSubComponent,
}: Partial<TableProps<TData>>) {
  return (
    <TableVirtuoso<TData>
      style={{ height }}
      className={cn('scrollbar', className)}
      totalCount={rows.length}
      components={{
        Table: ({ style, ...props }) => <Table {...props} style={style} />,
        TableHead: props => <TableHeader {...props} />,
        TableBody: ({ children, ...props }) => (
          <TableBody {...props}>
            <TableLoading isLoading={isLoading} table={table} />
            {rows.length === 0 && !isLoading ? (
              <TableException error={error} table={table} mutate={mutate} />
            ) : (
              children
            )}
          </TableBody>
        ),
        TableRow: props => (
          <TableRowComponent rows={rows} border={border} renderSubComponent={renderSubComponent} {...props} />
        ),
      }}
      fixedHeaderContent={() => <TableHeaderRows border={border} headerGroups={table?.getHeaderGroups() ?? []} />}
    />
  );
}
