import { Modal } from '@oe/ui/components/modal';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface ICreatorStartVotingLaunchpadModal {
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function CreatorStartVotingLaunchpadModal({
  onSubmit,
  onClose,
  isLoading,
}: ICreatorStartVotingLaunchpadModal) {
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
