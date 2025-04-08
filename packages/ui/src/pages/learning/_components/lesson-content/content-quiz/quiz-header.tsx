'use client';

import type { TimeLimitType } from '@oe/api/types/course/quiz';
import Clock from '@oe/assets/icons/clock';
import { calculateRemainingTime, convertSecondsToTimeString } from '@oe/core/utils/datetime';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

interface QuizHeaderProps {
  timeLimit?: string;
  startAt: number;
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
  const [remainingTime, setRemainingTime] = useState<number>(() => calculateRemainingTime(startAt, timeLimit));
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const getRemainingTime = useCallback((): number => {
    if (timeLimitType === 'overall') {
      return calculateRemainingTime(startAt, timeLimit);
    }
    const questionStartAt = startAt + curQuesIndex * calculateRemainingTime(0, timeLimit);
    return calculateRemainingTime(questionStartAt, timeLimit);
  }, [startAt, timeLimit, curQuesIndex, timeLimitType]);

  useEffect(() => {
    setRemainingTime(getRemainingTime());

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const newRemainingTime = getRemainingTime();
      setRemainingTime(newRemainingTime);

      if (newRemainingTime < 1) {
        if (onTimeUp) {
          onTimeUp();
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [getRemainingTime, onTimeUp]);

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1 lg:flex-col">
        <span className="mcaption-regular16 text-content-neutral-light-700">{t('question')}</span>
        <p className="mcaption-semibold24 text-content-neutral-medium-800">
          <span className="text-primary">{curQuesIndex}</span>/{numQuestion}
        </p>
      </div>

      <div className="flex items-end gap-2">
        {timeLimitEnabled && (
          <div className="relative">
            <span className="mcaption-semibold12 absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 pt-spacing-s text-content-neutral-medium-800">
              {remainingTime > 0 ? (
                convertSecondsToTimeString(remainingTime)
              ) : (
                <span className="grid items-center pt-2 text-center text-destructive">Time's up</span>
              )}
            </span>
            <Clock color="var(--primary)" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;
