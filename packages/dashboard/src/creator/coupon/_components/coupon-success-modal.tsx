import whaleSuccess from '@oe/assets/images/whale-success.png';
import { formatDateTime } from '@oe/core/utils/datetime';
import { Image } from '@oe/ui/components/image';
import { Modal } from '@oe/ui/components/modal';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';

interface IActionsFormModal {
  open: boolean;
  startDate: number;
  endDate: number | null;
  onClose: () => void;
}

export default function CouponSuccessModal({ open = true, onClose, startDate, endDate }: IActionsFormModal) {
  const t = useTranslations('coupon.successModal');

  return (
    <Modal isOpen={open} title="" onClose={onClose} hasCancelButton={false}>
      <div className="m-auto w-[200px]">
        <Image src={whaleSuccess.src} alt="whale Success" objectFit="contain" priority height={200} width={200} />
      </div>
      <div className="block">
        <h4 className="giant-iheading-giant-iheading-semibold16 md:giant-iheading-semibold28 text-center">
          {t('title')}
        </h4>
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
