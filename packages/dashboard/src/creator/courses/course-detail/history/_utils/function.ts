import type { ICourse } from '@oe/api';

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
