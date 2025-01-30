import BannerJouney from '@oe/assets/images/openedu-homepage/banner-journey.png';
import { Image } from '@oe/ui/components/image';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('homePageLayout.ctaSection');

  return (
    <div className="flex flex-col items-center gap-8 py-5 lg:flex-row lg:py-10">
      <div className="] relative w-full overflow-hidden rounded-[40px] border-4 border-white bg-gradient-to-l from-25% from-white via-[#F2F1FF]/30 to-[#F2F1FF]/30 p-4 backdrop-blur-[2px] md:p-12 lg:w-1/2">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 max-w-[80%]">
          {t('title')}
        </h2>
        <p className="mcaption-regular16 lg:mcaption-regular24 max-w-xl">{t('description')}</p>
        <div className="mt-8">
          <Button>{t('buttons.start')}</Button>
        </div>
      </div>
      <div className="relative w-full lg:w-1/2">
        <div className="relative mx-auto w-full max-w-[600px]">
          <div className="relative w-full">
            <Image
              src={BannerJouney.src}
              alt="CTA banner"
              width={554}
              height={582}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
