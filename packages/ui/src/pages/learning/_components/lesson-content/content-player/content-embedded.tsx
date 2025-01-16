'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';

const ContentEmbedded = ({
  url,
  onComplete,
}: {
  url?: string;
  onComplete?: (duration: number, currentTime: number) => void;
}) => {
  const [lastCompletedPercentage, setLastCompletedPercentage] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleTimeUpdate = (currentTime: number) => {
    if (onComplete) {
      const percentage = (currentTime / duration) * 100;
      const roundedPercentage = Math.floor(percentage / 20) * 20;

      if (roundedPercentage >= 20 && roundedPercentage <= 100 && roundedPercentage > lastCompletedPercentage) {
        onComplete?.(duration, currentTime);
        setLastCompletedPercentage(roundedPercentage);
      }
    }
  };

  return (
    <div className="mx-auto aspect-video h-full max-h-full max-w-full">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        onDuration={handleDuration}
        onProgress={state => {
          handleTimeUpdate(Math.floor(state.playedSeconds));
        }}
      />
    </div>
  );
};

export default ContentEmbedded;
