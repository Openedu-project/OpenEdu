import { Button } from '@oe/ui';
import { type INestedFormsValues, SubmitFormsButton } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { FC, ReactNode } from 'react';

export interface ILaunchpadNavigationButtonsProps {
  className?: string;
  onPrevClick?: () => void;
  onNextClick?: (data: INestedFormsValues) => void;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
  isPrevIconStart?: boolean;
  isNextIconStart?: boolean;
}

export const LaunchpadNavigationButtons: FC<ILaunchpadNavigationButtonsProps> = ({
  className,
  onPrevClick,
  prevButtonClassName,
  prevIcon,
  nextIcon,
  isPrevIconStart = true,
  isNextIconStart = true,
}) => {
  const tGeneral = useTranslations('general');

  return (
    <div className={cn('mt-4 flex justify-end gap-5', className)}>
      <Button type="button" variant="outline" onClick={onPrevClick} className={cn(prevButtonClassName)}>
        {isPrevIconStart && prevIcon}
        {tGeneral('previous')}
        {!isPrevIconStart && prevIcon}
      </Button>

      <SubmitFormsButton>
        {isNextIconStart && nextIcon}
        {tGeneral('next')}
        {!isNextIconStart && nextIcon}
      </SubmitFormsButton>
    </div>
  );
};
