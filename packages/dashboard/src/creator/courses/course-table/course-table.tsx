'use client';
import { API_ENDPOINT } from '@oe/api';
import type { ICourse } from '@oe/api';
import { formatDateTime } from '@oe/core';
import type { FilterOption } from '@oe/ui';
import { type ColumnDef, Table } from '@oe/ui';
import { Badge } from '@oe/ui';
import { CoursePrice } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { CourseStatus } from '../_components/course-status';
import { CourseActions } from './course-actions';
import { CourseBadgeVersion } from './course-badge-version';
import { CourseName } from './course-name';
// import CoursePrice from './course-price';

export function Courses() {
  const tCourse = useTranslations('course');

  const columns: ColumnDef<ICourse>[] = useMemo(() => {
    return [
      {
        header: tCourse('table.name'),
        accessorKey: 'name',
        size: 250,
        cell: item => <CourseName data={item.row.original} />,
      },
      {
        header: tCourse('table.status'),
        accessorKey: 'active',
        cell: item => <CourseStatus data={item.row.original} />,
        size: 130,
      },
      {
        header: tCourse('table.type'),
        size: 100,
        cell: item => (
          <>
            {item.row.original.is_ai_generated ? (
              item.row.original.ai_course?.offer_type === 'youtube_playlist' ? (
                <Badge variant="outline_destructive">{tCourse('types.youtube')}</Badge>
              ) : (
                <Badge variant="outline_secondary">{tCourse('types.ai')}</Badge>
              )
            ) : (
              <Badge variant="outline_primary">{tCourse('types.manual')}</Badge>
            )}
          </>
        ),
      },
      {
        header: tCourse('table.price'),
        size: 150,
        cell: item => <CoursePrice priceSettings={item.row.original.price_settings} />,
      },
      {
        header: tCourse('table.published'),
        size: 100,
        align: 'center',
        cell: item => <CourseBadgeVersion version={item.row.original.published?.[0]?.version} />,
      },
      {
        header: tCourse('table.reviewing'),
        size: 100,
        align: 'center',
        cell: item => (
          <CourseBadgeVersion
            version={item.row.original.org_request?.entity_version ?? item.row.original.props?.request_version}
          />
        ),
      },
      {
        header: tCourse('table.learners'),
        size: 100,
        accessorKey: 'learner_count',
        align: 'center',
      },
      {
        header: tCourse('table.updatedAt'),
        size: 150,
        // accessorKey: "updated_at",
        align: 'center',
        cell: item =>
          (item.row.original.update_at ?? item.row.original.create_at) ? (
            formatDateTime(item.row.original.update_at ?? item.row.original.create_at)
          ) : (
            <span className="giant-iheading-semibold20 text-primary">-</span>
          ),
      },
      {
        header: tCourse('table.actions'),
        size: 250,
        align: 'center',
        sticky: 'right',
        cell: item => <CourseActions data={item.row.original} />,
      },
    ];
  }, [tCourse]);

  const filterOptions: FilterOption[] = useMemo(
    () => [
      {
        label: tCourse('table.name'),
        value: 'name',
        placeholder: tCourse('table.searchName'),
        type: 'search',
        id: 'name',
      },
    ],
    [tCourse]
  );

  return (
    <>
      <Table
        columns={columns}
        api={API_ENDPOINT.COURSES}
        filterOptions={filterOptions}
        apiQueryParams={{
          sort: 'update_at desc',
          preloads: ['Published', 'Reviewing', 'AICourse'],
        }}
        tableOptions={{ manualPagination: true }}
        hasNoColumn
      />
    </>
  );
}
