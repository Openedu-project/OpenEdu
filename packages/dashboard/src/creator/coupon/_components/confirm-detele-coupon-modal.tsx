import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';

interface IActionsFormModal {
  open: boolean;
  id: string;
  onSubmit: (id: string) => void;
  onClose: () => void;
}

export function ConfirmDeleteCouponModal({ open = true, id, onClose, onSubmit }: IActionsFormModal) {
  const t = useTranslations('coupon.deleteForm');

  return (
    <Modal
      open={open}
      title=""
      onClose={onClose}
      hasCancelButton={false}
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
          onClick: () => onSubmit(id),
        },
      ]}
    >
      <div className="block">
        <h4 className="giant-iheading-giant-iheading-semibold16 md:giant-iheading-semibold28 ">{t('title')}</h4>
        <p>{t('desc')}</p>
      </div>
    </Modal>
  );
}
