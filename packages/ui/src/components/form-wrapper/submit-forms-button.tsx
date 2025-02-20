import { Slot } from '@radix-ui/react-slot';
import { useFormContext } from './form-nested-provider';

import type { IFormSubmitButtonProps } from './types';

import { useTranslations } from 'next-intl';
import type { FC, MouseEvent } from 'react';
import { Button, type ButtonProps } from '#shadcn/button';
import { cn } from '#utils/cn';

export const SubmitFormsButton: FC<IFormSubmitButtonProps & ButtonProps> = ({
  children,
  className,
  disabled,
  asChild = false,
  formIds,
  loading,
  onClick,
  ...props
}) => {
  const tGeneral = useTranslations('general');
  const { isSubmitting, submitForm } = useFormContext();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('loading', loading);
    if (onClick) {
      onClick(e);
    }
    await submitForm(formIds);
  };

  // console.log("isSubmitting", isSubmitting);

  const Component = asChild ? Slot : Button;

  return (
    <Component
      type="button"
      className={cn(
        'inline-flex items-center justify-center',
        isSubmitting && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled || loading || isSubmitting}
      onClick={handleClick}
      loading={loading || isSubmitting}
      {...props}
    >
      {children ? children : <span>{tGeneral('submit')}</span>}
    </Component>
  );
};
