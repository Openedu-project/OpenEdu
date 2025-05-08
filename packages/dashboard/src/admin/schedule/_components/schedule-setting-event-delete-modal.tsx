import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';

interface IScheduleDeleteEventModal {
  onSubmit: () => void;
  onClose: () => void;
}

export function ScheduleDeleteEventModal({ onClose, onSubmit }: IScheduleDeleteEventModal) {
  const t = useTranslations('schedule.settings.event');

  return (
    <Modal
      open={true}
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
          onClick: () => onSubmit(),
        },
      ]}
    >
      <div className="block px-4 py-8">
        <h4 className="font-semibold text-2xl">{t('deleteEvent')}</h4>
        <p>{t('deleteEventConfirmation')}</p>
      </div>
    </Modal>
  );
}
