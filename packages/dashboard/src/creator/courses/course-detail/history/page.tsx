'use client';

// import { getCourseHistoryService } from "@oe/api/services/course";
import type { ICourse } from '@oe/api/types/course/course';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { formatDate } from '@oe/core/utils/datetime';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';

import { Button } from '@oe/ui/shadcn/button';
import CourseStatus from '../../_components/course-status';
import { CourseBadgeVersion } from '../../course-table/course-badge-version';
import { FeedbackSection } from './_components/feedback-section';
import { ManageVersion } from './_components/manage-version';
import { getPreviewUrl, getPublishedVersionFromCourseData, getReviewingVersionFromCourseData } from './_utils/function';

export default function CourseDetailHistoryPage() {
  const t = useTranslations('course');
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const { course } = useGetCourseById(courseId);
  const [showFeedback, setShowFeedback] = useState(false);
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
    <div className="relative flex h-full flex-col gap-2 px-4 py-2" id="outline-history-container">
      {/* Header */}
      <div className="flex flex-col items-center justify-between gap-2 rounded-md border bg-background p-2 md:flex-row md:gap-4">
        <ManageVersion
          publishedVersion={getPublishedVersionFromCourseData(course)}
          reviewingVersion={getReviewingVersionFromCourseData(course)}
          previewUrl={getPreviewUrl(course)}
        />
        {/* Trigger to open the feedback section */}
        <Button onClick={toggleFeedback} size="sm" variant={showFeedback ? 'secondary' : 'default'}>
          {showFeedback ? 'Hide Feedback' : 'Feedback'}
        </Button>
      </div>

      {/* Content: history table - feedback list */}
      <div className="mx-auto flex h-full justify-center overflow-hidden">
        <div className="relative mx-auto flex w-full gap-2">
          <div
            className={`scrollbar flex h-full flex-col gap-4 overflow-auto bg-background p-4 transition-all duration-300 ease-in-out ${
              showFeedback ? 'w-1/2 max-w-1/2' : 'w-full max-w-5xl'
            }`}
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

          {/* Feedback section with animation */}
          <div
            className={`h-full w-1/2 shrink-0 cursor-pointer flex-col gap-2 overflow-y-auto rounded-md bg-background p-4 transition-all duration-300 ease-in-out ${
              showFeedback
                ? 'translate-x-0 cursor-default opacity-100 md:flex'
                : 'pointer-events-none absolute right-0 translate-x-full opacity-0 md:flex'
            }`}
          >
            <p>This history includes Admin Open Edu, Admin Organization and Creator (You)</p>
            <FeedbackSection />
          </div>
        </div>
      </div>
    </div>
  );
}
