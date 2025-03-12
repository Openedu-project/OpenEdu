'use client';

import type { ICourse, ICourseResponse } from '@oe/api/types/course/course';
import type { IFeaturedContent } from '@oe/api/types/featured-contents';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Card, CardContent } from '@oe/ui/shadcn/card';
import { cn } from '@oe/ui/utils/cn';
import type React from 'react';
import { useEffect, useState } from 'react';
import type { KeyedMutator } from 'swr';
import { Link } from '#common/navigation';
import { CourseDetails } from './course-detail';
import { CourseHoverContent } from './course-hover-content';
import { CourseThumbnail } from './course-thumbnail';

interface ICourseCard extends React.ComponentProps<typeof Card> {
  courseData: ICourse;
  mutate?: KeyedMutator<ICourseResponse | undefined> | KeyedMutator<IFeaturedContent<ICourse>[]>;
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
  const { org } = courseData;
  const [isExternal, setIsExternal] = useState(false);
  const [href, setHref] = useState('');

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' && typeof window !== 'undefined' && location.origin) {
      const isExternalLink = !!((org?.alt_domain || org?.domain) !== new URL(location.origin).host);
      setIsExternal(isExternalLink);
    }
    setHref(
      process.env.NODE_ENV !== 'development' && typeof window !== 'undefined' && (org?.alt_domain || org?.domain)
        ? `https://${org.alt_domain || org.domain}${PLATFORM_ROUTES.courseDetail.replace(':slug', courseData?.slug)}`
        : PLATFORM_ROUTES.courseDetail.replace(':slug', courseData?.slug)
    );
  }, [org, courseData?.slug]);

  return (
    <div className={cn('group relative w-full', className)}>
      <Link
        href={href}
        external={isExternal}
        target={isExternal ? '_blank' : undefined}
        className="h-full w-full p-0 hover:no-underline"
      >
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
      </Link>

      {showHover && <CourseHoverContent courseData={courseData} mutate={mutate} href={href} isExternal={isExternal} />}
    </div>
  );
}
