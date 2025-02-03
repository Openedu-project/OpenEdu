'use client';
import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ISectionLearningProgress } from '@oe/api/types/course/learning-progress';
import type { IUser } from '@oe/api/types/user';
import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createCourseUrl } from '../../_utils/course-url';
import { useLessonLearningStore } from '../_store/learning-store';
import { getLessonGlobalIndex, getUidByLessonIndex } from '../_utils/utils';

interface AuthCheckProps {
  course: ICourseOutline;
  learning_data: ISectionLearningProgress[];
  me: IUser | null;
  lesson_uid: string;
}

export function AuthCheck({ course, learning_data, me, lesson_uid }: AuthCheckProps) {
  const router = useRouter();
  const currentRouter = typeof window !== 'undefined' ? window.location : '/';

  const { sectionsProgressData, setSectionsProgressData, getLessonStatus } = useLessonLearningStore();

  useEffect(() => {
    if (!me) {
      router.push(`${AUTH_ROUTES.login}?next=${currentRouter}`);
    } else if (!course?.is_enrolled) {
      router.push(createCourseUrl('detail', { slug: course?.slug }));
    }
  }, [course, me]);

  useEffect(() => {
    if (learning_data && course?.is_enrolled) {
      setSectionsProgressData(learning_data);
    }
  }, []);

  useEffect(() => {
    if (sectionsProgressData && course?.is_enrolled) {
      const currentLessonIndex = getLessonGlobalIndex(learning_data, lesson_uid);
      const lessonStatus = getLessonStatus(currentLessonIndex);

      const firstLesson = getUidByLessonIndex(sectionsProgressData, 0);

      if (!lessonStatus) {
        router.push(
          createCourseUrl('learning', {
            slug: course?.slug,
            section: firstLesson?.sectionUid as string,
            lesson: firstLesson?.lessonUid as string,
          })
        );
      }
    }
  }, [sectionsProgressData]);

  return null;
}
