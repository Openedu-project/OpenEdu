import ReferralImage from '@oe/assets/images/openedu-homepage/banner-referral.png';
import ReferralBackground from '@oe/assets/images/openedu-homepage/bg-referral.png';
import { Image } from '@oe/ui/components/image';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';

export default function ReferralProgramSection() {
  const t = useTranslations('homePageLayout.referralProgramSection');

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 hidden h-full w-full lg:flex">
        <Image
          src={ReferralBackground.src}
          alt="background"
          containerHeight={420}
          fill
          className="w-full object-contain"
          priority
        />
      </div>

      <div className="container relative mx-auto px-0 py-5 md:px-4 md:py-10">
        <div className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative mx-auto flex w-full max-w-[350px]">
              <Image src={ReferralImage.src} alt="Referral Gift" height={352} width={322} className="object-contain" />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 font-bold leading-tight">
              {t('title')}
            </h2>

            <p className="mcaption-regular16 md:mcaption-regular24">{t('description')}</p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button className="px-8 py-3">{t('buttons.explore')}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
