import WhaleKnowledge from '@oe/assets/images/whale-teacher.png';
import { Root as VisuallyHiddenRoot } from '@radix-ui/react-visually-hidden';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { DialogContent, DialogTitle } from '#shadcn/dialog';

const NotCreator = () => {
  const t = useTranslations('launchpadHomepage.launchpadDialog.noCreator');
  return (
    <DialogContent className="!rounded-3xl gap-0 p-6">
      <VisuallyHiddenRoot>
        <DialogTitle />
      </VisuallyHiddenRoot>
      <div className="space-y-6">
        <img src={WhaleKnowledge.src} alt="Whale Knowledge" width={240} height={240} className="mx-auto mb-6" />
        <h2 className="mb-4 text-center font-semibold text-[28px] leading-[125%]">{t('title')}</h2>
        <div className="mb-8">
          <p className="mb-2 text-left font-inter font-normal text-[16px] text-neutral-strong-900 leading-[125%]">
            {t('desc')}
          </p>
          <ul className="list-disc space-y-0.5 pl-6 text-left">
            <li className="font-inter font-normal text-base text-neutral-strong-900 leading-[125%]">
              {t('list.listOne')}
            </li>
            <li className="font-inter font-normal text-base text-neutral-strong-900 leading-[125%]">
              {t('list.listTwo')}
            </li>
            <li className="font-inter font-normal text-base text-neutral-strong-900 leading-[125%]">
              {t('list.listThree')}
            </li>
            <li className="font-inter font-normal text-base text-neutral-strong-900 leading-[125%]">
              {t('list.listFour')}
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <Link
            href="/register-creator"
            className="block h-fit w-full rounded-lg bg-primary py-4 text-center font-inter font-semibold text-[16px] text-white leading-[125%] no-underline"
          >
            {t('btnRegister')}
          </Link>
          {/* <Button
            variant="outline"
            className="block h-fit w-full rounded-lg border border-primary py-4 text-center font-inter font-semibold text-[16px] text-primary leading-[125%]"
          >
            Cancel
          </Button> */}
        </div>
      </div>
    </DialogContent>
  );
};

export { NotCreator };
