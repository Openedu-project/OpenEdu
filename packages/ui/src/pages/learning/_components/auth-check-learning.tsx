'use client';

import { useGetMe } from '@oe/api/hooks/useMe';
import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ISectionLearningProgress } from '@oe/api/types/course/learning-progress';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createCourseUrl } from '../../_utils/course-url';
import { useLessonLearningStore } from '../_store/learning-store';

interface AuthCheckProps {
  course: ICourseOutline;
  learning_data: ISectionLearningProgress[];
}

export function AuthCheck({ course, learning_data }: AuthCheckProps) {
  const router = useRouter();
  const { dataMe } = useGetMe();

  const { setSectionsProgressData } = useLessonLearningStore();

  useEffect(() => {
    if (!dataMe) {
      console.log('hehehehe');
    } else if (!course?.is_enrolled) {
      router.push(createCourseUrl('detail', { slug: course?.slug }));
    }
  }, [course, dataMe]);

  useEffect(() => {
    if (learning_data) {
      setSectionsProgressData(learning_data);
    }
  }, []);

  return null;
}
