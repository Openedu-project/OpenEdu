'use client';
import type { IQuizItemResponse } from '@oe/api/types/course/quiz';
import { convertTimeStringToSeconds } from '@oe/core/utils/datetime';
import { type IframeHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { Spinner } from '#components/spinner';
import { EVENTS, usePlayer } from './player';
import VideoQuizInfo from './video-quiz-infor';
import VideoQuizModal from './video-quiz-modal';

interface IContentVideoProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  disableSeeking?: boolean;
  courseId: string;
  quizzes: IQuizItemResponse[];
  isPreview?: boolean;
  onComplete?: (duration: number, time: number, quizzes?: string) => void;
}

const ContentVideo = ({
  id,
  title,
  src,
  onComplete,
  quizzes,
  isPreview = false,
  courseId,
  ...props
}: IContentVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>({} as HTMLIFrameElement);
  const player = usePlayer(iframeRef);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shownQuizzes, setShownQuizzes] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [videoTimestamp, setVideoTimestamp] = useState({
    seconds: 0,
    duration: 0,
  });
  const [lastCompletedPercentage, setLastCompletedPercentage] = useState<number>(0);

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

  const checkCompletion = useCallback(
    (currentTime: number, duration: number) => {
      if (player && onComplete) {
        const percentage = (currentTime / duration) * 100;
        const roundedPercentage = Math.floor(percentage / 20) * 20;

        if (roundedPercentage >= 20 && roundedPercentage <= 100 && roundedPercentage > lastCompletedPercentage) {
          if (quizzes && quizzes?.length > 0) {
            onComplete(duration, currentTime, quizzes[0]?.id);

            setVideoTimestamp({ seconds: currentTime, duration });
          } else {
            onComplete(duration, currentTime);
          }

          setLastCompletedPercentage(roundedPercentage);
        }

        // if (
        //   onlyVideoContent &&
        //   checkNextLesson &&
        //   roundedPercentage === 100 &&
        //   quizResult
        // ) {
        //   handleShowToast();
        // }
      }
    },
    [player, onComplete, lastCompletedPercentage]
  );

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

        checkCompletion(data.seconds, data.duration);
      };

      player.on(EVENTS.TIMEUPDATE, handleTimeUpdate);

      return () => {
        player.off(EVENTS.TIMEUPDATE, handleTimeUpdate);
      };
    }
  }, [player, checkCompletion]);

  return (
    <div ref={containerRef} className="relative h-full max-h-full w-auto max-w-full">
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
          transition: 'opacity 0.3s ease-in-out',
        }}
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen"
        className="mx-auto aspect-video max-w-full"
        allowFullScreen
        onLoad={() => {
          setIsLoading(false);
        }}
        {...props}
      />

      {quizzes?.length > 0 && player && <VideoQuizInfo quizzes={quizzes} player={player} />}

      {!isPreview && showQuiz && quizzes?.length > 0 && (
        <VideoQuizModal
          duration={videoTimestamp.duration}
          seconds={videoTimestamp.seconds}
          quizzes={quizzes}
          course_id={courseId}
          shownQuizzes={shownQuizzes}
        />
      )}
    </div>
  );
};

export default ContentVideo;
