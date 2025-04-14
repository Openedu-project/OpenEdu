import type { ICourse } from '@oe/api';
import type { ISegment } from '@oe/api';
import type { TFunction } from '@oe/i18n';

interface CourseValidationState {
  informationErrors: string[];
  outlineErrors: string[];
  priceErrors: string[];
}

export const validateCourse = ({
  course,
  segments,
  tCourse,
}: {
  course?: ICourse | null;
  segments?: ISegment[] | null;
  tCourse: TFunction;
}): CourseValidationState => {
  const informationErrors: string[] = [];
  const outlineErrors: string[] = [];
  const priceErrors: string[] = [];

  // Validate Information tab
  if (!course?.name) {
    informationErrors.push(
      tCourse('validation.required', { field: tCourse('information.sections.description.title') })
    );
  }
  if (!course?.description) {
    informationErrors.push(
      tCourse('validation.required', { field: tCourse('information.sections.description.subtitle') })
    );
  }
  if (!course?.thumbnail?.id) {
    informationErrors.push(tCourse('validation.genThumbnail'));
  }
  // if (course?.categories?.length === 0) {
  //   informationErrors.push(tCourse('validation.categoryMin', { min: '1' }));
  // }
  // if (course?.levels?.length === 0) {
  //   informationErrors.push(tCourse('validation.levelMin', { min: '1' }));
  // }

  // Validate Outline tab
  if (course?.active_section && course?.active_lesson) {
    const activeSections = segments?.filter(segment => segment.status === 'publish' && !segment.parent_id);

    if ((activeSections?.length ?? 0) > 0) {
      const hasActiveLessonInActiveSection = activeSections?.some(section =>
        section.lessons?.some(lesson => lesson.status === 'publish')
      );

      if (!hasActiveLessonInActiveSection) {
        outlineErrors.push(tCourse('validation.lessonRequired'));
      }
    } else {
      outlineErrors.push(tCourse('validation.sectionRequired'));
    }
  } else {
    outlineErrors.push(tCourse('validation.sectionOrLessonRequired'));
  }

  // Validate Price tab
  if (!course?.price_settings) {
    priceErrors.push(tCourse('validation.required', { field: tCourse('price.title') }));
  }

  if (course?.published?.[0]?.mark_as_completed && course?.mark_as_completed) {
    informationErrors.push(tCourse('validation.courseIsCompleted'));
  }

  return {
    informationErrors,
    outlineErrors,
    priceErrors,
  };
};

export const isCourseValid = ({
  course,
  segments,
  tCourse,
}: {
  course?: ICourse | null;
  segments?: ISegment[] | null;
  tCourse: TFunction;
}) => {
  const validationState = validateCourse({ course, segments, tCourse });
  return (
    validationState.informationErrors.length === 0 &&
    validationState.outlineErrors.length === 0 &&
    validationState.priceErrors.length === 0
  );
};
