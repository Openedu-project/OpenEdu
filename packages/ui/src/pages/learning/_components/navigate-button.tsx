import { ArrowLeft2, ArrowRight2 } from '@oe/assets';
import type { TFunction } from '@oe/i18n';
import type { ReactNode } from 'react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';

interface NavigationButtonsProps {
  mode: 'quiz' | 'lesson';
  currentIndex?: number;
  totalItems?: number;
  onNavigate?: (direction: 'prev' | 'next') => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  className?: string;
  t?: TFunction;
}

const baseStyles = {
  quiz: '!rounded-full h-10 w-10 px-0 shadow-shadow-5 hover:bg-primary hover:opacity-75 disabled:border disabled:border-neutral-900 disabled:bg-white',
  lesson: 'w-full mbutton-bold12 !text-sm border border-primary bg-transparent text-primary hover:bg-inherit',
};

const ButtonWrapper = ({
  mode,
  children,
}: {
  mode: 'quiz' | 'lesson';
  children: ReactNode;
}) => {
  if (mode === 'quiz') {
    return (
      <div className="-translate-y-1/2 absolute top-1/2 left-0 mx-auto flex w-full justify-center">
        <div className="flex w-full max-w-[480px] justify-between">{children}</div>
      </div>
    );
  }
  return <div className="flex justify-between gap-2 sm:justify-end">{children}</div>;
};

export const NavigationButtons = ({
  mode,
  currentIndex = 0,
  totalItems = 0,
  onNavigate,
  disablePrev,
  disableNext,
  className,
  t,
}: NavigationButtonsProps) => {
  const renderButton = (direction: 'prev' | 'next') => {
    const isPrev = direction === 'prev';
    const Icon = isPrev ? ArrowLeft2 : ArrowRight2;
    const disabled = isPrev ? (disablePrev ?? currentIndex <= 0) : (disableNext ?? currentIndex >= totalItems - 1);

    if (mode === 'quiz') {
      return (
        <Button disabled={disabled} className={cn(baseStyles.quiz, className)} onClick={() => onNavigate?.(direction)}>
          <Icon width={24} height={24} color={disabled ? 'var(--foreground)' : 'white'} />
        </Button>
      );
    }

    return (
      <Button
        size="xs"
        className={cn(baseStyles.lesson, className)}
        disabled={disabled}
        onClick={() => onNavigate?.(direction)}
      >
        {isPrev && <Icon className="mr-1" color="var(--primary)" />}
        {t?.(direction)}
        {!isPrev && <Icon className="ml-1" color="var(--primary)" />}
      </Button>
    );
  };

  return (
    <ButtonWrapper mode={mode}>
      {renderButton('prev')}
      {renderButton('next')}
    </ButtonWrapper>
  );
};
