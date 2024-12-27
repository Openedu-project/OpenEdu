'use client';

import { useGetMe } from '@oe/api/hooks/useMe';
import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ILesson } from '@oe/api/types/course/segment';
import { useEffect } from 'react';
import { useRouter } from '#common/navigation';
import { ScrollArea } from '#shadcn/scroll-area';
import { createCourseUrl } from '../../_utils/course-url';
import ContentSection from './content-section';
import CourseOutline from './course-sidebar-section';

export default function CourseLearning({
  course,
  section,
  lesson,
}: {
  course: ICourseOutline;
  section: string;
  lesson?: ILesson | null;
}) {
  // const currentRouter = typeof window !== 'undefined' ? window.location : '/';
  const router = useRouter();
  const { dataMe } = useGetMe();

  useEffect(() => {
    if (!dataMe) {
      //   router.push(`${AUTH_ROUTES.login}?next=${currentRouter}`);
      console.log('hehehehe');
    } else if (!course?.is_enrolled) {
      router.push(createCourseUrl('detail', { slug: course?.slug }));
    }
  }, [course, dataMe]);

  return (
    <div className="grid h-[calc(100vh-var(--header-height))] grid-cols-3 px-3 py-4">
      <ContentSection courseData={course} lesson={lesson} className="col-span-2" />
      <ScrollArea>
        <CourseOutline
          courseData={course}
          activeSection={section}
          activeLesson={lesson?.uid}
          className="col-span-1 px-3"
        />
      </ScrollArea>
    </div>
  );
}
