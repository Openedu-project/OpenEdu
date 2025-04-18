'use client';

import type { ICourseOutline } from '@oe/api';
import type { IQuizItemResponse } from '@oe/api';
import type { IQuizSubmissionResponse } from '@oe/api';
import { convertTimeStringToSeconds } from '@oe/core';
import { type IframeHTMLAttributes, useEffect, useRef, useState } from 'react';
import { Spinner } from '#components/spinner';
import { useQuiz } from '../../../_context';
import { usePlayerProgress } from './_hooks';
import { NextLessonAlert } from './next-lesson-alert';
import { EVENTS, usePlayer } from './player';
import { VideoQuizInfo } from './video-quiz-infor';
import { VideoQuizModal } from './video-quiz-modal';

interface IContentVideoProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  disableSeeking?: boolean;
  courseData: ICourseOutline;
  quizzes: IQuizItemResponse[];
  isPreview?: boolean;
  onlyVideoContent?: boolean;
  maxHeight?: string;
  onComplete?: (duration: number, time: number, quizzes?: string) => void;
}

const ContentVideo = ({
  id,
  title,
  src,
  onComplete,
  quizzes,
  isPreview = false,
  courseData,
  onlyVideoContent,
  maxHeight,
  ...props
}: IContentVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>({} as HTMLIFrameElement);
  const quizInfoRef = useRef(null);
  const player = usePlayer(iframeRef);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shownQuizzes, setShownQuizzes] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [videoTimestamp, setVideoTimestamp] = useState({
    seconds: 0,
    duration: 0,
  });

  const { quizResult } = useQuiz();

  const triggerQuizConditions = () => {
    if (quizzes) {
      return quizzes
        .map(quiz => {
          return {
            id: quiz.id,
            timestamp: quiz.trigger_conditions?.timestamp
              ? convertTimeStringToSeconds(quiz.trigger_conditions.timestamp)
              : null,
          };
        })
        .filter(condition => condition.timestamp !== null);
    }
    return [];
  };
  const triggerConditions = triggerQuizConditions();

  const { checkProgress, handleNavigateLesson, showNextLessonAlert, dialogProps } = usePlayerProgress(onComplete, {
    quizzes,
    onlyVideoContent,
    quizResult,
    onTimeUpdate: (seconds, duration) => {
      setVideoTimestamp({ seconds, duration });
    },
  });

  useEffect(() => {
    if (player) {
      const handleTimeUpdate = (data: {
        seconds: number;
        duration: number;
      }) => {
        for (const condition of triggerConditions) {
          if (!isPreview && Math.floor(data.seconds) === condition.timestamp && !shownQuizzes.includes(condition.id)) {
            player.pause();

            // Show quiz modal
            setShowQuiz(true);

            setShownQuizzes(prev => [...prev, condition.id]);

            if (document.fullscreenElement !== null) {
              document.exitFullscreen().catch(error => console.error(error));
            }
          }
        }

        checkProgress(data.seconds, data.duration);
      };

      player.on(EVENTS.TIMEUPDATE, handleTimeUpdate);

      return () => {
        player.off(EVENTS.TIMEUPDATE, handleTimeUpdate);
      };
    }
  }, [player, checkProgress, triggerConditions, shownQuizzes, isPreview]);

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col">
      {isLoading ? <Spinner size="sm" /> : null}

      <iframe
        ref={iframeRef}
        id={id}
        title={title}
        src={src}
        style={{
          border: 'none',
          borderRadius: '16px',
          height: '100%',
          maxHeight: maxHeight,
          transition: 'opacity 0.3s ease-in-out',
        }}
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
        className="aspect-video"
        allowFullScreen
        onLoad={() => {
          setIsLoading(false);
        }}
        {...props}
      />

      {quizzes?.length > 0 && player && !isPreview && (
        <div ref={quizInfoRef} className="mt-2 w-full">
          <VideoQuizInfo quizzes={quizzes} player={player} />
        </div>
      )}

      {!isPreview && showQuiz && quizzes?.length > 0 && (
        <VideoQuizModal
          duration={videoTimestamp.duration}
          seconds={videoTimestamp.seconds}
          quizzes={quizzes}
          course_data={courseData}
          shownQuizzes={shownQuizzes}
          triggerFunction={(quizResult: IQuizSubmissionResponse) => {
            if (quizResult) {
              setShowQuiz(false);
            }

            onComplete?.(videoTimestamp.duration, videoTimestamp.seconds, quizzes[0]?.id);
          }}
        />
      )}

      <NextLessonAlert isOpen={showNextLessonAlert} onContinue={handleNavigateLesson} {...dialogProps} />
    </div>
  );
};

export { ContentVideo };
