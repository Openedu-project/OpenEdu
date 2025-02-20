'use client';
import ReactPlayer from 'react-player';
import { usePlayerProgress } from './_hooks';
import NextLessonAlert from './next-lesson-alert';

const ContentEmbedded = ({
  url,
  onComplete,
  onlyVideoContent,
}: {
  url?: string;
  onlyVideoContent?: boolean;
  onComplete?: (duration: number, currentTime: number) => void;
}) => {
  const { checkProgress, timestamp, showNextLessonAlert, handleNavigateLesson, dialogProps } = usePlayerProgress(
    onComplete,
    {
      onlyVideoContent,
    }
  );

  const handleDuration = (duration: number) => {
    checkProgress(0, duration); // Initialize with time 0
  };

  return (
    <>
      <div className="mx-auto flex aspect-video h-auto flex-col md:aspect-auto md:h-full [&>div>div>iframe]:mx-auto [&>div>div>iframe]:aspect-video [&>div>div>iframe]:w-auto [&>div>div>iframe]:max-w-full [&>div>div>iframe]:rounded-2xl [&>div]:flex-1">
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          onDuration={handleDuration}
          onProgress={state => {
            checkProgress(Math.floor(state.playedSeconds), timestamp.duration);
          }}
        />
      </div>

      <NextLessonAlert isOpen={showNextLessonAlert} onContinue={handleNavigateLesson} {...dialogProps} />
    </>
  );
};

export default ContentEmbedded;
