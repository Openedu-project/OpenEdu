import { Loader2 } from 'lucide-react';
import type React from 'react';
import { cn } from '#utils/cn';

interface SpinnerProps {
  center?: boolean;
  backdrop?: boolean;
  inverse?: boolean;
  vertical?: boolean;
  content?: React.ReactNode;
  speed?: 'normal' | 'fast' | 'slow' | 'paused';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  className?: string;
}

export function Spinner({
  center = true,
  backdrop = true,
  inverse = false,
  vertical = false,
  content,
  speed = 'normal',
  size = 'sm',
  className,
}: SpinnerProps) {
  const containerClasses = cn(
    'flex items-center justify-center',
    {
      'absolute top-0 left-0 z-10 h-full w-full': center,
      'bg-background/50': backdrop,
      'text-inverse': inverse,
      'flex-col': vertical,
    },
    className
  );

  const loaderClasses = cn('animate-spin', {
    'w-16 h-16': size === 'lg',
    'w-12 h-12': size === 'md',
    'w-8 h-8': size === 'sm',
    'w-6 h-6': size === 'xs',
    'animate-spin-fast': speed === 'fast',
    'animate-spin': speed === 'normal',
    'animate-spin-slow': speed === 'slow',
    'animate-paused': speed === 'paused',
  });

  return (
    <div className={containerClasses}>
      <Loader2 className={loaderClasses} />
      {content && <div className={vertical ? 'mt-2' : 'ml-2'}>{content}</div>}
    </div>
  );
}
