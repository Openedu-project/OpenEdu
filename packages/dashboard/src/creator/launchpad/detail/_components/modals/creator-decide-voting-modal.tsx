import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface ICreatorDecideVotingLaunchpadModal {
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export function CreatorDecideVotingLaunchpadModal({
  onSubmit,
  onClose,
  isLoading,
}: ICreatorDecideVotingLaunchpadModal) {
  const t = useTranslations('creatorLaunchpad.startVotingModal');

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
          label: t('confirm'),
          variant: 'default',
          loading: isLoading,
          onClick: () => handleSubmit(),
        },
      ]}
    >
      {t('description')}
    </Modal>
  );
}
