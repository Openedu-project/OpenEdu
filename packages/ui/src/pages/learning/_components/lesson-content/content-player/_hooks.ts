import type { IQuizItemResponse } from '@oe/api/types/course/quiz';
import type { IQuizSubmissionResponse } from '@oe/api/types/quiz';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from '#common/navigation';
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
  const currentLessonRef = useRef(lesson);

  const [lastCompletedPercentage, setLastCompletedPercentage] = useState<number>(0);
  const [timestamp, setTimestamp] = useState({
    seconds: 0,
    duration: 0,
  });
  const [showNextLessonAlert, setShowNextLessonAlert] = useState(false);

  const { sectionsProgressData, getLessonStatus, setIsNavigatingLesson } = useLessonLearningStore();
  const currentLessonIndex = getLessonGlobalIndex(sectionsProgressData, lesson as string);
  const totalItems = getTotalLessons(sectionsProgressData);

  const checkNextLesson = getLessonStatus(currentLessonIndex + 1);

  const handleNavigateLesson = useCallback(() => {
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

    return learningPageUrl ? router.push(learningPageUrl) : null;
  }, [currentLessonIndex, totalItems, sectionsProgressData, slug, router]);

  const checkProgress = useCallback(
    (currentTime: number, duration: number) => {
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
          setIsNavigatingLesson(true);
          setShowNextLessonAlert(true);
        }

        return roundedPercentage;
      }
      return null;
    },
    [lastCompletedPercentage, onComplete, options, checkNextLesson]
  );

  useEffect(() => {
    setIsNavigatingLesson(false);
  }, []);

  // Update currentLessonRef when lesson changes
  useEffect(() => {
    currentLessonRef.current = lesson;

    const nextLessonInfo = getUidByLessonIndex(
      sectionsProgressData,
      currentLessonIndex < totalItems ? currentLessonIndex + 1 : 0
    );
    const isOnTargetLesson = lesson === nextLessonInfo?.lessonUid;

    if (isOnTargetLesson) {
      setShowNextLessonAlert(false);
    }
  }, [lesson, sectionsProgressData, currentLessonIndex, totalItems]);

  return {
    lastCompletedPercentage,
    checkProgress,
    timestamp,
    // Return values for AlertDialog
    showNextLessonAlert,
    setShowNextLessonAlert,
    handleNavigateLesson,
    dialogProps: {
      title: tPlayerToast('title'),
      description: tPlayerToast('description'),
      continueText: tPlayerToast('continueText'),
      cancelText: tPlayerToast('cancelText'),
      onOpenChange: (open: boolean) => {
        if (!open) {
          setShowNextLessonAlert(false);
        }
      },
    },
  };
};
