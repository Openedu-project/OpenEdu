import type { ICourseOutline } from '@oe/api/types/course/course';
import { type ReactNode, createContext, useContext, useMemo } from 'react';

type CourseContextType = {
  course: ICourseOutline | null;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({
  children,
  course,
}: {
  children: ReactNode;
  course: ICourseOutline | null;
}) {
  const value = useMemo(() => ({ course }), [course]);

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}
