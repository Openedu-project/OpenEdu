'use client';

import { Indicator, Root } from '@radix-ui/react-progress';
import type { ComponentProps } from 'react';

import { cn } from '#utils/cn';

function Progress({ className, value, ...props }: ComponentProps<typeof Root> & { value?: number }) {
  return (
    <Root
      data-slot="root"
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-muted', className)}
      {...props}
    >
      <Indicator
        data-slot="indicator"
        className="h-full w-full flex-1 bg-primary transition-transform"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  );
}

function CircleProgress({
  className,
  value = 0,
  showText,
  size = 40,
  strokeWidth = 4,
  ...props
}: ComponentProps<'div'> & {
  value?: number;
  showText?: boolean;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div data-slot="container" className={cn('relative inline-flex items-center justify-center', className)} {...props}>
      <svg
        data-slot="svg"
        className="-rotate-90 transform"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="graphics-symbol"
      >
        {/* Background circle */}
        <circle
          data-slot="background"
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
          data-slot="progress"
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
      {showText && <div data-slot="text" className="absolute font-medium text-sm">{`${Math.round(value)}%`}</div>}
    </div>
  );
}

export { Progress, CircleProgress };
