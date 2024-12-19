'use client';

import type { IOrganization } from '@oe/api/types/organizations';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { type ColumnDef, Table, TableEditableCell, type TableRef } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { useEffect, useMemo, useRef, useState } from 'react';

const filterOptions: FilterOption[] = [
  { value: 'global', label: 'All', type: 'search', id: 'global' },
  {
    value: 'active',
    label: 'Active',
    type: 'select',
    id: 'active',
    options: [
      { value: true, label: 'Active' },
      { value: false, label: 'Inactive' },
    ],
  },
];

export default function TableDemo() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count]);
  const columns: ColumnDef<IOrganization>[] = useMemo(() => {
    return [
      {
        accessorKey: 'name',
        header: 'Name',
        sticky: 'left',
      },
      {
        accessorKey: 'domain',
        header: 'Domain',
        cell: info => <TableEditableCell<IOrganization> {...info} />,
        size: 500,
      },
      {
        accessorKey: 'active',
        header: 'Active',
        cell: info => (
          <Badge variant={info.getValue() ? 'success' : 'destructive'}>{info.getValue() ? 'Active' : 'Inactive'}</Badge>
        ),
        enableSorting: false,
      },
    ];
  }, []);

  const reviewColumns: ColumnDef<{ rating: number }>[] = useMemo(
    () => [
      {
        accessorKey: 'rating',
        header: 'Rating',
      },
    ],
    []
  );

  const tableRef = useRef<TableRef<IOrganization>>(null);

  return (
    <div>
      Time: {count}
      <Table
        // data={data}
        api={API_ENDPOINT.ADMIN_ORGANIZATIONS}
        apiParams={{
          page: 1,
          per_page: 2,
        }}
        columns={columns}
        filterOptions={filterOptions}
        ref={tableRef}
        height="500px"
        border="bordered-rows"
        tableOptions={{
          manualPagination: true,
        }}
        renderSubComponent={() => {
          return (
            <Table
              stickyHeader={false}
              data={[{ rating: 5 }, { rating: 4 }]}
              columns={reviewColumns}
              hasPagination={false}
            />
          );
        }}
      >
        <Button onClick={() => console.log(tableRef.current?.getData())}>save</Button>
        <Button>Add</Button>
      </Table>
    </div>
  );
}
