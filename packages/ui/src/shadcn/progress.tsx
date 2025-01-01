'use client';

import { Indicator, Root } from '@radix-ui/react-progress';
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react';

import { cn } from '#utils/cn';

const Progress = forwardRef<ComponentRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, value, ...props }, ref) => (
    <Root ref={ref} className={cn('relative h-4 w-full overflow-hidden rounded-full bg-muted', className)} {...props}>
      <Indicator
        className="h-full w-full flex-1 bg-primary transition-transform"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  )
);
Progress.displayName = Root.displayName;

const CircleProgress = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'> & {
    value?: number;
    showText?: boolean;
    size?: number;
    strokeWidth?: number;
  }
>(({ className, value = 0, showText, size = 40, strokeWidth = 4, ...props }, ref) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref} className={cn('relative inline-flex items-center justify-center', className)} {...props}>
      <svg
        className="-rotate-90 transform"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="graphics-symbol"
      >
        {/* Background circle */}
        <circle
          className="text-muted"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeLinecap: 'round',
          }}
        />
        {/* Progress circle */}
        <circle
          className="text-primary transition-all duration-300 ease-in-out"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeLinecap: 'round',
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>
      {showText && <div className="absolute font-medium text-sm">{`${Math.round(value)}%`}</div>}
    </div>
  );
});

CircleProgress.displayName = 'CircleProgress';

export { Progress, CircleProgress };
