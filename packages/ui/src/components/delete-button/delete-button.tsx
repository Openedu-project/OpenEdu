'use client';
import { CircleX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Modal } from '#components/modal';
import { Button, type ButtonProps } from '#shadcn/button';
import { cn } from '#utils/cn';

export function DeleteButton({
  children,
  title,
  description,
  className,
  onDelete,
  onClose,
  confirmBtnMessage,
  descClassName,
  ...buttonProps
}: ButtonProps & {
  children: ReactNode;
  title?: string;
  description?: string;
  descClassName?: string;
  className?: string;
  onClose?: () => void;
  onDelete: (onClose?: () => void) => Promise<void> | void;
  confirmBtnMessage?: string;
}) {
  const tGeneral = useTranslations('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleDelete = async (onClose?: () => void) => {
    setIsSubmitting(true);
    await onDelete(onClose);
    onClose?.();
    setIsSubmitting(false);
  };
  return (
    <Modal
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className={cn('h-8 w-8', className)}
          onClick={e => {
            e.stopPropagation();
          }}
          {...buttonProps}
        >
          {children}
        </Button>
      }
      onClose={onClose}
      title={
        <span className="flex flex-col items-center gap-4 text-destructive">
          <CircleX className="h-8 w-8" />
          {title ?? tGeneral('deleteModalTitle')}
        </span>
      }
      description={
        <span className={cn('flex flex-col items-center gap-4', descClassName)}>
          {description ?? tGeneral('deleteModalDescription')}
        </span>
      }
      buttons={[
        {
          label: confirmBtnMessage ?? tGeneral('delete'),
          type: 'button',
          variant: 'destructive',
          onClick: handleDelete,
          className: 'flex-1',
          loading: isSubmitting,
        },
        {
          label: tGeneral('cancel'),
          type: 'button',
          variant: 'outline',
          className: 'flex-1',
        },
      ]}
      buttonsClassName="sm:justify-center"
      className="max-w-sm md:max-w-sm"
    />
  );
}
