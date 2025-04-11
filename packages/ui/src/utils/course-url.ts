import { createAPIUrl } from '@oe/api';
import { PLATFORM_ROUTES } from '@oe/core';

export const createCourseUrl = (type: 'learning' | 'detail', params: Record<string, string>) => {
  const endpoint = type === 'learning' ? PLATFORM_ROUTES.courseLearning : PLATFORM_ROUTES.courseDetail;
  return createAPIUrl({ endpoint, params });
};
