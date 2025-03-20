import { Modal } from '@oe/ui/components/modal';
import { useTranslations } from 'next-intl';

interface DeleteThemeModalProps {
  setOpen: (open: boolean) => void;
  onRemove: () => void;
}

const DeleteThemeModal = ({ setOpen, onRemove }: DeleteThemeModalProps) => {
  const t = useTranslations('themeList');
  return (
    <Modal
      open={true}
      title={t('delTitle')}
      onClose={() => setOpen(false)}
      onSubmit={() => {
        setOpen(false);
        onRemove();
      }}
      buttons={[
        {
          type: 'button',
          label: t('close'),
          variant: 'outline',
          onClick: () => setOpen(false),
        },
        {
          type: 'submit',
          label: t('delete'),
          variant: 'destructive',
        },
      ]}
    >
      <p>{t('delContent')}</p>
    </Modal>
  );
};

export default DeleteThemeModal;
