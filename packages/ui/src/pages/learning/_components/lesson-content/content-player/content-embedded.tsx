'use client';

import ReactPlayer from 'react-player';

const ContentEmbedded = ({ url }: { url?: string }) => {
  return (
    <div className="mx-auto aspect-video h-full max-h-full max-w-full">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        // onDuration={handleDuration}
        // onProgress={(state) => {
        //   handleTimeUpdate(Math.floor(state.playedSeconds));
        // }}
      />
    </div>
  );
};

export default ContentEmbedded;
