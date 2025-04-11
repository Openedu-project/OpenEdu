import { Check } from 'lucide-react';
import { cn } from '#utils/cn';

type ProgressBarSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  progress: number;
  size?: ProgressBarSize;
}

const sizeConfig = {
  sm: {
    container: 'w-4 h-4',
    checkIcon: 'w-[10px] h-[10px]',
    border: 'border',
  },
  md: {
    container: 'w-6 h-6',
    checkIcon: 'w-4 h-4 stroke-[3px]',
    border: 'border-[2px]',
  },
  lg: {
    container: 'w-8 h-8',
    checkIcon: 'w-6 h-6 stroke-2',
    border: 'border-[3px]',
  },
} as const;

const CircleProgressBar = ({ progress = 0, size = 'md' }: ProgressBarProps) => {
  const progressPercent = Math.min(Math.floor(progress) || 0, 100);
  const { container, checkIcon, border } = sizeConfig[size];

  if (progressPercent === 100) {
    return (
      <div
        className={cn('grid items-center justify-items-center rounded-full border-primary bg-white', container, border)}
      >
        <Check color="var(--primary)" className={cn(checkIcon)} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative grid items-center justify-items-center rounded-full',
        'before:absolute before:top-1/2 before:left-1/2',
        'before:-translate-x-1/2 before:-translate-y-1/2',
        'before:rounded-full before:bg-white before:content-[""]',
        'before:h-[80%] before:w-[80%]',
        container
      )}
      style={{
        background: `conic-gradient(
          var(--primary) 0% ${progressPercent}%,
          #DBDBDB ${progressPercent}% 100%
        )`,
      }}
    >
      <span className="mcaption-regular8 z-10 text-foreground/60">{progressPercent}%</span>
    </div>
  );
};

export { CircleProgressBar, type ProgressBarProps };
