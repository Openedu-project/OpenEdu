'use client';
import type { ICourseOutline } from '@oe/api';
import type { IUserProfile } from '@oe/api';
import { createContext, useContext } from 'react';

interface CourseContextType {
  updateWishlistStatus: (bookmarkId?: string, isWishlist?: boolean) => void;
  courseData: ICourseOutline;
  creatorData?: IUserProfile | null;
}

export const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
}
