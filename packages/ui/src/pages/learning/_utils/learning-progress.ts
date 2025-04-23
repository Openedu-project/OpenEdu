import type { TLessonContent } from '@oe/api';
import type { ISectionLearningProgress } from '@oe/api';
import type { IQuizSubmissionResponse } from '@oe/api';

const CONSTANTS = {
  MIN_WATCHED_PERCENTAGE: 0.8,
} as const;

interface ICheckCompleteAtProps {
  type: TLessonContent;
  videoDuration: number;
  pauseAt: number;
  quizId?: string;
  quizResult?: IQuizSubmissionResponse;
}

const isPlayerContentType = (type: TLessonContent): boolean => type === 'video' || type === 'embedded';

const hasWatchedEnoughContent = (pauseAt: number, duration: number): boolean => {
  const pauseAtFloor = Math.floor(pauseAt);
  const durationFloor = Math.floor(duration);
  return pauseAtFloor >= Math.floor(durationFloor * CONSTANTS.MIN_WATCHED_PERCENTAGE);
};

const hasCompletedQuiz = (quizId?: string, quizResult?: IQuizSubmissionResponse): boolean => {
  if (!quizId) {
    return true;
  }
  return quizId === quizResult?.quiz_id;
};

export const checkCompleteAt = ({
  type,
  videoDuration,
  pauseAt,
  quizId,
  quizResult,
}: ICheckCompleteAtProps): number => {
  if (!isPlayerContentType(type)) {
    return Date.now();
  }

  const hasWatched = hasWatchedEnoughContent(pauseAt, videoDuration);

  if (type === 'embedded') {
    return hasWatched ? Date.now() : 0;
  }

  if (type === 'video') {
    const quizCompleted = hasCompletedQuiz(quizId, quizResult);
    return hasWatched && quizCompleted ? Date.now() : 0;
  }

  return 0;
};

interface ILessonContentComplete {
  outline: ISectionLearningProgress[];
  section_uid: string;
  lesson_uid: string;
  lesson_content_uid?: string;
  pause_at?: number;
}

export const isLessonContentComplete = ({
  outline,
  section_uid,
  lesson_uid,
  lesson_content_uid,
  pause_at,
}: ILessonContentComplete): boolean => {
  const section = outline?.find(s => s.uid === section_uid);
  if (!section?.lessons) {
    return false;
  }

  const lesson = section.lessons?.find(l => l.uid === lesson_uid);
  if (!lesson) {
    return false;
  }

  const lessonContent = lesson.lesson_contents?.find(lc => lc.lesson_content_uid === lesson_content_uid);

  const isCompleted = lessonContent
    ? lessonContent.complete_at !== 0 ||
      (lessonContent.content_type === 'video' &&
        pause_at !== undefined &&
        pause_at < lessonContent.pause_at &&
        lessonContent.complete_at !== 0)
    : false;

  return isCompleted;
};
