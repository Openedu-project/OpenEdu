import WhaleSuccess from '@oe/assets/images/whale-success.png';
import { Root as VisuallyHiddenRoot } from '@radix-ui/react-visually-hidden';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '#shadcn/dialog';

const SuccessDialog = ({
  isOpen,
  onClose,
  launchpadId,
}: {
  isOpen: boolean;
  onClose: () => void;
  launchpadId: string;
}) => {
  const t = useTranslations('launchpadDetailPage.pledgePage.successDialog');
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!rounded-3xl gap-0 p-6">
        <DialogHeader>
          <VisuallyHiddenRoot>
            <DialogTitle />
          </VisuallyHiddenRoot>
        </DialogHeader>
        <div className="space-y-6">
          <img src={WhaleSuccess.src} alt="Whale Knowledge" width={240} height={240} className="mx-auto mb-6" />
          <h2 className="mb-4 text-center font-semibold text-[28px] leading-[125%]">{t('title')}</h2>
          <p className="mb-8 text-center">{t('desc')}</p>
          <div className="space-y-3">
            <Link
              href={`/launchpad/${launchpadId}`}
              className="!text-white block h-fit w-full rounded-lg bg-primary py-4 text-center font-inter font-semibold text-[16px] leading-[125%] no-underline"
            >
              {t('btnGoToLaunchpad')}
            </Link>
            <Link
              href="/launchpad/list"
              variant="outline"
              className="block h-fit w-full rounded-lg border border-primary py-4 text-center font-inter font-semibold text-[16px] text-primary leading-[125%]"
            >
              {t('btnViewLaunchpadList')}
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
