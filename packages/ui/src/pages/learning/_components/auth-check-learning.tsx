'use client';

import { useGetMe } from '@oe/api/hooks/useMe';
import type { ICourseOutline } from '@oe/api/types/course/course';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createCourseUrl } from '../../_utils/course-url';

interface AuthCheckProps {
  course: ICourseOutline;
}

export function AuthCheck({ course }: AuthCheckProps) {
  const router = useRouter();
  const { dataMe } = useGetMe();

  useEffect(() => {
    if (!dataMe) {
      console.log('hehehehe');
    } else if (!course?.is_enrolled) {
      router.push(createCourseUrl('detail', { slug: course?.slug }));
    }
  }, [course, dataMe]);

  return null;
}
