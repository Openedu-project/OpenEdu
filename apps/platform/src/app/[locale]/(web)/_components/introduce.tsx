import IntroBackground from '@oe/assets/images/openedu-homepage/bg-introduce.png';
import WhaleIcon from '@oe/assets/images/openedu-homepage/whale-homepage.png';
import { Image } from '@oe/ui/components/image';
import { useTranslations } from 'next-intl';
import HighlightTitle from './commons/highlight-title';

export default function IntroductionSection() {
  const t = useTranslations('homePageLayout.introductionSection');

  return (
    <div className="relative w-full overflow-hidden py-5 lg:py-10">
      <div className="relative mx-auto w-full md:px-4">
        <div className="-mb-12 sm:-mb-14 md:-mb-16 lg:-mb-20 relative z-10 mx-auto h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36">
          <Image
            src={WhaleIcon.src}
            alt="OpenEdu Whale"
            width={144}
            height={144}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="relative px-4">
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={IntroBackground.src}
              alt="Background"
              fill
              containerHeight={350}
              className="h-full w-full rounded-3xl object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative pt-8 pb-12 text-center sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24">
            <HighlightTitle text={t('highlight')} className="mb-1 justify-center" />

            <h2 className="mb-4 font-bold text-xl sm:mb-5 sm:text-2xl md:mb-6 md:text-3xl">{t('title')}</h2>

            <p className="mcaption-regular16 lg:mcaption-regular24 mx-auto max-w-full leading-relaxed sm:max-w-[95%] md:max-w-[90%] lg:max-w-[85%] ">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
