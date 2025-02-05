import type { IQuizItemResponse } from '@oe/api/types/course/quiz';
import type { IQuizSubmissionResponse } from '@oe/api/types/quiz';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from '#common/navigation';
import { toast } from '#shadcn/sonner';
import { createCourseUrl } from '#utils/course-url';
import { useLessonLearningStore } from '../../../_store/learning-store';
import { getLessonGlobalIndex, getTotalLessons, getUidByLessonIndex } from '../../../_utils/utils';

const VIDEO_CONSTANTS = {
  PROGRESS_CHECKPOINT: 10,
  MAX_PERCENTAGE: 100,
} as const;

export const usePlayerProgress = (
  onComplete?: (duration: number, currentTime: number, quizId?: string) => void,
  options?: {
    quizzes?: IQuizItemResponse[];
    onlyVideoContent?: boolean;
    quizResult?: IQuizSubmissionResponse;
    onTimeUpdate?: (time: number, duration: number) => void;
  }
) => {
  const tPlayerToast = useTranslations('learningPage.player.toast');

  const { slug, lesson } = useParams();
  const router = useRouter();

  const [lastCompletedPercentage, setLastCompletedPercentage] = useState<number>(0);
  const [timestamp, setTimestamp] = useState({
    seconds: 0,
    duration: 0,
  });
  const [count, setCount] = useState<number>(5);
  const [showCountdown, setShowCountdown] = useState<boolean>(false);

  const { sectionsProgressData, getLessonStatus } = useLessonLearningStore();
  const currentLessonIndex = getLessonGlobalIndex(sectionsProgressData, lesson as string);
  const totalItems = getTotalLessons(sectionsProgressData);

  const checkNextLesson = getLessonStatus(currentLessonIndex + 1);

  const handleNavigateLesson = () => {
    let newIndex = currentLessonIndex;

    newIndex = currentLessonIndex < totalItems ? currentLessonIndex + 1 : 0;

    const lessonInfo = getUidByLessonIndex(sectionsProgressData, newIndex);

    const learningPageUrl =
      lessonInfo &&
      createCourseUrl('learning', {
        slug: slug as string,
        section: lessonInfo?.sectionUid,
        lesson: lessonInfo?.lessonUid,
      });

    return learningPageUrl && router.push(learningPageUrl);
  };

  const handleShowToast = () => {
    setShowCountdown(true);
    setCount(5);

    const promise = new Promise(resolve => {
      let currentCount = 5;

      const interval = setInterval(() => {
        currentCount -= 1;

        if (currentCount > 0) {
          // Update toast message
          toast.loading(tPlayerToast('loading', { seconds: currentCount }), {
            id: 'next-lesson-countdown',
          });
        } else {
          clearInterval(interval);
          handleNavigateLesson();
          resolve(true);
        }
      }, 1000);
    });

    toast.promise(promise, {
      loading: tPlayerToast('loading', { seconds: 5 }),
      success: () => {
        setShowCountdown(false);
        return tPlayerToast('success');
      },
      id: 'next-lesson-countdown',
    });
  };

  useEffect(() => {
    if (showCountdown && count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showCountdown, count]);

  const checkProgress = useCallback(
    (currentTime: number, duration: number) => {
      // Update timestamp
      setTimestamp({ seconds: currentTime, duration });
      options?.onTimeUpdate?.(currentTime, duration);

      const percentage = (currentTime / duration) * 100;
      const roundedPercentage =
        Math.floor(percentage / VIDEO_CONSTANTS.PROGRESS_CHECKPOINT) * VIDEO_CONSTANTS.PROGRESS_CHECKPOINT;

      if (
        roundedPercentage >= VIDEO_CONSTANTS.PROGRESS_CHECKPOINT &&
        roundedPercentage <= VIDEO_CONSTANTS.MAX_PERCENTAGE &&
        roundedPercentage > lastCompletedPercentage
      ) {
        if (Array.isArray(options?.quizzes) && options.quizzes.length > 0) {
          onComplete?.(duration, currentTime, options.quizzes[0]?.id);
        } else {
          onComplete?.(duration, currentTime);
        }

        setLastCompletedPercentage(roundedPercentage);

        if (
          options?.onlyVideoContent &&
          checkNextLesson &&
          roundedPercentage === VIDEO_CONSTANTS.MAX_PERCENTAGE &&
          Boolean(options?.quizzes) === Boolean(options?.quizResult)
        ) {
          handleShowToast();
        }

        return roundedPercentage;
      }
      return null;
    },
    [lastCompletedPercentage, onComplete, options]
  );

  return {
    lastCompletedPercentage,
    checkProgress,
    timestamp,
  };
};
