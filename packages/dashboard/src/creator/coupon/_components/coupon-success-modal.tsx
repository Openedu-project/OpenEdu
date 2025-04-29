import whaleSuccess from '@oe/assets/images/whale-success.png';
import { formatDateTime } from '@oe/core';
import { Button } from '@oe/ui';
import { Image } from '@oe/ui';
import { Modal } from '@oe/ui';
import { useTranslations } from 'next-intl';

interface IActionsFormModal {
  open: boolean;
  startDate: number;
  endDate: number | null;
  onClose: () => void;
}

export function CouponSuccessModal({ open = true, onClose, startDate, endDate }: IActionsFormModal) {
  const t = useTranslations('coupon.successModal');

  return (
    <Modal open={open} title="" onClose={onClose} hasCancelButton={false}>
      <div className="m-auto w-[200px]">
        <Image src={whaleSuccess.src} alt="whale Success" objectFit="contain" priority height={200} width={200} />
      </div>
      <div className="block">
        <h4 className="giant-iheading-semibold16 md:giant-iheading-semibold28 text-center">{t('title')}</h4>
        <p className="text-center">
          {endDate
            ? t.rich('descWithEndTime', {
                startDate: formatDateTime(startDate),
                endDate: formatDateTime(endDate),
              })
            : t.rich('descWithoutEndTime', {
                startDate: formatDateTime(startDate),
              })}
        </p>
        <Button onClick={onClose} className="mt-6 w-full">
          {t('backToCouponList')}
        </Button>
      </div>
    </Modal>
  );
}
