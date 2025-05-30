import { Modal } from '@oe/ui/components/modal';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface ICreatorRemoveRequestLaunchpadModal {
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function CreatorRemoveRequestLaunchpadModal({
  onSubmit,
  onClose,
  isLoading,
}: ICreatorRemoveRequestLaunchpadModal) {
  const t = useTranslations('creatorLaunchpad.removeRequestApprovalLaunchpadModal');

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
          label: t('remove'),
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
