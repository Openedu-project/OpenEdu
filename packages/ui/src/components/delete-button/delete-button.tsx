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
      title={title ?? tGeneral('deleteModalTitle')}
      description={description ?? tGeneral('deleteModalDescription')}
      buttons={[
        { label: 'Delete', type: 'button', onClick: onDelete },
        { label: 'Cancel', type: 'button', variant: 'outline' },
      ]}
    />
  );
}
