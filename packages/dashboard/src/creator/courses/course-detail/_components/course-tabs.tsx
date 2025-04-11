import type { ISegment } from '@oe/api';
import { buildUrl } from '@oe/core';
import { Link, usePathname } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { COURSE_DETAIL_TABS } from '../_utils/constants';

export function CourseTabs({ segments }: { segments?: ISegment[] }) {
  const tCourse = useTranslations('course');
  const pathname = usePathname();
  const { courseId, sectionId, lessonId } = useParams<{
    courseId: string;
    sectionId: string;
    lessonId: string;
  }>();
  const minOrder = useMemo(() => Math.min(...(segments?.map(segment => segment.order) ?? [])), [segments]);
  const firstSection = useMemo(() => segments?.find(segment => segment.order === minOrder), [segments, minOrder]);
  const firstLesson = useMemo(
    () => firstSection?.lessons?.find(lesson => lesson.order === minOrder),
    [firstSection, minOrder]
  );

  return (
    <div className="scrollbar overflow-x-auto">
      <div className="flex min-w-max items-center gap-2 pb-2">
        {COURSE_DETAIL_TABS.map(tab => {
          const tabUrl = buildUrl({
            endpoint: tab.href,
            params: {
              courseId,
              sectionId: sectionId ?? firstSection?.id,
              lessonId: lessonId ?? firstLesson?.id,
            },
          });
          const isActive = pathname === tabUrl;

          return (
            <Link
              key={tab.id}
              href={tabUrl}
              variant="ghost"
              size="xs"
              className={cn(
                'relative gap-2',
                isActive &&
                  "after:-bottom-2 border border-primary text-primary after:absolute after:h-0.5 after:w-full after:bg-primary/80 after:content-[''] hover:bg-primary/20 hover:text-primary"
              )}
            >
              <tab.Icon className="h-4 w-4" color="var(--foreground)" />
              {tCourse(tab.label)}
              {tab.required && <span className="text-red-500">*</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
