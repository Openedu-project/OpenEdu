import WhaleClaimSuccess from '@oe/assets/images/whale/whale-point-success.png';
import { useTranslations } from 'next-intl';
import { Image } from '#components/image';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';

export function InviteReferralInviteSuccessModal({
  open,
  point = 0,
  onClose,
}: {
  open: boolean;
  point: number;
  onClose: () => void;
}) {
  const t = useTranslations('referralProgram.inviteFriend.successModal');

  return (
    <Modal title="" open={open} onClose={onClose} hasCancelButton={false} className="pb-5" hasCloseIcon={false}>
      <div className="mt-4 mb-6 flex flex-col">
        <Image src={WhaleClaimSuccess} alt="whale claim success" priority quality={100} aspectRatio="1:1" />
      </div>
      <div className="mb-4 flex flex-col gap-3 text-center md:gap-6">
        <h2 className="giant-iheading-semibold20 md:giant-iheading-semibold28 mb-0 px-3 md:px-10">
          {t('title', {
            point,
          })}
        </h2>
        <p>{t('description')}</p>

        <Button onClick={onClose}>{t('closeButton')}</Button>
      </div>
    </Modal>
  );
}
