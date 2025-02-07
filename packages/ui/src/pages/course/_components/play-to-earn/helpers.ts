import type { IStartWhen } from '@oe/api/types/course/course-trigger';
import type { ISectionProgress } from '@oe/api/types/course/learning-progress';
import type { ISection } from '@oe/api/types/course/segment';

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

  const findSectionContainingLesson = (sections: ISection[], lessonId: string) =>
    sections.find(section => section.lessons?.some(lesson => lesson.uid === lessonId));

  const findLesson = (sections: ISection[], lessonId: string) => {
    const section = findSectionContainingLesson(sections, lessonId);

    if (!section) {
      return null;
    }
    return section?.lessons?.find(lesson => lesson.uid === lessonId);
  };

  if (type === 'completed_lesson') {
    const lesson = findLesson(outline, entity_id);

    return {
      type: 'lesson',
      title: lesson?.title || 'Unknown Lesson',
    };
  }

  if (type === 'completed_section') {
    const section = outline.find(section => section.uid === entity_id);

    return {
      type: 'section',
      title: section?.title || 'Unknown Section',
    };
  }

  return {
    type: 'unknown',
    title: 'Unknown',
  };
};
