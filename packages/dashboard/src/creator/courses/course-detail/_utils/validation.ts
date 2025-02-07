import type { ICourse } from '@oe/api/types/course/course';
import type { ISegment } from '@oe/api/types/course/segment';

export const isCourseInformationTabValid = (course?: ICourse) => {
  return (
    course?.description &&
    course?.thumbnail?.id &&
    (course?.categories?.length ?? 0) > 0 &&
    (course?.levels?.length ?? 0) > 0
  );
};

export const isCourseOutlineTabValid = (segments?: ISegment[]) => {
  const lessons = segments?.flatMap(segment => segment.lessons ?? []);
  const contents = lessons?.flatMap(lesson => lesson.contents ?? []);

  return (segments?.length ?? 0) > 0 && (lessons?.length ?? 0) > 0 && (contents?.length ?? 0) > 0;
};
