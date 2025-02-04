import type { ICourseOutline, ICourseResponse } from '@oe/api/types/course/course';
import type { TMyCourseStatus } from '@oe/api/types/my-learning-space';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { Card, CardContent } from '@oe/ui/shadcn/card';
import { cn } from '@oe/ui/utils/cn';
import type React from 'react';
import type { KeyedMutator } from 'swr';
import { CourseDetails } from './course-detail';
import CourseRender from './course-render';
import { CourseThumbnail } from './course-thumbnail';

interface ICourseCard extends React.ComponentProps<typeof Card> {
  courseData: ICourseOutline;
  mutate?: KeyedMutator<ICourseResponse | undefined>;
  showThubnail?: boolean;
  showOwner?: boolean;
  contentClassName?: string;
  courseStatus: TMyCourseStatus;
}

export default function CourseCard({
  courseData,
  className,
  contentClassName = '',
  mutate,
  showThubnail = true,
  showOwner = false,
  courseStatus,
  ...props
}: ICourseCard) {
  const basePath = process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME;
  const isExternal = courseData?.org?.domain !== basePath;

  return (
    <div className={cn('group relative w-full', className)}>
      <Link
        href={PLATFORM_ROUTES.courseDetail.replace(':slug', courseData?.slug)}
        external={isExternal}
        target={isExternal ? '_blank' : undefined}
        className="h-full w-full p-0 hover:no-underline"
      >
        <Card
          id={courseData?.id}
          className={cn(
            'mx-auto flex h-full min-h-[280px] w-full flex-col gap-3 rounded-m border-[3px] border-white p-2 shadow-md hover:border-primary',
            contentClassName
          )}
          {...props}
        >
          {showThubnail && <CourseThumbnail courseData={courseData} />}
          <CardContent className="flex basis-full flex-col gap-3 p-0 text-foreground">
            <CourseDetails courseData={courseData} />
            <CourseRender courseData={courseData} courseStatus={courseStatus} />
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
