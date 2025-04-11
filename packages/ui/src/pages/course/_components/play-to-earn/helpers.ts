import type { ILesson, ISection } from '@oe/api';
import type { IStartWhen } from '@oe/api';
import type { ISectionProgress } from '@oe/api';

export const cleanUrl = (url: string): string => url?.replaceAll(/^["\\]+|["\\]+$/g, '');

export const isLessonCompleted = (sections: ISectionProgress[], entityId: string): boolean => {
  for (const section of sections) {
    const lesson = section.lessons.find(lesson => lesson.lesson_uid === entityId);

    if (lesson) {
      return lesson.complete_at !== 0;
    }
  }
  return false;
};

export const isSectionCompleted = (sections: ISectionProgress[], entityId: string): boolean => {
  const section = sections.find(section => section.section_uid === entityId);

  return section ? section.completed_lesson === section.total_lesson : false;
};

export const getFormInfo = (startWhen: IStartWhen, outline: ISection[]) => {
  const { type, entity_id } = startWhen;

  const sortedOutline = [...outline].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Get section info
  const getSectionInfo = (section: ISection | undefined, index: number) => ({
    title: section?.title || 'Unknown Section',
    index: index >= 0 ? index + 1 : undefined,
  });

  // Get lesson info
  const getLessonInfo = (lesson: ILesson | undefined, index: number) => ({
    title: lesson?.title || 'Unknown Lesson',
    index: index >= 0 ? index + 1 : undefined,
  });

  if (type === 'completed_lesson') {
    const defaultInfo = {
      lessonInfo: getLessonInfo(undefined, -1),
      sectionInfo: getSectionInfo(undefined, -1),
    };

    for (let sectionIndex = 0; sectionIndex < sortedOutline.length; sectionIndex++) {
      const section = sortedOutline[sectionIndex];
      if (!section?.lessons) {
        continue;
      }

      const sortedLessons = [...section.lessons].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const lessonIndex = sortedLessons.findIndex(l => l.uid === entity_id);

      if (lessonIndex !== -1) {
        return {
          type: 'lesson',
          lesson: getLessonInfo(sortedLessons[lessonIndex], lessonIndex),
          section: getSectionInfo(section, sectionIndex),
        };
      }
    }

    return {
      type: 'lesson',
      ...defaultInfo,
    };
  }

  if (type === 'completed_section') {
    const sectionIndex = sortedOutline.findIndex(s => s.uid === entity_id);
    return {
      type: 'section',
      section: getSectionInfo(sortedOutline[sectionIndex], sectionIndex),
    };
  }

  return {
    type: 'unknown',
    title: 'Unknown',
  };
};
