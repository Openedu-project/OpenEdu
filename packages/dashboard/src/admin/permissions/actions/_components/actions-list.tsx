'use client';
import { API_ENDPOINT } from '@oe/api';
import type { IPermissionConfigActionItem } from '@oe/api';
import { type ColumnDef, Table, type TableRef } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export function ActionsList() {
  const t = useTranslations('permissionActionList');
  const tableRef = useRef<TableRef<IPermissionConfigActionItem>>(null);

  const columns: ColumnDef<IPermissionConfigActionItem>[] = [
    {
      header: t('name'),
      accessorKey: 'name',
      size: 200,
    },
    {
      id: 'translation',
      header: t('description'),
      accessorKey: 'description',
      size: 500,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        api={API_ENDPOINT.PAGE_CONFIGS}
        apiQueryParams={{
          type: 'action',
          page: 1,
          per_page: 10,
        }}
        height="100%"
        ref={tableRef}
        filterSearchProps={{ useQueryParams: true }}
        tableOptions={{ manualPagination: true }}
      />
    </>
  );
}
