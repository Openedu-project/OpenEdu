import type { IContentLearningProgress, ISection } from '@oe/api';
import type { ILearningProgress, ILessonLearningProgress, ISectionLearningProgress } from '@oe/api';
import type { IAnswerItemSet } from '@oe/api';
import type { TAnswerInput } from '../_components/lesson-content/_types/types';
import type { ILessonLearningProgressByUid, IMergedLearningProgress, ISectionLearningProgressByUid } from '../_type';

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

export const getUidByLessonIndex = (
  data: ISection[] | ISectionLearningProgress[] | IMergedLearningProgress | null,
  lessonIndex: number
) => {
  if (!data) {
    return null;
  }

  if ('all_lessons' in data) {
    const mergedProgress = data as IMergedLearningProgress;

    if (mergedProgress.all_lessons && lessonIndex >= 0 && lessonIndex < mergedProgress.all_lessons.length) {
      const lesson = mergedProgress.all_lessons[lessonIndex];

      if (lesson?.uid && mergedProgress.lesson_by_uid && mergedProgress.lesson_by_uid[lesson.uid]) {
        const lessonData = mergedProgress.lesson_by_uid[lesson.uid] as {
          section_uid: string;
          global_index: number;
        } & ILessonLearningProgress;

        return {
          lessonUid: lesson.uid,
          sectionUid: lessonData.section_uid,
        };
      }
    }

    return null;
  }

  let currentIndex = -1;

  let sections: (ISection | ISectionLearningProgress)[] = [];

  if (Array.isArray(data)) {
    sections = sortSectionsAndLessons(data);
  } else if (data && typeof data === 'object' && 'sections' in data) {
    sections = (data as IMergedLearningProgress)?.sections as (ISection | ISectionLearningProgress)[];
  }

  if (!sections || sections.length === 0) {
    return null;
  }

  for (const section of sections) {
    if (!section) {
      continue;
    }

    const lessons = section.lessons ?? [];
    if (!lessons || lessons.length === 0) {
      continue;
    }

    for (const lesson of lessons) {
      if (!lesson) {
        continue;
      }

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

export const getTotalLessons = (
  data: ISection[] | ISectionLearningProgress[] | IMergedLearningProgress | null
): number => {
  if (data && 'total_lessons' in data) {
    return (data as IMergedLearningProgress).total_lessons;
  }

  return Array.isArray(data) ? data?.reduce((total, section) => total + (section?.lessons?.length ?? 0), 0) : 0;
};

export const getLessonGlobalIndex = (
  data: ISection[] | ISectionLearningProgress[] | IMergedLearningProgress | null,
  targetLessonUid: string
): number => {
  if (!data) {
    return -1;
  }

  if (data && 'lesson_by_uid' in data) {
    const mergedProgress = data as IMergedLearningProgress;
    const lesson = mergedProgress.lesson_by_uid[targetLessonUid];

    return lesson ? lesson.global_index : -1;
  }

  const sections = Array.isArray(data) ? sortSectionsAndLessons(data) : (data as IMergedLearningProgress).sections;
  let globalIndex = -1;
  let foundIndex = -1;

  // Assumes sections and lessons are already sorted by order
  for (const section of sections) {
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

export const getLessonByIndex = (
  data: ISection[] | ISectionLearningProgress[] | IMergedLearningProgress,
  globalIndex: number
): ILessonLearningProgress | undefined => {
  if (!data) {
    return undefined;
  }

  if (data && 'all_lessons' in data) {
    const mergedProgress = data as IMergedLearningProgress;

    if (globalIndex < 0 || globalIndex >= mergedProgress.all_lessons.length) {
      return undefined;
    }

    return mergedProgress.all_lessons[globalIndex];
  }

  const sections = Array.isArray(data) ? sortSectionsAndLessons(data) : (data as IMergedLearningProgress).sections;
  let currentIndex = -1;

  for (const section of sections) {
    const lessons = section.lessons ?? [];
    if (lessons.length === 0) {
      continue;
    }

    for (const lesson of lessons) {
      currentIndex++;
      if (currentIndex === globalIndex) {
        return lesson as ILessonLearningProgress;
      }
    }
  }

  return undefined;
};

export const mergeSectionWithProgress = (
  unsortedSections: ISection[],
  learningProgress?: ILearningProgress
): IMergedLearningProgress => {
  // Sort sections and lessons first
  const sections = sortSectionsAndLessons(unsortedSections);
  const sectionByUid = learningProgress?.section_by_uid || {};

  // Initialize các đối tượng kết quả
  const sectionLearningProgressByUid: ISectionLearningProgressByUid = {};
  const allLessonLearningProgress: ILessonLearningProgress[] = [];
  const lessonByUid: {
    [lesson_uid: string]: ILessonLearningProgress & {
      section_uid: string;
      global_index: number;
    };
  } = {};

  let totalCompletedLessons = 0;
  let globalLessonIndex = 0;

  // Xử lý từng section
  const processedSections = sections.map((section, sectionIndex) => {
    const sectionProgress = sectionByUid[section.uid];
    const lessonLearningProgressByUid: ILessonLearningProgressByUid = {};

    // Early return if no lessons
    if (!section.lessons || section.lessons.length === 0) {
      const processedSection = {
        ...section,
        total_lesson: sectionProgress?.total_lesson ?? 0,
        completed_lesson: sectionProgress?.completed_lesson ?? 0,
        complete_at: sectionProgress?.complete_at ?? 0,
        lessons: [],
      } as ISectionLearningProgress;

      // Lưu kết quả vào map
      sectionLearningProgressByUid[section.uid] = {
        ...processedSection,
        lesson_by_uid: {},
      };

      return processedSection;
    }

    // Process lessons
    const processedLessons = section.lessons.map((lesson, lessonIndex) => {
      const progress = sectionProgress?.lesson_by_uid?.[lesson.uid];
      const currentLessonIndex = globalLessonIndex;
      globalLessonIndex++;

      // Kiểm tra nếu tất cả bài học trước đó đã hoàn thành
      let allPreviousCompleted = true;
      if (currentLessonIndex > 0) {
        for (let i = 0; i < currentLessonIndex; i++) {
          const prevLesson = allLessonLearningProgress[i];
          if (!prevLesson?.complete_at) {
            allPreviousCompleted = false;
            break;
          }
        }
      }

      // Convert lesson_content_by_uid to lesson_contents array for backward compatibility
      const lessonContents = progress?.lesson_content_by_uid ? Object.values(progress.lesson_content_by_uid) : [];

      const available =
        currentLessonIndex === 0 || // first lesson in the course
        lesson.free || // free lesson
        allPreviousCompleted || // all previous lessons completed
        !!progress?.complete_at; // current lesson already completed

      // Xử lý contents - chuyển đổi từ ILessonContent[] sang IContentLearningProgress[] nếu cần
      const convertedContents = lesson.contents?.map(content => {
        // Chuyển đổi ILessonContent thành IContentLearningProgress
        return {
          ...content,
          lesson_content_uid: content.uid, // Sử dụng uid của content làm lesson_content_uid
          complete_at: 0,
          pause_at: 0,
          start_at: 0,
          duration: 0,
          text_percent: 0,
          video_percent: 0,
          pdf_current_page: 0,
        } as IContentLearningProgress;
      });

      const processedLesson: ILessonLearningProgress = {
        ...lesson,
        contents: convertedContents, // Gán contents đã được chuyển đổi
        total_lesson_content: progress?.total_lesson_content ?? 0,
        completed_lesson_content: progress?.completed_lesson_content ?? 0,
        complete_at: progress?.complete_at ?? 0,
        completed_percent: progress?.completed_percent ?? 0,
        lesson_contents: lessonContents,
        lesson_content_by_uid: progress?.lesson_content_by_uid ?? {}, // Thêm trường này để tránh lỗi
        available,
        section_index: sectionIndex,
        lesson_index: lessonIndex,
      };

      // Thêm vào các arrays và maps
      allLessonLearningProgress.push(processedLesson);
      lessonByUid[lesson.uid] = {
        ...processedLesson,
        section_uid: section.uid,
        global_index: currentLessonIndex,
      };
      lessonLearningProgressByUid[lesson.uid] = processedLesson;

      // Tính số bài học đã hoàn thành
      if (processedLesson.complete_at) {
        totalCompletedLessons++;
      }

      return processedLesson;
    });

    const processedSection = {
      ...section,
      total_lesson: sectionProgress?.total_lesson ?? processedLessons.length,
      completed_lesson: sectionProgress?.completed_lesson ?? processedLessons.filter(l => l.complete_at).length,
      complete_at: sectionProgress?.complete_at ?? 0,
      lessons: processedLessons,
    } as ISectionLearningProgress;

    // Lưu kết quả vào map
    sectionLearningProgressByUid[section.uid] = {
      ...processedSection,
      lesson_by_uid: lessonLearningProgressByUid,
    };

    return processedSection;
  });

  return {
    sections: processedSections,
    section_by_uid: sectionLearningProgressByUid,
    all_lessons: allLessonLearningProgress,
    lesson_by_uid: lessonByUid,
    total_lessons: globalLessonIndex,
    completed_lessons: totalCompletedLessons,
  };
};
