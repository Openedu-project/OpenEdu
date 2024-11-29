import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Modal } from '#components/modal';

export function DeleteButton({
  children,
  title,
  description,
  onDelete,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  onDelete: (onClose?: () => void) => void;
}) {
  const tGeneral = useTranslations('general');
  return (
    <Modal
      trigger={children}
      title={title ?? tGeneral('deleteModalTitle')}
      description={description ?? tGeneral('deleteModalDescription')}
      buttons={[
        { label: 'Delete', type: 'button', onClick: onDelete },
        { label: 'Cancel', type: 'button', variant: 'outline' },
      ]}
    />
  );
}
