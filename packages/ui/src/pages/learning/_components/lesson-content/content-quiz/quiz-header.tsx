'use client';

import type { TimeLimitType } from '@oe/api/types/course/quiz';
import { calculateRemainingTime, convertSecondsToTimeString } from '@oe/core/utils/datetime';
import { Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

interface QuizHeaderProps {
  timeLimit?: string;
  startAt: number; // check start_at value after reloading page
  curQuesIndex: number;
  numQuestion: number;
  timeLimitType?: TimeLimitType;
  timeLimitEnabled?: boolean;
  onTimeUp?: () => void;
}

const QuizHeader = ({
  timeLimit = '00:00:00',
  curQuesIndex,
  numQuestion,
  startAt,
  timeLimitType,
  timeLimitEnabled,
  onTimeUp,
}: QuizHeaderProps) => {
  const t = useTranslations('learningPage.quiz');

  const [, forceUpdate] = useState({});
  const timerRef = useRef<number | null>(null);

  const getRemainingTime = (): number => {
    if (timeLimitType === 'overall') {
      return calculateRemainingTime(startAt, timeLimit);
    }
    const questionStartAt = startAt + curQuesIndex * calculateRemainingTime(0, timeLimit);

    return calculateRemainingTime(questionStartAt, timeLimit);
  };

  useEffect(() => {
    const updateTimer = () => {
      forceUpdate({});

      const remainingTime = getRemainingTime();

      if (remainingTime > 0) {
        timerRef.current = requestAnimationFrame(updateTimer);
      } else if (onTimeUp) {
        onTimeUp();
      }
    };

    updateTimer();

    return () => {
      if (timerRef.current !== null) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [startAt, timeLimit, timeLimitType, curQuesIndex]);

  return (
    <div className="flex justify-between">
      <div>
        <span className="mcaption-regular16 mb-1 text-content-neutral-light-700">{t('question')}</span>
        <p className="mcaption-semibold24 text-content-neutral-medium-800">
          <span className="text-primary">{curQuesIndex}</span>/{numQuestion}
        </p>
      </div>
      <div className="flex items-end gap-2">
        {timeLimitEnabled && (
          <div className="relative">
            <span className="mcaption-semibold12 absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 pt-spacing-s text-content-neutral-medium-800">
              {convertSecondsToTimeString(getRemainingTime())}
            </span>
            <Clock color="hsl(var(--primary))" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;
