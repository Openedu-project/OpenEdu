'use client';
import type { ICourseOutline } from '@oe/api';
import type { IUser } from '@oe/api';
import { AUTH_ROUTES } from '@oe/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { usePathname } from '#common/navigation';
import { createCourseUrl } from '#utils/course-url';
import { useCurrentLesson } from '../_context';
import { useProgress } from '../_context/progress-context';
import { getUidByLessonIndex } from '../_utils';

interface AuthCheckProps {
  course: ICourseOutline;
  me: IUser | null;
}

export function AuthCheck({ course, me }: AuthCheckProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextPath = useMemo(() => {
    return searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname;
  }, [pathname, searchParams]);

  const {
    state: { mergedProgress },
  } = useProgress();
  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    if (!me) {
      router.push(`${AUTH_ROUTES.login}?next=${encodeURIComponent(nextPath)}`);
    } else if (!course?.is_enrolled) {
      router.push(createCourseUrl('detail', { slug: course?.slug }));
    }
  }, [course, me, nextPath, router]);

  useEffect(() => {
    if (!(mergedProgress && course?.is_enrolled && currentLesson)) {
      return;
    }

    const lesson = mergedProgress.lesson_by_uid[currentLesson];
    const lessonAvailable = lesson?.available ?? false;

    if (!lessonAvailable) {
      const firstLesson = getUidByLessonIndex(mergedProgress, 0);
      if (firstLesson) {
        router.push(
          createCourseUrl('learning', {
            slug: course?.slug,
            section: firstLesson.sectionUid as string,
            lesson: firstLesson.lessonUid as string,
          })
        );
      }
    }
  }, [mergedProgress, course?.is_enrolled, currentLesson, router, course?.slug]);

  return null;
}
