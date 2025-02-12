import type { IApprovalPayload } from '@oe/api/types/approvals';
import { Modal } from '@oe/ui/components/modal';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface IApproveLaunchpadModal {
  onSubmit: (value: IApprovalPayload) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function ApproveLaunchpadModal({ onSubmit, onClose, isLoading }: IApproveLaunchpadModal) {
  const t = useTranslations('adminLaunchpadRequest.approveModal');

  const handleSubmit = useCallback(() => {
    onSubmit({ note: '' });
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
          label: t('approve'),
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
