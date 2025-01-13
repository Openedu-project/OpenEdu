'use client';

import { type IframeHTMLAttributes, useEffect, useRef, useState } from 'react';
import { Spinner } from '#components/spinner';

interface IContentVideoProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  disableSeeking?: boolean;
}

const ContentVideo = ({ id, title, src, ...props }: IContentVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldLoad, setShouldLoad] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full max-h-full w-auto max-w-full">
      {isLoading ? <Spinner size="sm" /> : null}

      {shouldLoad && (
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
      )}
    </div>
  );
};

export default ContentVideo;
