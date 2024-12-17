import { Modal } from '@oe/ui/components/modal';
import { useTranslations } from 'next-intl';

interface IDeleteCreatorModal {
  onSubmit: () => void;
  onClose: () => void;
}

export default function ConfirmDeleteCreatorModal({ onSubmit, onClose }: IDeleteCreatorModal) {
  const t = useTranslations('creatorManagement.deleteCreatorModal');

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
          onClick: () => onSubmit(),
        },
      ]}
    >
      {t('desc')}
    </Modal>
  );
}
