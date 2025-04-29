import type { TLessonContent } from '@oe/api';
import type { ISectionLearningProgress } from '@oe/api';
import type { IQuizSubmissionResponse } from '@oe/api';
import type { IMergedLearningProgress } from '../_type';

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
  outline: ISectionLearningProgress[] | IMergedLearningProgress;
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
}: ILessonContentComplete): boolean => {
  if ('section_by_uid' in outline) {
    const mergedProgress = outline as IMergedLearningProgress;
    const section = mergedProgress.section_by_uid[section_uid];
    if (!section) {
      return false;
    }

    const lesson = section.lesson_by_uid[lesson_uid];
    if (!lesson?.lesson_content_by_uid) {
      return false;
    }

    if (!lesson_content_uid) {
      return false;
    }

    const content = lesson.lesson_content_by_uid[lesson_content_uid];

    if (!content) {
      return false;
    }

    return content.complete_at > 0;
  }

  const sectionsArray = outline as ISectionLearningProgress[];
  const section = sectionsArray.find(s => s.uid === section_uid);
  if (!section) {
    return false;
  }

  const lesson = section.lessons.find(l => l.uid === lesson_uid);
  if (!lesson) {
    return false;
  }

  const content = lesson.lesson_contents.find(c => c.lesson_content_uid === lesson_content_uid);
  if (!content) {
    return false;
  }

  return content.complete_at > 0;
};
