'use client';
import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ISectionLearningProgress } from '@oe/api/types/course/learning-progress';
import type { IUser } from '@oe/api/types/user';
import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createCourseUrl } from '../../_utils/course-url';
import { useLessonLearningStore } from '../_store/learning-store';

interface AuthCheckProps {
  course: ICourseOutline;
  learning_data: ISectionLearningProgress[];
  me: IUser | null;
}

export function AuthCheck({ course, learning_data, me }: AuthCheckProps) {
  const router = useRouter();
  const currentRouter = typeof window !== 'undefined' ? window.location : '/';

  const { setSectionsProgressData } = useLessonLearningStore();

  useEffect(() => {
    if (!me) {
      router.push(`${AUTH_ROUTES.login}?next=${currentRouter}`);
    } else if (!course?.is_enrolled) {
      router.push(createCourseUrl('detail', { slug: course?.slug }));
    }
  }, [course, me]);

  useEffect(() => {
    if (learning_data) {
      setSectionsProgressData(learning_data);
    }
  }, []);

  return null;
}
