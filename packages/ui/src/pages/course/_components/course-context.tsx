'use client';
import type { ICourseOutline } from '@oe/api/types/course/course';
import { createContext, useContext } from 'react';

interface CourseContextType {
  updateWishlistStatus: (bookmarkId?: string, isWishlist?: boolean) => void;
  courseData: ICourseOutline;
}

export const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
}
