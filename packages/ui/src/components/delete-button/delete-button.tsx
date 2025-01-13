import { CircleX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Modal } from '#components/modal';
import { Button, type ButtonProps } from '#shadcn/button';
import { cn } from '#utils/cn';

export function DeleteButton({
  children,
  title,
  description,
  className,
  onDelete,
  ...buttonProps
}: ButtonProps & {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  onDelete: (onClose?: () => void) => Promise<void>;
}) {
  const tGeneral = useTranslations('general');
  return (
    <Modal
      trigger={
        <Button variant="ghost" size="icon" className={cn('h-8 w-8', className)} {...buttonProps}>
          {children}
        </Button>
      }
      title={
        <span className="flex flex-col items-center gap-4 text-destructive">
          <CircleX className="h-8 w-8" />
          {title ?? tGeneral('deleteModalTitle')}
        </span>
      }
      description={
        <span className="flex flex-col items-center gap-4">{description ?? tGeneral('deleteModalDescription')}</span>
      }
      buttons={[
        {
          label: tGeneral('delete'),
          type: 'button',
          variant: 'destructive',
          onClick: onDelete,
          className: 'flex-1',
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
