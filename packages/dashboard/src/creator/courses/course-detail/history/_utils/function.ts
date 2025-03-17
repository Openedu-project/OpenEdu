import type { ICourse } from '@oe/api/types/course/course';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';

//Function get the newest published version
// If root === org => get root version
// If root !== org => get org version
export const getPublishedVersionFromCourseData = (courseData?: ICourse | null) => {
  if (!courseData?.published || courseData?.published.length === 0) {
    return 0;
  }

  return courseData.published.find(version => !version.is_root || version.is_root)?.version || -1;
};

export const getReviewingVersionFromCourseData = (course?: ICourse | null) => {
  return course?.org_request?.status === 'new' || course?.org_request?.status === 'pending'
    ? course?.org_request?.entity_version
    : undefined;
};

export const getPreviewUrl = (courseData?: ICourse | null) => {
  if (courseData?.id) {
    const publishData = courseData?.published?.find(p => p.status === 'publish');

    return publishData
      ? `https://${courseData?.org?.alt_domain || courseData?.org?.domain}${createAPIUrl({
          endpoint: PLATFORM_ROUTES.previewCourse,
          params: {
            courseId: courseData.id,
            orgId: courseData?.org?.id,
          },
        })}`
      : '';
  }
};
