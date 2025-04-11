import type { ISectionLearningProgress } from '@oe/api';
import type { IQuizSubmissionResponse } from '@oe/api';
import { createStore } from '@oe/core';

interface LessonLearningState {
  sectionsProgressData: ISectionLearningProgress[];
  setSectionsProgressData: (sectionsProgressData: ISectionLearningProgress[]) => void;
  getLessonStatus: (lessonIndex: number) => boolean | undefined;
  isAllLessonsCompleted: () => boolean;
  isLessonCompleted: (lessonUid: string) => boolean;
  isSectionCompleted: (sectionUid: string) => boolean;

  isNavigating: boolean;
  setIsNavigatingLesson: (isNavigating: boolean) => void;
}

export const useLessonLearningStore = createStore<LessonLearningState>((set, get) => {
  return {
    sectionsProgressData: [],
    isNavigating: false,
    setSectionsProgressData(sectionsProgressData) {
      set({ sectionsProgressData });
    },

    getLessonStatus(lessonIndex) {
      const { sectionsProgressData } = get();
      let totalLessons = 0;

      for (const section of sectionsProgressData) {
        if (section.lessons) {
          if (lessonIndex < totalLessons + section.lessons.length) {
            const lessonIndexInSection = lessonIndex - totalLessons;

            return section.lessons[lessonIndexInSection]?.available;
          }
          totalLessons += section.lessons.length;
        }
      }
    },

    isAllLessonsCompleted() {
      const { sectionsProgressData } = get();

      const check = sectionsProgressData.every(
        section => section.total_lesson > 0 && section.completed_lesson / section.total_lesson === 1
      );

      return check;
    },

    isLessonCompleted(lesson_uid: string) {
      const { sectionsProgressData } = get();

      for (const section of sectionsProgressData) {
        const lesson = section.lessons.find(lesson => lesson.uid === lesson_uid);

        if (lesson) {
          return lesson.complete_at !== 0;
        }
      }
      return false;
    },

    isSectionCompleted(sectionUid: string) {
      const { sectionsProgressData } = get();

      const section = sectionsProgressData.find(section => section.uid === sectionUid);
      const check = section ? section.total_lesson > 0 && section.completed_lesson / section.total_lesson === 1 : false;

      return check;
    },

    setIsNavigatingLesson(isNavigating) {
      set({ isNavigating });
    },
  };
});

type QuizSubmissionStore = {
  quizResult?: IQuizSubmissionResponse;
  setQuizResult: (quizResult?: IQuizSubmissionResponse) => void;
};

export const useQuizSubmissionStore = createStore<QuizSubmissionStore>(set => {
  return {
    quizResult: undefined,
    setQuizResult(quizResult) {
      set({ quizResult });
    },
  };
});
