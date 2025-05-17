import { PLATFORM_ROUTES, buildUrl } from '@oe/core';

export const createCourseUrl = (type: 'learning' | 'detail', params: Record<string, string>) => {
  const endpoint = type === 'learning' ? PLATFORM_ROUTES.courseLearning : PLATFORM_ROUTES.courseDetail;
  return buildUrl({ endpoint, params });
};
