'use client';

import { Indicator, Root } from '@radix-ui/react-progress';
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react';

import { cn } from '#utils/cn';

const Progress = forwardRef<ComponentRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, value, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-transparent', className)}
      {...props}
    >
      <Indicator
        className="h-full w-full flex-1 bg-primary transition-transform"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </Root>
  )
);
Progress.displayName = Root.displayName;

export { Progress };
