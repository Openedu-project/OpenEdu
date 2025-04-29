'use client';

import { updateLearningProgressService } from '@oe/api';
import type { TLessonContent } from '@oe/api';
import type { IQuizSubmissionResponse } from '@oe/api';
import { type ReactNode, createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { toast } from 'sonner';
import type { IMergedLearningProgress } from '../_type';
import { checkCompleteAt, isLessonContentComplete } from '../_utils/learning-progress';
import { getLessonByIndex, mergeSectionWithProgress } from '../_utils/utils';
import { useCourse } from './course-context';

type ProgressState = {
  mergedProgress: IMergedLearningProgress | null;
  isNavigating: boolean;
};

type ProgressAction =
  | { type: 'SET_PROGRESS_DATA'; payload: IMergedLearningProgress }
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
  setMergedProgress: (data: IMergedLearningProgress) => void;
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
        mergedProgress: action.payload,
      };
    case 'SET_IS_NAVIGATING':
      return {
        ...state,
        isNavigating: action.payload,
      };
    case 'UPDATE_LESSON_STATUS': {
      const { lessonId, progress } = action.payload;

      if (!state.mergedProgress) {
        return state;
      }

      // Tạo bản sao sâu của mergedProgress
      const updatedMergedProgress = JSON.parse(JSON.stringify(state.mergedProgress)) as IMergedLearningProgress;

      // Cập nhật completed_percent cho lesson trong cả section và lesson_by_uid
      const lesson = updatedMergedProgress.lesson_by_uid[lessonId];
      if (lesson) {
        lesson.completed_percent = progress;

        // Cũng cập nhật trong mảng sections để đảm bảo tính nhất quán
        const sectionUid = lesson.section_uid;
        const sectionIndex = updatedMergedProgress.sections.findIndex(s => s.uid === sectionUid);

        if (sectionIndex >= 0 && updatedMergedProgress.sections[sectionIndex]?.lessons) {
          const lessonIndex = updatedMergedProgress.sections[sectionIndex].lessons.findIndex(l => l.uid === lessonId);
          if (lessonIndex >= 0 && updatedMergedProgress.sections[sectionIndex]?.lessons?.[lessonIndex]) {
            updatedMergedProgress.sections[sectionIndex].lessons[lessonIndex].completed_percent = progress;
          }
        }
      }

      return {
        ...state,
        mergedProgress: updatedMergedProgress,
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
  initialProgressData?: IMergedLearningProgress;
}) {
  const [state, dispatch] = useReducer(progressReducer, {
    mergedProgress: initialProgressData || null,
    isNavigating: false,
  });

  const { course } = useCourse();

  // Lấy trạng thái bài học dựa trên index
  const getLessonStatus = useCallback(
    (lessonIndex: number): boolean | undefined => {
      const { mergedProgress } = state;
      if (!mergedProgress) {
        return undefined;
      }

      // Sử dụng helper function để lấy bài học theo index
      const lesson = getLessonByIndex(mergedProgress, lessonIndex);
      return lesson?.available;
    },
    [state]
  );

  // Kiểm tra tất cả bài học đã hoàn thành chưa
  const isAllLessonsCompleted = useCallback((): boolean => {
    const { mergedProgress } = state;
    if (!mergedProgress) {
      return false;
    }

    // Kiểm tra xem tất cả section đã hoàn thành chưa
    return mergedProgress.sections.every(
      section => section.total_lesson > 0 && section.completed_lesson / section.total_lesson === 1
    );
  }, [state]);

  // Kiểm tra một bài học đã hoàn thành chưa
  const isLessonCompleted = useCallback(
    (lessonUid: string) => {
      const { mergedProgress } = state;
      if (!mergedProgress) {
        return false;
      }

      // Truy cập trực tiếp vào lesson thông qua key
      const lesson = mergedProgress.lesson_by_uid[lessonUid];
      return !!lesson?.complete_at;
    },
    [state]
  );

  // Kiểm tra một section đã hoàn thành chưa
  const isSectionCompleted = useCallback(
    (sectionUid: string): boolean => {
      const { mergedProgress } = state;
      if (!mergedProgress) {
        return false;
      }

      // Truy cập trực tiếp vào section thông qua key
      const section = mergedProgress.section_by_uid[sectionUid];
      return section ? section.total_lesson > 0 && section.completed_lesson / section.total_lesson === 1 : false;
    },
    [state]
  );

  // Cập nhật mergedProgress
  const setMergedProgress = useCallback((data: IMergedLearningProgress) => {
    dispatch({ type: 'SET_PROGRESS_DATA', payload: data });
  }, []);

  // Cập nhật trạng thái đang chuyển bài học
  const setIsNavigatingLesson = useCallback((isNavigating: boolean) => {
    dispatch({ type: 'SET_IS_NAVIGATING', payload: isNavigating });
  }, []);

  // Cập nhật trạng thái bài học
  const updateLessonStatus = useCallback((lessonId: string, status: string, progress: number) => {
    dispatch({
      type: 'UPDATE_LESSON_STATUS',
      payload: { lessonId, status, progress },
    });
  }, []);

  // Hoàn thành nội dung bài học
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
      const { mergedProgress } = state;
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

      const pauseAtData =
        mergedProgress?.section_by_uid[section_uid]?.lesson_by_uid[lesson_uid]?.lesson_content_by_uid?.[
          lesson_content_uid
        ]?.pause_at;

      const start_at = Date.now();
      // Nếu giá trị pauseAtData lấy từ API > giá trị pauseAt hiện tại của video, lấy pauseAtData
      const pause_at = pauseAtData && pauseAtData > Math.floor(pauseAt) ? pauseAtData : Math.floor(pauseAt);

      // Tính complete_at dựa trên logic gốc
      const complete_at = checkCompleteAt({
        type,
        videoDuration,
        pauseAt: pause_at,
        quizId,
        quizResult,
      });

      // Kiểm tra xem content đã hoàn thành chưa
      const sectionsData = state.mergedProgress?.sections || [];
      const hasUpdated = isLessonContentComplete({
        outline: sectionsData,
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
          const res = await updateLearningProgressService(undefined, {
            payload,
          });

          // Cập nhật state với dữ liệu mới
          if (res && course.outline) {
            const mergedData = mergeSectionWithProgress(course.outline, res);
            setMergedProgress(mergedData);
          }

          // Hiển thị thông báo nếu hoàn thành
          const currentContentState =
            res?.section_by_uid?.[section_uid]?.lesson_by_uid?.[lesson_uid]?.lesson_content_by_uid?.[lesson_content_uid]
              ?.complete_at;

          if (currentContentState && currentContentState > 0) {
            toast.success('Content completed');
          }
        } catch (error) {
          console.error('Error completing content:', error);
        }
      }
    },
    [course, state.mergedProgress, setMergedProgress]
  );

  const value = useMemo(
    () => ({
      state,
      getLessonStatus,
      isAllLessonsCompleted,
      isLessonCompleted,
      isSectionCompleted,
      setMergedProgress,
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
      setMergedProgress,
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
