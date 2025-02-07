'use client';

import type { ICourse, ICourseResponse } from '@oe/api/types/course/course';
import type { KeyedMutator } from 'swr';
import { CourseCard } from '../../../components/course-card';

interface CourseGridProps {
  courses?: ICourse[];
  mutate: KeyedMutator<ICourseResponse | undefined>;
}

export default function CourseGrid({ courses, mutate }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
      {courses?.map(course => (
        <CourseCard key={course.id} courseData={course} mutate={mutate} />
      ))}
    </div>
  );
}
