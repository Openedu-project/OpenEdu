import { CREATOR_ROUTES } from '@oe/core';
import { buildUrl } from '@oe/core';

export type BuildOutlineRouteProps = {
  courseId?: string;
  sectionId?: string;
  lessonId?: string;
};

export const buildOutlineRoute = ({ courseId, sectionId, lessonId }: BuildOutlineRouteProps = {}) => {
  if (!(courseId || sectionId || lessonId)) {
    return null;
  }

  return buildUrl({
    endpoint: CREATOR_ROUTES.courseOutline,
    params: {
      ...(courseId && { courseId }),
      ...(sectionId && { sectionId }),
      ...(lessonId && { lessonId }),
    },
  });
};
