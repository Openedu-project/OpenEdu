'use client';

import { API_ENDPOINT } from '@oe/api';
import { useGetCourseById } from '@oe/api';
import type { ILearningProgressOverview } from '@oe/api';
// import { formatDate } from "@oe/core";
// import { Progress } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { formatDate } from '@oe/core';
import { Skeleton } from '@oe/ui';
import type { FilterOption } from '@oe/ui';
import { type ColumnDef, Table } from '@oe/ui';
import { Badge } from '@oe/ui';

interface ILearnerData {
  id: string;
  username: string;
  email: string;
  create_at: number;
  learning_progress_overview?: ILearningProgressOverview;
}

export function CourseDetailLearnersPage() {
  const t = useTranslations('course');
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;

  const { course, courseLoading } = useGetCourseById(courseId);

  const columns: ColumnDef<ILearnerData>[] = useMemo(
    () => [
      {
        accessorKey: 'user.username',
        header: t('learner.username'),
        enableSorting: false,
        size: 200,
      },
      {
        accessorKey: 'user.email',
        header: t('learner.email'),
        enableSorting: false,
        size: 200,
      },
      {
        accessorKey: 'user.phone',
        header: t('learner.phone'),
        enableSorting: false,
        size: 200,
      },
      {
        accessorKey: 'create_at',
        header: t('learner.enrollDate'),
        enableSorting: true,
        size: 200,
        cell: ({ row }) => {
          const timestamp = row.original.create_at;
          return timestamp ? formatDate(timestamp) : '-';
        },
      },
      {
        accessorKey: 'learning_progress_overview',
        header: t('learner.progress'),
        enableSorting: false,
        cell: ({ row }) => {
          const progress = row.original.learning_progress_overview;
          if (!progress) {
            return <Badge variant="outline">0%</Badge>;
          }

          const { completed_lessons, total_lessons } = progress;
          const percentage = total_lessons > 0 ? Math.round((completed_lessons / total_lessons) * 100) : 0;

          let badgeVariant: 'default' | 'secondary' | 'outline' = 'outline';
          if (percentage === 100) {
            badgeVariant = 'default';
          } else if (percentage > 0) {
            badgeVariant = 'secondary';
          }

          return (
            <div className="flex items-center gap-2">
              <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
              </div>
              <Badge variant={badgeVariant}>{percentage}%</Badge>
            </div>
          );
        },
      },
    ],
    [t]
  );

  // Filter options
  const filterOptions: FilterOption[] = useMemo(
    () => [
      // {
      //   label: t('learner.username'),
      //   value: 'username',
      //   placeholder: t('learner.searchUsername'),
      //   type: 'search',
      //   id: 'username',
      // },
      {
        label: t('learner.email'),
        value: 'email',
        placeholder: t('learner.searchEmail'),
        type: 'search',
        id: 'email',
      },
    ],
    [t]
  );

  if (courseLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto h-full max-w-[900px] px-1 py-4">
      <div className="scrollbar flex h-full flex-col gap-4 overflow-auto bg-background p-4">
        <Table
          api={API_ENDPOINT.COURSES_ID_ENROLLMENTS}
          apiParams={{ id: course?.cuid }}
          columns={columns}
          hasNoColumn
          filterOptions={filterOptions}
          tableOptions={{ manualPagination: true }}
        />
      </div>
    </div>
  );
}
