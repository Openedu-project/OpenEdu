import { Modal } from '@oe/ui/components/modal';
import { useTranslations } from 'next-intl';

interface IDeleteAffiliateCampaignCourseModal {
  open: boolean;
  id: string;
  onSubmit: (id: string) => void;
  onClose: () => void;
}

export default function DeleteAffiliateCampaignCourseModal({
  id,
  onClose,
  onSubmit,
  open,
}: IDeleteAffiliateCampaignCourseModal) {
  const t = useTranslations('affiliateDetailDeleteCourseModal');

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
      <div className="block px-4 py-8">
        <h4 className="font-semibold text-2xl">{t('title')}</h4>
        <p>{t('desc')}</p>
      </div>
    </Modal>
  );
}
