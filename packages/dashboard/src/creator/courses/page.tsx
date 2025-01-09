'use client';
import type { ICourse } from '@oe/api/types/course/course';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { type ColumnDef, Table } from '@oe/ui/components/table';
import { useMemo } from 'react';

export default function Courses() {
  const columns: ColumnDef<ICourse>[] = useMemo(() => {
    return [
      {
        header: 'Name',
        accessorKey: 'name',
        size: 250,
      },
    ];
  }, []);

  return (
    <>
      <Table columns={columns} api={API_ENDPOINT.COURSES} tableOptions={{ manualPagination: true }} hasNoColumn />
    </>
  );
}
