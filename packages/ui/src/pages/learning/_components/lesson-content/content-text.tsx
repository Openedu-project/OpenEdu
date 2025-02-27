'use client';

import type { ILessonContent } from '@oe/api/types/course/segment';
import { useEffect, useRef } from 'react';

interface ITextProps {
  data?: ILessonContent;
  onComplete?: () => void;
}

export default function ContentText({ data, onComplete }: ITextProps) {
  const content = data?.content;
  const uid = data?.uid;
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasCalledComplete = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    if (!(onComplete && contentRef.current)) {
      return;
    }

    // Reset the flag when content changes
    hasCalledComplete.current = false;

    // Create bottom marker element
    const bottomMarker = document.createElement('div');
    bottomMarker.style.height = '1px';
    bottomMarker.style.width = '100%';

    // Append marker to content
    contentRef.current.appendChild(bottomMarker);

    // Setup intersection observer
    observerRef.current = new IntersectionObserver(
      entries => {
        const isVisible = entries[0]?.isIntersecting;
        if (isVisible && !hasCalledComplete.current) {
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          // Set new timeout
          timeoutRef.current = setTimeout(() => {
            onComplete();
            hasCalledComplete.current = true;
          }, 2000); // 2 second delay
        }
      },
      {
        threshold: 1.0, // Fully visible
        root: null, // Use viewport
        rootMargin: '0px',
      }
    );

    // Start observing
    observerRef.current.observe(bottomMarker);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      bottomMarker.remove();
    };
  }, [onComplete, content]);

  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div key={uid} className="flex w-full flex-1 flex-col px-2 md:px-0">
      <div
        ref={contentRef}
        className="rich-text [&>ol]:!leading-tight [&>ul]:!leading-tight [&>ul>li]:!mb-2 [&>ol>li]:!mb-2 m-0"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: content as string | TrustedHTML,
        }}
      />
    </div>
  );
}
