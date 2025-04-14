'use client';

import type { ICourse } from '@oe/api';
import { CourseCard } from '../../../components/course-card';

interface CourseGridProps {
  courses?: ICourse[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
      {courses?.map(course => (
        <CourseCard key={course.id} courseData={course} />
      ))}
    </div>
  );
}
