'use client';

import { getLearningProgressesService, updateLearningProgressService } from '@oe/api/services/learning-progress';
import type { TLessonContent } from '@oe/api/types/course/basic';
import type { ISectionLearningProgress } from '@oe/api/types/course/learning-progress';
import type { IQuizSubmissionResponse } from '@oe/api/types/quiz';
import { type ReactNode, createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { toast } from 'sonner';
import { checkCompleteAt, isLessonContentComplete } from '../_utils/learning-progress';
import { mergeSectionWithProgress } from '../_utils/utils';
import { useCourse } from './learning-context';

type ProgressState = {
  sectionsProgressData: ISectionLearningProgress[];
  isNavigating: boolean;
};

type ProgressAction =
  | { type: 'SET_PROGRESS_DATA'; payload: ISectionLearningProgress[] }
  | { type: 'SET_IS_NAVIGATING'; payload: boolean }
  | {
      type: 'UPDATE_LESSON_STATUS';
      payload: { lessonId: string; status: string; progress: number };
    };

type ProgressContextType = {
  state: ProgressState;
  getLessonStatus: (lessonIndex: number) => boolean | undefined;
  isAllLessonsCompleted: () => boolean;
  isLessonCompleted: (lessonUid: string) => boolean;
  isSectionCompleted: (sectionUid: string) => boolean;
  setSectionsProgressData: (data: ISectionLearningProgress[]) => void;
  setIsNavigatingLesson: (isNavigating: boolean) => void;
  updateLessonStatus: (lessonId: string, status: string, progress: number) => void;
  completeContent: (params: {
    lesson_content_uid: string;
    type: TLessonContent;
    section_uid: string;
    lesson_uid: string;
    videoDuration?: number;
    pauseAt?: number;
    quizId?: string;
    quizResult?: IQuizSubmissionResponse;
  }) => Promise<void>;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const progressReducer = (state: ProgressState, action: ProgressAction): ProgressState => {
  switch (action.type) {
    case 'SET_PROGRESS_DATA':
      return {
        ...state,
        sectionsProgressData: action.payload,
      };
    case 'SET_IS_NAVIGATING':
      return {
        ...state,
        isNavigating: action.payload,
      };
    case 'UPDATE_LESSON_STATUS': {
      const { lessonId, progress } = action.payload;

      const updatedSections = JSON.parse(JSON.stringify(state.sectionsProgressData)) as ISectionLearningProgress[];

      // Find and update lesson status
      for (const section of updatedSections) {
        if (!section.lessons) {
          continue;
        }

        const lessonIndex = section.lessons.findIndex(l => l.uid === lessonId);
        if (lessonIndex >= 0 && section.lessons[lessonIndex]) {
          section.lessons[lessonIndex].completed_percent = progress;
          break;
        }
      }

      return {
        ...state,
        sectionsProgressData: updatedSections,
      };
    }
    default:
      return state;
  }
};

export function ProgressProvider({
  children,
  initialProgressData,
}: {
  children: ReactNode;
  initialProgressData?: ISectionLearningProgress[];
}) {
  const [state, dispatch] = useReducer(progressReducer, {
    sectionsProgressData: initialProgressData || [],
    isNavigating: false,
  });

  const { course } = useCourse();

  // Take a lesson based on index
  const getLessonStatus = useCallback(
    (lessonIndex: number): boolean | undefined => {
      const { sectionsProgressData } = state;
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

      return undefined;
    },
    [state.sectionsProgressData]
  );

  // Check all the completed lessons yet
  const isAllLessonsCompleted = useCallback((): boolean => {
    const { sectionsProgressData } = state;

    return sectionsProgressData.every(
      section => section.total_lesson > 0 && section.completed_lesson / section.total_lesson === 1
    );
  }, [state.sectionsProgressData]);

  
  const isLessonCompleted = useCallback((lesson_uid: string) => {
    const { sectionsProgressData } = state;

    for (const section of sectionsProgressData) {
      const lesson = section.lessons.find(lesson => lesson.uid === lesson_uid);

      if (lesson) {
        return lesson.complete_at !== 0;
      }
    }
    return false;
  }, [state])

  // Check a completed section yet
  const isSectionCompleted = useCallback(
    (sectionUid: string): boolean => {
      const { sectionsProgressData } = state;

      const section = sectionsProgressData.find(section => section.uid === sectionUid);
      return section ? section.total_lesson > 0 && section.completed_lesson / section.total_lesson === 1 : false;
    },
    [state]
  );

  // Update sectionsProgressData
  const setSectionsProgressData = useCallback((data: ISectionLearningProgress[]) => {
    dispatch({ type: 'SET_PROGRESS_DATA', payload: data });
  }, []);

  // Update the status is changing lessons
  const setIsNavigatingLesson = useCallback((isNavigating: boolean) => {
    dispatch({ type: 'SET_IS_NAVIGATING', payload: isNavigating });
  }, []);

  // Update lesson status
  const updateLessonStatus = useCallback((lessonId: string, status: string, progress: number) => {
    dispatch({
      type: 'UPDATE_LESSON_STATUS',
      payload: { lessonId, status, progress },
    });
  }, []);

  const completeContent = useCallback(
    async (params: {
      lesson_content_uid: string;
      type: TLessonContent;
      section_uid: string;
      lesson_uid: string;
      videoDuration?: number;
      pauseAt?: number;
      quizId?: string;
      quizResult?: IQuizSubmissionResponse;
    }) => {
      const {
        lesson_content_uid,
        type,
        section_uid,
        lesson_uid,
        videoDuration = 0,
        pauseAt = 0,
        quizId,
        quizResult,
      } = params;

      // Kiểm tra đầu vào
      if (!(section_uid && lesson_uid && lesson_content_uid && course)) {
        return;
      }

      const start_at = Date.now();
      const pause_at = Math.floor(pauseAt);

      // Tính complete_at dựa trên logic gốc
      const complete_at = checkCompleteAt({
        type,
        videoDuration,
        pauseAt: pause_at,
        quizId,
        quizResult,
      });

      // Kiểm tra xem content đã hoàn thành chưa
      const hasUpdated = isLessonContentComplete({
        outline: state.sectionsProgressData,
        section_uid,
        lesson_uid,
        lesson_content_uid,
        pause_at,
      });

      // Nếu chưa hoàn thành và có thông tin đầy đủ, gửi API request
      if (!hasUpdated) {
        const payload = {
          complete_at,
          section_uid,
          lesson_uid,
          lesson_content_uid,
          course_slug: course.slug,
          pause_at,
          start_at,
        };

        try {
          // Gọi API cập nhật tiến độ
          await updateLearningProgressService(undefined, { payload });

          // Lấy dữ liệu tiến độ mới
          const newLearningProgres = await getLearningProgressesService(undefined, { id: course.slug });

          // Cập nhật state với dữ liệu mới
          if (newLearningProgres?.sections) {
            const data = mergeSectionWithProgress(course.outline, newLearningProgres.sections);
            setSectionsProgressData(data);
          }

          // Hiển thị thông báo nếu hoàn thành
          if (complete_at > 0) {
            toast.success('Content completed');
          }
        } catch (error) {
          console.error('Error completing content:', error);
        }
      }
    },
    [course, state.sectionsProgressData, setSectionsProgressData]
  );

  const value = useMemo(
    () => ({
      state,
      getLessonStatus,
      isAllLessonsCompleted,
      isLessonCompleted,
      isSectionCompleted,
      setSectionsProgressData,
      setIsNavigatingLesson,
      updateLessonStatus,
      completeContent,
    }),
    [
      state,
      getLessonStatus,
      isAllLessonsCompleted,
      isLessonCompleted,
      isSectionCompleted,
      setSectionsProgressData,
      setIsNavigatingLesson,
      updateLessonStatus,
      completeContent,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  return context;
}
