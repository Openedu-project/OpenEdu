import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';

interface IChangeStatusOrgModal {
  onSubmit: () => void;
  onClose: () => void;
}

export function ChangeStatusOrgModal({ onSubmit, onClose }: IChangeStatusOrgModal) {
  const t = useTranslations('organizationsManagement.changeStatusOrgModal');

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
          label: t('continue'),
          variant: 'default',
          onClick: () => onSubmit(),
        },
      ]}
    >
      <span>{t('description')}</span>
    </Modal>
  );
}
