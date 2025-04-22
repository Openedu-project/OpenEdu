import type { ILesson, ISection } from '@oe/api';
import type { ILearningProgress, ILessonLearningProgress, ILessonProgress, ISectionLearningProgress } from '@oe/api';
import type { IAnswerItemSet } from '@oe/api';
import type { TAnswerInput } from '../_components/lesson-content/_types/types';

export const transformAnswers = (input: TAnswerInput): IAnswerItemSet[][] => {
  const { answers } = input;

  if (typeof answers === 'string') {
    // single_choice
    return [[{ id: answers }]];
  }

  // multiple_choice
  if (Array.isArray(answers)) {
    return [
      answers.map(id => {
        return { id };
      }),
    ];
  }

  throw new Error('Invalid answer format');
};

export const sortByOrder = (a: { order: number }, b: { order: number }) => a.order - b.order;

export const sortSectionsAndLessons = (outline: ISection[]): ISection[] =>
  // Sort outline by order
  outline
    .sort(sortByOrder)
    .map(item => {
      if (item.lessons && Array.isArray(item.lessons)) {
        // Sort lesson by order
        item.lessons = item.lessons.sort(sortByOrder);
      }
      return item;
    });

export const getUidByLessonIndex = (sections: ISection[], lessonIndex: number) => {
  let currentIndex = -1;
  const sortedSection = sortSectionsAndLessons(sections);

  for (const section of sortedSection) {
    const lessons = section.lessons ?? [];
    if (lessons?.length === 0) {
      continue;
    }

    for (const lesson of lessons) {
      currentIndex++;
      if (currentIndex === lessonIndex) {
        return {
          lessonUid: lesson.uid,
          sectionUid: section.uid,
        };
      }
    }
  }

  return null;
};

export const getTotalLessons = (sections: ISection[] | ISectionLearningProgress[]): number => {
  return sections?.reduce((total, section) => total + (section?.lessons?.length ?? 0), 0);
};

export const getLessonGlobalIndex = (
  sections: ISection[] | ISectionLearningProgress[],
  targetLessonUid: string
): number => {
  const sortedSection = sortSectionsAndLessons(sections);
  let globalIndex = -1;
  let foundIndex = -1;

  // Assumes sections and lessons are already sorted by order
  for (const section of sortedSection) {
    const lessons = section.lessons ?? [];
    if (lessons.length === 0) {
      continue;
    }

    for (const lesson of lessons) {
      globalIndex++;
      if (lesson.uid === targetLessonUid) {
        foundIndex = globalIndex;
        break;
      }
    }
    if (foundIndex !== -1) {
      break;
    }
  }

  return foundIndex;
};

export const mergeSectionWithProgress = (
  unsortedSections: ISection[],
  learningProgress?: ILearningProgress
): ISectionLearningProgress[] => {
  // Sort sections and lessons first
  const sections = sortSectionsAndLessons(unsortedSections);
  const sectionByUid = learningProgress?.section_by_uid;
  
  // Flatten all lessons first to track global completion status
  const allLessons: Array<{
    lesson: ILesson;
    progress?: ILessonProgress;
    sectionIndex: number;
    lessonIndex: number;
  }> = [];

  // First pass: collect all lessons and their progress
  sections.forEach((section, sectionIndex) => {
    const sectionProgress = sectionByUid?.[section.uid];

    section.lessons?.forEach((lesson, lessonIndex) => {
      allLessons.push({
        lesson,
        progress: sectionProgress?.lesson_by_uid?.[lesson.uid],
        sectionIndex,
        lessonIndex,
      });
    });
  });

  // Second pass: process sections with correct availability checks
  const processedSections = sections.map((section, sectionIndex) => {
    const sectionProgress = sectionByUid?.[section.uid];

    // Early return if no lessons
    if (section.lessons?.length === 0) {
      return {
        ...section,
        total_lesson: sectionProgress?.total_lesson ?? 0,
        completed_lesson: sectionProgress?.completed_lesson ?? 0,
        complete_at: sectionProgress?.complete_at ?? 0,
        lessons: [],
      } as ISectionLearningProgress;
    }

    // Process lessons with global completion check
    const processedLessons = section.lessons?.map((lesson, lessonIndex) => {
      const currentLessonIndex = getLessonGlobalIndex(sections, lesson.uid);

      // Check if all previous lessons are completed
      const allPreviousCompleted =
        currentLessonIndex === 0 ||
        allLessons.slice(0, currentLessonIndex).every(item => item?.progress?.complete_at);

      const progress = sectionProgress?.lesson_by_uid?.[lesson.uid];

      // Determine lesson availability
      const available =
        currentLessonIndex === 0 || // first lesson in the course
        lesson.free || // free lesson
        allPreviousCompleted || // all previous lessons completed
        progress?.complete_at; // current lesson already completed

      // Convert lesson_content_by_uid to lesson_contents array for backward compatibility
      const lessonContents = progress?.lesson_content_by_uid ? Object.values(progress.lesson_content_by_uid) : [];

      return {
        ...lesson,
        total_lesson_content: progress?.total_lesson_content ?? 0,
        completed_lesson_content: progress?.completed_lesson_content ?? 0,
        complete_at: progress?.complete_at ?? 0,
        completed_percent: progress?.completed_percent ?? 0,
        lesson_contents: lessonContents,
        available,
        sectionIndex,
        lessonIndex,
      } as ILessonLearningProgress & {
        sectionIndex: number;
        lessonIndex: number;
      };
    });

    return {
      ...section,
      total_lesson: sectionProgress?.total_lesson ?? 0,
      completed_lesson: sectionProgress?.completed_lesson ?? 0,
      complete_at: sectionProgress?.complete_at ?? 0,
      lessons: processedLessons,
    } as unknown as ISectionLearningProgress;
  });

  return processedSections;
};
