'use client';

// import { getCourseHistoryService } from "@oe/api/services/course";
import type { ICourse } from '@oe/api/types/course/course';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { formatDate } from '@oe/core/utils/datetime';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';

import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import CourseStatus from '../../_components/course-status';
import { CourseBadgeVersion } from '../../course-table/course-badge-version';
import { FeedbackSection } from './_components/feedback-section';
import { ManageVersion } from './_components/manage-version';
import { getPublishedVersionFromCourseData, getReviewingVersionFromCourseData } from './_utils/function';

export default function CourseDetailHistoryPage() {
  const t = useTranslations('course');
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const searchParams = useSearchParams();
  const isShowFeedback = searchParams.get('feedback');
  const { course } = useGetCourseById(courseId);
  const [showFeedback, setShowFeedback] = useState(!!isShowFeedback);
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

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <div className="relative flex h-full flex-1 gap-2 px-4 py-2" id="outline-history-container">
      <div
        className={cn(
          'relative h-full space-y-4 transition-all duration-300 ease-in-out',
          showFeedback ? 'w-2/3 max-w-2/3' : 'w-full'
        )}
      >
        {/* Header */}
        <div className="flex h-[60px] flex-col items-center justify-between gap-2 rounded-md border bg-background p-4 md:flex-row md:gap-4">
          <ManageVersion
            publishedVersion={getPublishedVersionFromCourseData(course)}
            reviewingVersion={getReviewingVersionFromCourseData(course)}
          />
          {/* Trigger to open the feedback section */}

          <Button onClick={toggleFeedback} size="sm" variant="secondary">
            {showFeedback ? t('history.feedback.hide') : t('history.feedback.view')}
          </Button>
        </div>

        {/* Content: history table */}
        <div className="flex h-[calc(100%-76px)] w-full flex-1 justify-center overflow-hidden rounded">
          {/* <div className="relative mx-auto flex w-full gap-2"> */}
          <div
            className={cn(
              'scrollbar flex h-full w-full flex-col gap-4 overflow-auto bg-background p-4',
              showFeedback ? '' : 'max-w-5xl'
            )}
          >
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
          {/* </div> */}
        </div>
      </div>

      {/* Feedback section with animation */}
      <FeedbackSection showFeedback={showFeedback} />
    </div>
  );
}
