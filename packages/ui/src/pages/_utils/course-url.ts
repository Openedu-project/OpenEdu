import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';

export const createCourseUrl = (type: 'learning' | 'detail', params: Record<string, string>) => {
  const endpoint = type === 'learning' ? PLATFORM_ROUTES.courseLearning : PLATFORM_ROUTES.courseDetail;
  return createAPIUrl({ endpoint, params });
};
