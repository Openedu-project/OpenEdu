'use client';

// import { getCourseHistoryService } from "@oe/api/services/course";
import type { ICourse } from '@oe/api/types/course/course';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo, useRef } from 'react';

import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { formatDate } from '@oe/core/utils/datetime';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import CourseStatus from '../../_components/course-status';
import { CourseBadgeVersion } from '../../course-table/course-badge-version';

export default function CourseDetailHistoryPage() {
  const t = useTranslations('course');
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const { course } = useGetCourseById(courseId);

  const tableRef = useRef<TableRef<ICourse>>(null);

  const columns: ColumnDef<ICourse>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('history.name'),
        enableSorting: false,
        size: 250,
        cell: ({ row }) => (
          <div className="truncate font-medium" title={row.original.name}>
            {row.original.name}
          </div>
        ),
      },
      {
        accessorKey: 'version',
        header: t('history.version'),
        enableSorting: false,
        size: 120,
        cell: ({ row }) => <CourseBadgeVersion version={row.original.version} />,
      },
      {
        accessorKey: 'pub_date',
        header: t('history.publishDate'),
        enableSorting: false,
        align: 'center',
        cell: ({ row }) => {
          const timestamp = row.original.pub_date;
          if (!timestamp) {
            return '-';
          }
          return formatDate(timestamp);
        },
      },
      {
        accessorKey: 'create_at',
        header: t('history.requestTime'),
        enableSorting: false,
        align: 'center',
        cell: ({ row }) => {
          const timestamp = row.original.create_at;
          if (!timestamp) {
            return '-';
          }
          return formatDate(timestamp);
        },
      },
      {
        accessorKey: 'status',
        header: t('history.status'),
        enableSorting: false,
        size: 150,
        cell: ({ row }) => <CourseStatus data={row.original} />,
      },
    ],
    [t]
  );

  return (
    <div className="mx-auto h-full max-w-[900px] px-1 py-4">
      <div className="scrollbar flex h-full flex-col gap-4 overflow-auto bg-background p-4">
        <Table
          ref={tableRef}
          api={API_ENDPOINT.COURSES_ID_HISTORIES}
          apiParams={{ id: course?.cuid }}
          apiQueryParams={{
            sort: 'version desc',
          }}
          columns={columns}
          hasNoColumn
          tableOptions={{
            manualPagination: true,
          }}
        />
      </div>
    </div>
  );
}
