'use client';

import type React from 'react';
import { memo, useCallback } from 'react';
import { cn } from '#utils/cn';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee = memo(function Marquee({ children, speed = 20, pauseOnHover = true, className }: MarqueeProps) {
  const handleMouseEnter = useCallback(() => {
    const scrollContainer = document.querySelector('.marquee-content') as HTMLElement;
    if (scrollContainer && pauseOnHover) {
      scrollContainer.style.animationPlayState = 'paused';
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    const scrollContainer = document.querySelector('.marquee-content') as HTMLElement;
    if (scrollContainer && pauseOnHover) {
      scrollContainer.style.animationPlayState = 'running';
    }
  }, [pauseOnHover]);

  return (
    <div className="relative w-full overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className={cn(
          'marquee-content',
          'inline-flex items-center gap-8 md:gap-12',
          'animate-infinite-scroll',
          className
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
        <div aria-hidden="true" className="inline-flex items-center gap-8 md:gap-12">
          {children}
        </div>
      </div>
    </div>
  );
});
