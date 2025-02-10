'use client';
import type { ICourse } from '@oe/api/types/course/course';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { formatDateTime } from '@oe/core/utils/datetime';
import { type ColumnDef, Table } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import CourseStatus from '../_components/course-status';
import CourseActions from './course-actions';
import { CourseBadgeVersion } from './course-badge-version';
import CourseName from './course-name';
import CoursePrice from './course-price';

export default function Courses() {
  const tCourses = useTranslations('courses');

  const columns: ColumnDef<ICourse>[] = useMemo(() => {
    return [
      {
        header: 'Name',
        accessorKey: 'name',
        size: 250,
        cell: item => <CourseName data={item.row.original} />,
      },
      {
        header: 'Status',
        accessorKey: 'active',
        cell: item => <CourseStatus data={item.row.original} />,
        size: 100,
      },
      {
        header: 'Type',
        size: 100,
        cell: item => (
          <>
            {item.row.original.is_ai_generated ? (
              item.row.original.ai_course?.offer_type === 'youtube_playlist' ? (
                <Badge variant="outline_destructive">{tCourses('type.youtube')}</Badge>
              ) : (
                <Badge variant="outline_secondary">{tCourses('type.ai')}</Badge>
              )
            ) : (
              <Badge variant="outline_primary">{tCourses('type.manual')}</Badge>
            )}
          </>
        ),
      },
      {
        header: 'Price',
        size: 150,
        cell: item => <CoursePrice priceSettings={item.row.original.price_settings} />,
      },
      {
        header: 'Published',
        size: 100,
        align: 'center',
        cell: item => <CourseBadgeVersion version={item.row.original.published?.[0]?.version} />,
      },
      {
        header: 'Reviewing',
        size: 100,
        align: 'center',
        cell: item => <CourseBadgeVersion version={item.row.original.org_request?.entity_version} />,
      },
      {
        header: 'Learners',
        size: 100,
        accessorKey: 'learner_count',
        align: 'center',
      },
      {
        header: 'Updated At',
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
        header: 'Actions',
        size: 250,
        align: 'center',
        sticky: 'right',
        cell: item => <CourseActions data={item.row.original} />,
      },
    ];
  }, [tCourses]);

  return (
    <>
      <Table
        columns={columns}
        api={API_ENDPOINT.COURSES}
        apiParams={{
          sort: 'update_at desc',
          preloads: ['Published', 'Reviewing', 'AICourse'],
        }}
        tableOptions={{ manualPagination: true }}
        hasNoColumn
      />
    </>
  );
}
