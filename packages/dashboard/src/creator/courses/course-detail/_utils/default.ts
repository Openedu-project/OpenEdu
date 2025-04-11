import type { ILesson, ILessonContent, ISection } from '@oe/api';

export const createDefaultLesson = (courseId: string, lesson?: Partial<ILesson>) => {
  const lessonOrder = lesson?.order || 0;
  return {
    ...lesson,
    course_id: courseId as string,
    title: lesson?.title || `Lesson ${lessonOrder}`,
    note: lesson?.note || '',
    order: lessonOrder,
    free: lesson?.free,
    parent_id: lesson?.parent_id || '',
    status: lesson?.status || 'draft',
  };
};

export const createDefaultSection = (courseId: string, section?: Partial<ISection>) => {
  const sectionOrder = section?.order || 0;
  return {
    ...section,
    course_id: courseId as string,
    title: section?.title || `Section ${sectionOrder}`,
    note: section?.note || '',
    order: sectionOrder,
    free: section?.free,
    status: section?.status || 'draft',
  };
};

export const createDefaultLessonContent = ({
  courseId,
  sectionId,
  lessonId,
  content,
}: {
  courseId: string;
  sectionId: string;
  lessonId: string;
  content?: Partial<ILessonContent>;
}) => {
  const contentOrder = content?.order || 0;
  return {
    ...content,
    course_id: courseId,
    section_id: sectionId,
    lesson_id: lessonId,
    content: content?.content || '',
    status: content?.status || 'draft',
    title: content?.title || `Content ${contentOrder}`,
    note: content?.note || '',
    free: content?.free ?? false,
    order: contentOrder,
    type: content?.type || 'video',
    duration: content?.duration || 0,
  };
};
