'use client';
import {
  type ICreateLessonPayload,
  createSegmentService,
  deleteLessonContentService,
  deleteSegmentService,
  updateSegmentService,
} from '@oe/api';
import { useGetCourseById } from '@oe/api';
import type { TLessonContent } from '@oe/api';
import type { ILesson, ILessonContent, ISegment } from '@oe/api';
import type { IQuizItemResponse } from '@oe/api';
import { toast } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useOutlineStore } from '../_store/useOutlineStore';
import { buildOutlineRoute } from '../_utils/build-outline-route';
import { createDefaultLesson, createDefaultLessonContent } from '../_utils/default';
import {
  DEFAULT_QUIZ_SETTINGS,
  DEFAULT_QUIZ_TRIGGER_CONDITIONS,
  createQuizWithDefaultValues,
} from '../outline/lessons/quiz-editor/utils';
import { useGetSection } from './useGetSection';

export function useLessonActions() {
  const tCourse = useTranslations('course');
  const router = useRouter();
  const { activeLessonContent, accordionStates, setActiveLessonContent, setAccordionValues } = useOutlineStore();

  const {
    activeLesson,
    activeSection,
    courseId,
    sectionId,
    lessonId,
    activeLessons,
    activeLessonContents,
    mutateSections,
    mutateSection,
  } = useGetSection();

  const { mutateCourse } = useGetCourseById(courseId);

  const handleAddLesson = async () => {
    if (!activeSection) {
      return;
    }
    try {
      const maxOrder = Math.max(...(activeSection.lessons?.map(lesson => lesson.order) ?? []));
      const newLessonTitle = `Lesson ${maxOrder + 1}`;

      const newLesson = await createSegmentService(
        undefined,
        createDefaultLesson(courseId, {
          order: maxOrder + 1,
          title: newLessonTitle,
          parent_id: activeSection.id,
        }) as ICreateLessonPayload
      );
      await updateSegmentService(undefined, {
        ...newLesson,
        contents: [
          createDefaultLessonContent({
            courseId,
            sectionId: activeSection?.id ?? '',
            lessonId: newLesson?.id ?? '',
          }),
        ],
      });
      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      const outlineRoute = buildOutlineRoute({
        courseId,
        sectionId: sectionId,
        lessonId: newLesson.id,
      });
      if (outlineRoute) {
        router.push(outlineRoute);
      }
      toast.success(tCourse('common.toast.createSuccess', { item: tCourse('outline.lesson.title') }));
    } catch {
      toast.error(tCourse('common.toast.createError', { item: tCourse('outline.lesson.title') }));
    }
  };

  const handleUpdateLesson = async (data: ISegment, showToast = true) => {
    try {
      await updateSegmentService(undefined, {
        ...data,
        status: data.status === 'draft' ? 'publish' : data.status === 'preview' ? 'publish' : data.status,
      });
      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      if (showToast) {
        toast.success(tCourse('common.toast.updateSuccess', { item: tCourse('outline.lesson.title') }));
      }
    } catch {
      toast.error(tCourse('common.toast.updateError', { item: tCourse('outline.lesson.title') }));
    }
  };

  const handleSortLessons = async (lessons: ILesson[]) => {
    if (!activeSection) {
      return;
    }

    try {
      await updateSegmentService(undefined, {
        ...activeSection,
        lessons: lessons.map((lesson, index) => ({
          ...lesson,
          order: index,
        })),
      });
      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
    } catch {
      toast.error(tCourse('common.toast.sortError', { item: tCourse('outline.lesson.title') }));
    }
  };

  const handleDeleteLesson = async () => {
    if (!(activeSection && activeLesson?.id)) {
      return;
    }
    const activeLessonIndex = activeLessons?.findIndex(lesson => lesson.id === activeLesson.id) ?? -1;

    const previousLesson = activeLessonIndex > 0 ? activeLessons?.[activeLessonIndex - 1] : activeLessons?.[0];

    try {
      await deleteSegmentService(undefined, activeLesson?.id);
      await updateSegmentService(undefined, {
        ...activeSection,
        lessons: activeLessons
          .filter(lesson => lesson.id !== activeLesson.id)
          .map((lesson, index) => ({
            ...lesson,
            order: index,
          })),
      } as ISegment);
      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      const outlineRoute = buildOutlineRoute({
        courseId,
        sectionId: sectionId,
        lessonId: previousLesson?.id,
      });
      if (outlineRoute) {
        router.push(outlineRoute);
      }
      toast.success(tCourse('common.toast.deleteSuccess', { item: tCourse('outline.lesson.title') }));
    } catch {
      toast.error(tCourse('common.toast.deleteError', { item: tCourse('outline.lesson.title') }));
    }
  };

  const handleSortContents = async (contents: ILessonContent[]) => {
    try {
      await updateSegmentService(undefined, {
        ...activeLesson,
        contents: contents.map((content, index) => ({
          ...content,
          order: index,
        })),
      } as ISegment);
      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
    } catch {
      toast.error(tCourse('common.toast.sortError', { item: tCourse('outline.lesson.contentTitle') }));
    }
  };

  const handleAddLessonContent = async () => {
    try {
      const order = activeLessonContents.length;
      const newLesson = await updateSegmentService(undefined, {
        ...activeLesson,
        contents: [
          ...activeLessonContents,
          createDefaultLessonContent({
            courseId,
            sectionId: activeSection?.id ?? '',
            lessonId: activeLesson?.id ?? '',
            content: {
              order,
            },
          }),
        ],
      } as ISegment);
      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      const newActiveLessonContent = newLesson.contents?.find(content => content.order === order) ?? null;
      setActiveLessonContent(newActiveLessonContent ?? null);
    } catch {
      toast.error(tCourse('common.toast.createError', { item: tCourse('outline.lesson.contentTitle') }));
    }
  };

  const handleLessonContentTypeChange = async (currentType?: TLessonContent, type?: TLessonContent) => {
    if (!activeLessonContent) {
      return;
    }
    try {
      const newType = currentType ?? type;
      const newLesson = await updateSegmentService(undefined, {
        ...activeLesson,
        contents: activeLesson?.contents?.map(content => {
          if (content.id === activeLessonContent.id) {
            return {
              ...content,
              type: newType,
              content: '',
              quizzes: newType === 'quiz' ? [createQuizWithDefaultValues(undefined, lessonId)] : undefined,
              files: [],
            };
          }
          return content;
        }),
      } as ISegment);
      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      const newActiveLessonContent =
        newLesson.contents?.find(content => content.order === activeLessonContent?.order) ?? null;
      setActiveLessonContent(newActiveLessonContent ?? null);
    } catch {
      toast.error(tCourse('common.toast.updateError', { item: tCourse('outline.lesson.contentTitle') }));
    }
  };

  const handleRemoveLessonContent = async () => {
    if (!activeLessonContent?.id) {
      return;
    }
    try {
      await deleteLessonContentService(undefined, activeLessonContent.id);
      const updatedLesson = await updateSegmentService(undefined, {
        ...activeLesson,
        contents: activeLesson?.contents
          ?.filter(content => content.id !== activeLessonContent.id)
          .map((content, index) => ({
            ...content,
            order: index,
          })),
      } as ISegment);
      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      const previousActiveLessonContent =
        activeLesson?.contents?.findIndex(content => content.id === activeLessonContent.id) ?? -1;

      const newActiveLessonContent =
        previousActiveLessonContent > 0
          ? activeLesson?.contents?.[previousActiveLessonContent - 1]
          : updatedLesson?.contents?.[0];

      setActiveLessonContent(newActiveLessonContent ?? null);
    } catch {
      toast.error(tCourse('common.toast.deleteError', { item: tCourse('outline.lesson.contentTitle') }));
    }
  };

  const handleDuplicateLesson = async () => {
    if (!(activeLesson && activeSection && activeLessons)) {
      return;
    }
    try {
      const newLesson = await createSegmentService(undefined, {
        ...activeLesson,
        id: undefined,
        title: `${activeLesson.title} (${tCourse('common.copy')})`,
        parent_id: activeSection.id,
        contents: undefined,
      });

      await updateSegmentService(undefined, {
        ...newLesson,
        contents: activeLesson.contents?.map(content => ({
          ...content,
          id: undefined,
          lesson_id: newLesson.id,
          section_id: activeSection.id,
        })),
      });

      const lessonIndex = activeLessons.findIndex(lesson => lesson.id === activeLesson.id);
      const updatedLessons = [...activeLessons] as ILesson[];
      updatedLessons.splice(lessonIndex + 1, 0, newLesson);

      await updateSegmentService(undefined, {
        ...activeSection,
        lessons: updatedLessons.map((lesson, index) => ({
          ...lesson,
          order: index,
        })),
      } as ISegment);

      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      const outlineRoute = buildOutlineRoute({
        courseId,
        sectionId: activeSection.id,
        lessonId: newLesson.id,
      });
      if (outlineRoute) {
        router.push(outlineRoute);
      }

      toast.success(tCourse('common.toast.duplicateSuccess', { item: tCourse('outline.lesson.title') }));
    } catch {
      toast.error(tCourse('common.toast.duplicateError', { item: tCourse('outline.lesson.title') }));
    }
  };

  const handleDuplicateLessonContent = async () => {
    if (!(activeLessonContent && activeLesson)) {
      return;
    }
    try {
      const contentIndex = activeLessonContents.findIndex(content => content.id === activeLessonContent.id);

      const newContent = {
        ...activeLessonContent,
        id: undefined,
        title: `${activeLessonContent.title} (${tCourse('common.copy')})`,
        lesson_id: activeLesson.id,
        section_id: activeSection?.id,
      };

      const updatedContents = [...activeLessonContents];
      updatedContents.splice(contentIndex + 1, 0, newContent);

      const updatedLesson = await updateSegmentService(undefined, {
        ...activeLesson,
        contents: updatedContents.map((content, index) => ({
          ...content,
          order: index,
        })),
      } as ISegment);

      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      setActiveLessonContent(updatedLesson.contents?.[contentIndex + 1] ?? null);

      toast.success(tCourse('common.toast.duplicateSuccess', { item: tCourse('outline.lesson.contentTitle') }));
    } catch {
      toast.error(tCourse('common.toast.duplicateError', { item: tCourse('outline.lesson.contentTitle') }));
    }
  };

  const handleAddQuiz = async (currentQuizzes?: IQuizItemResponse[]) => {
    if (!activeLessonContent) {
      return;
    }
    try {
      const type = activeLessonContent.type;
      const newQuiz = createQuizWithDefaultValues(
        {
          relation_type: type === 'quiz' ? 'is' : 'triggered_by',
          settings: {
            ...DEFAULT_QUIZ_SETTINGS,
          },
          questions: [],
          trigger_conditions: {
            ...DEFAULT_QUIZ_TRIGGER_CONDITIONS,
            ...((type === 'video' || type === 'embedded') && {
              is_triggered_by_timestamp: true,
              timestamp: '00:00:00',
            }),
            ...(type === 'pdf' && {
              is_trigger_by_reach_page_number: true,
              page_number: 1,
            }),
            ...(type === 'text' && {
              show_at_percentage: 100,
            }),
          },
        },
        lessonId
      );

      const updatedLesson = await updateSegmentService(undefined, {
        ...activeLesson,
        contents: activeLesson?.contents?.map(content => ({
          ...content,
          quizzes:
            content.id === activeLessonContent.id
              ? [...(currentQuizzes ?? content.quizzes ?? []), newQuiz]
              : content.quizzes,
        })),
      } as ISegment);

      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      const updatedContent = updatedLesson.contents?.find(content => content.id === activeLessonContent.id);

      if (activeLessonContent.id) {
        setAccordionValues(activeLessonContent.id, updatedContent?.quizzes?.map(quiz => quiz.id) ?? []);
      }

      return updatedLesson;
    } catch {
      toast.error(tCourse('common.toast.updateError', { item: tCourse('outline.lesson.contentTitle') }));
      return null;
    }
  };

  const handleDeleteQuiz = async (quizId: string, currentQuizzes?: IQuizItemResponse[]) => {
    if (!activeLessonContent) {
      return;
    }
    try {
      const updatedLesson = await updateSegmentService(undefined, {
        ...activeLesson,
        contents: activeLesson?.contents?.map(content => ({
          ...content,
          quizzes:
            content.id === activeLessonContent.id
              ? [...(currentQuizzes ?? content.quizzes ?? []).filter(quiz => quiz.id !== quizId)]
              : content.quizzes,
        })),
      } as ISegment);

      await Promise.all([mutateSection(), mutateSections(), mutateCourse()]);
      setAccordionValues(
        activeLessonContent.id ?? '',
        accordionStates[activeLessonContent.id ?? '']?.filter(id => id !== quizId) ?? []
      );

      return updatedLesson;
    } catch {
      toast.error(tCourse('common.toast.deleteError', { item: tCourse('outline.lesson.contentTitle') }));
      return null;
    }
  };

  return {
    courseId,
    sectionId,
    lessonId,
    activeSection,
    activeLesson,
    activeLessons,
    activeLessonContents,
    handleUpdateLesson,
    handleAddLesson,
    handleSortLessons,
    handleDeleteLesson,
    handleSortContents,
    handleAddLessonContent,
    handleLessonContentTypeChange,
    handleRemoveLessonContent,
    handleDuplicateLesson,
    handleDuplicateLessonContent,
    handleAddQuiz,
    handleDeleteQuiz,
  };
}
