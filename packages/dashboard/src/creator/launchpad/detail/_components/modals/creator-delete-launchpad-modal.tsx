import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface ICreatorDeleteLaunchpadModal {
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export function CreatorDeleteLaunchpadModal({ onSubmit, onClose, isLoading }: ICreatorDeleteLaunchpadModal) {
  const t = useTranslations('creatorLaunchpad.deleteLaunchpadModal');

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Modal
      open={true}
      title={t('title')}
      onClose={onClose}
      buttons={[
        {
          type: 'button',
          label: t('cancel'),
          variant: 'outline',
          onClick: () => onClose(),
        },
        {
          type: 'button',
          label: t('delete'),
          variant: 'destructive',
          loading: isLoading,
          onClick: () => handleSubmit(),
        },
      ]}
    >
      {t('description')}
    </Modal>
  );
}
