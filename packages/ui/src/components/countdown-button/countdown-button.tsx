import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';

/**
 *  HOW TO USE
 *  <CountdownButton
      initialTime={120}
      onComplete={() => console.log('Countdown finished')}
      onTick={(time) => console.log(`${time} seconds remaining`)}
      onClick={async () => {
        await someAsyncOperation();
      }}
      variant="outline"
      size="lg"
    >
      Start Timer
    </CountdownButton>
 **/

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface CountdownButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  initialTime?: number;
  onComplete?: () => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  onTick?: (remainingTime: number) => void;
}

const DEFAULT_COUNTDOWN = 59;

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(Math.max(0, totalSeconds) / 60);
  const seconds = Math.max(0, totalSeconds) % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export function CountdownButton({
  children,
  onComplete,
  onClick,
  onTick,
  loading = false,
  className,
  disabled = false,
  initialTime = DEFAULT_COUNTDOWN,
  variant = 'default',
  size = 'default',
  ...props
}: CountdownButtonProps) {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset countdown when initialTime changes
  useEffect(() => {
    if (!isCountingDown) {
      setCountdown(initialTime);
    }
  }, [initialTime, isCountingDown]);

  const startCountdown = useCallback(() => {
    setIsCountingDown(true);

    // Clear any existing interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCountdown(prevCount => {
        const newCount = prevCount - 1;
        onTick?.(newCount);

        if (newCount <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsCountingDown(false);
          setCountdown(initialTime);
          onComplete?.();
          return 0;
        }

        return newCount;
      });
    }, 1000);
  }, [initialTime, onComplete, onTick]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isCountingDown || loading || disabled) {
        return;
      }

      try {
        if (onClick) {
          await onClick(event);
        }
        startCountdown();
      } catch (error) {
        console.error('Error handling button click:', error);
        setIsCountingDown(false);
      }
    },
    [isCountingDown, loading, disabled, onClick, startCountdown]
  );

  return (
    <Button
      onClick={handleClick}
      disabled={isCountingDown || loading || disabled}
      className={cn('min-w-[90px] select-none', className)}
      variant={variant}
      size={size}
      {...props}
    >
      {isCountingDown ? formatTime(countdown) : children}
    </Button>
  );
}
