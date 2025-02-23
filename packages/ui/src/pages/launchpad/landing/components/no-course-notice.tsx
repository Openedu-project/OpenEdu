import WhaleNotFound from '@oe/assets/images/whale-not-found.png';
import { Root as VisuallyHiddenRoot } from '@radix-ui/react-visually-hidden';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { DialogContent, DialogTitle } from '#shadcn/dialog';

const NoCourseNotice = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const t = useTranslations('launchpadHomepage.launchpadDialog.noCourse');

  return (
    <DialogContent className="!rounded-3xl gap-0 p-6">
      <VisuallyHiddenRoot>
        <DialogTitle />
      </VisuallyHiddenRoot>
      <div className="space-y-6">
        <img src={WhaleNotFound.src} alt="Whale Knowledge" width={240} height={240} className="mx-auto mb-6" />
        <h2 className="mb-4 text-center font-semibold text-[28px] leading-[125%]">{t('title')}</h2>
        <div className="mb-8">
          <p className="mb-2 text-left font-inter font-normal text-[16px] text-neutral-strong-900 leading-[125%]">
            {t('desc')}
          </p>
        </div>
        <div className="space-y-3">
          <Link
            href="/creator/courses"
            className="block h-fit w-full rounded-lg bg-primary py-4 text-center font-inter font-semibold text-[16px] text-white leading-[125%] no-underline"
          >
            {t('btnCreate')}
          </Link>
          <Button
            variant="outline"
            className="block h-fit w-full rounded-lg border border-primary py-4 text-center font-inter font-semibold text-[16px] text-primary leading-[125%]"
            onClick={() => setIsOpen(false)}
          >
            {t('btnCancel')}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default NoCourseNotice;
