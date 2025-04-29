import type { ICourseOutline, ILesson, ISection, ISectionByUid } from '@oe/api';
import type { IStartWhen } from '@oe/api';

export const cleanUrl = (url: string): string => url?.replaceAll(/^["\\]+|["\\]+$/g, '');

/**
 * Check whether the lesson has begun or not
 */
export const isLessonStarted = (course: ICourseOutline, sectionByUid: ISectionByUid, entityId: string): boolean => {
  // Early return if the user has not registered the course
  if (!course?.is_enrolled) {
    return false;
  }

  const courseOutline = course?.outline || [];
  const sortedSections = [...courseOutline].sort((a, b) => a.order - b.order);

  const targetSection = sortedSections.find(section => {
    const sectionProgress = sectionByUid[section.uid];
    const lessonByUid = sectionProgress?.lesson_by_uid;
    const lessonsOutline = section.lessons;

    if (!(lessonByUid && lessonsOutline)) {
      return false;
    }

    const sortedLessons = [...lessonsOutline].sort((a, b) => a.order - b.order);
    const lessonIndex = sortedLessons.findIndex(lesson => lesson?.uid === entityId);

    if (lessonIndex === -1) {
      return false;
    }

    // Check all the previous lessons has been completed
    return sortedLessons.slice(0, lessonIndex).every(prevLesson => {
      const prevLessonProgress = lessonByUid?.[prevLesson.uid];
      return prevLessonProgress && prevLessonProgress.complete_at > 0;
    });
  });

  return !!targetSection;
};

/**
 * Check to see if the lesson is completed or not
 */
export const isLessonCompleted = (sectionByUid: ISectionByUid, entityId: string): boolean => {
  return Object.values(sectionByUid).some(section => {
    const lessonProgress = section?.lesson_by_uid?.[entityId];
    return lessonProgress?.complete_at;
  });
};

/**
 * Check to see if the section is completed or not
 */
export const isSectionCompleted = (sections: ISectionByUid, entityId: string): boolean => {
  const section = sections?.[entityId];
  return !!section && section.completed_lesson === section.total_lesson;
};

/**
 * Get Form information based on startWhen and outline
 */
export const getFormInfo = (startWhen: IStartWhen, outline: ISection[]) => {
  const { type, entity_id } = startWhen;

  const getSectionInfo = (section: ISection | undefined, index: number) => ({
    title: section?.title || 'Unknown Section',
    index: index >= 0 ? index + 1 : undefined,
  });

  const getLessonInfo = (lesson: ILesson | undefined, index: number) => ({
    title: lesson?.title || 'Unknown Lesson',
    index: index >= 0 ? index + 1 : undefined,
  });

  const sortedOutline = [...outline].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Handle lesson types
  if (type === 'completed_lesson' || type === 'started_lesson') {
    const result = sortedOutline
      .map((section, sectionIndex) => {
        if (!section?.lessons) {
          return null;
        }

        const sortedLessons = [...section.lessons].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        const lessonIndex = sortedLessons.findIndex(l => l.uid === entity_id);

        if (lessonIndex === -1) {
          return null;
        }

        return {
          type: 'lesson',
          state: type === 'completed_lesson' ? 'completed' : 'started',
          lesson: getLessonInfo(sortedLessons[lessonIndex], lessonIndex),
          section: getSectionInfo(section, sectionIndex),
        };
      })
      .find(result => result !== null);

    if (result) {
      return result;
    }

    // Return default if no lesson found
    return {
      type: 'lesson',
      lesson: getLessonInfo(undefined, -1),
      section: getSectionInfo(undefined, -1),
    };
  }

  // Handle section type
  if (type === 'completed_section') {
    const sectionIndex = sortedOutline.findIndex(s => s.uid === entity_id);

    return {
      type: 'section',
      section: getSectionInfo(sortedOutline[sectionIndex], sectionIndex),
    };
  }

  // Default unknown type
  return {
    type: 'unknown',
    title: 'Unknown',
  };
};
