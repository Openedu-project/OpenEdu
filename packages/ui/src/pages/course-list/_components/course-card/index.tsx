// 'use client';
import type { ICourse, ICourseResponse } from '@oe/api/types/course/course';
import type { KeyedMutator } from 'swr';

import { Card, CardContent } from '@oe/ui/shadcn/card';
import { cn } from '@oe/ui/utils/cn';
import type React from 'react';
import { CourseDetails } from './course-detail';
import { CourseHoverContent } from './course-hover-content';
import { CourseLinkWrapper } from './course-link-wrapper';
import { CourseThumbnail } from './course-thumbnail';

interface ICourseCard extends React.ComponentProps<typeof Card> {
  courseData: ICourse;
  mutate?: KeyedMutator<ICourseResponse | undefined>;
  showHover?: boolean;
  showPrice?: boolean;
  showThubnail?: boolean;
  showOwner?: boolean;
  contentClassName?: string;
}

export default function CourseCard({
  courseData,
  className,
  contentClassName = '',
  mutate,
  showHover = true,
  showPrice = true,
  showThubnail = true,
  showOwner = false,
  ...props
}: ICourseCard) {
  return (
    <div role="presentation" className={cn('group relative w-full', className)}>
      <CourseLinkWrapper slug={courseData?.slug} domain={courseData?.org?.domain}>
        <Card
          id={courseData?.id}
          className={cn(
            'mx-auto flex h-full min-h-[360px] w-full flex-col gap-3 rounded-m p-4 shadow-lg',
            contentClassName
          )}
          {...props}
        >
          {showThubnail && <CourseThumbnail courseData={courseData} />}
          <CardContent className="flex basis-full flex-col gap-3 p-0 text-foreground">
            <CourseDetails courseData={courseData} showPrice={showPrice} />
          </CardContent>
        </Card>
      </CourseLinkWrapper>

      {showHover && <CourseHoverContent courseData={courseData} mutate={mutate} />}
    </div>
  );
}
