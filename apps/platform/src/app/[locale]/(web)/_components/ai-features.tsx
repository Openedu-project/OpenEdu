import FeatureBg from '@oe/assets/images/openedu-homepage/ai-features/bg-feature.png';
import IconChat from '@oe/assets/images/openedu-homepage/ai-features/icon-ai-chat.png';
import IconSearchEngine from '@oe/assets/images/openedu-homepage/ai-features/icon-ai-search-engine.png';
import IconTextToCourse from '@oe/assets/images/openedu-homepage/ai-features/icon-text-to-course.png';
import IconTextToImage from '@oe/assets/images/openedu-homepage/ai-features/icon-text-to-image.png';
import IconTextToSlide from '@oe/assets/images/openedu-homepage/ai-features/icon-text-to-slide.png';
import IconTextToVideo from '@oe/assets/images/openedu-homepage/ai-features/icon-text-to-video.png';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import { MoveRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function AIFeatureSection() {
  const t = await getTranslations('homePageLayout.aiFeatureSection');
  const features = [
    {
      icon: IconChat.src,
      title: t('features.aiChat.title'),
      subtitle: t('features.aiChat.subtitle'),
      isCommingSoon: false,
    },
    {
      icon: IconTextToCourse.src,
      title: t('features.textToCourse.title'),
      subtitle: t('features.textToCourse.subtitle'),
      isCommingSoon: false,
    },
    {
      icon: IconTextToSlide.src,
      title: t('features.presentation.title'),
      subtitle: t('features.presentation.subtitle'),
      isCommingSoon: false,
    },
    {
      icon: IconTextToImage.src,
      title: t('features.imageGenerator.title'),
      subtitle: t('features.imageGenerator.subtitle'),
      isCommingSoon: false,
    },
    {
      icon: IconTextToVideo.src,
      title: t('features.slideToVideo.title'),
      subtitle: t('features.slideToVideo.subtitle'),
      isCommingSoon: true,
    },
    {
      icon: IconSearchEngine.src,
      title: t('features.searchEngine.title'),
      subtitle: t('features.searchEngine.subtitle'),
      isCommingSoon: true,
    },
  ];
  return (
    <section className="py-5 lg:py-10">
      <div className="container mx-auto px-0 md:px-4">
        <div className="mb-3 text-center lg:mb-6">
          <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-4">{t('title')}</h2>
          <div className="mcaption-regular16 lg:mcaption-regular24 flex items-center gap-1 text-center">
            <p className="mx-auto">
              {t('description')}
              <Link
                href={AI_ROUTES.chat}
                className="mcaption-regular16 lg:mcaption-bold24 mb-6 ml-1 inline-flex gap-1 p-0 lg:mb-10"
              >
                {t('discoverNow')}
                <MoveRight />
              </Link>
            </p>
          </div>
        </div>

        <div className="relative flex flex-wrap justify-center gap-4 lg:gap-8">
          <div className="-z-10 absolute hidden w-full lg:block">
            <Image src={FeatureBg.src} alt="Background" fill containerHeight={450} className="w-full object-contain" />
          </div>
          {features.map(feature => (
            <div
              key={feature.icon}
              className="group relative flex w-full cursor-pointer flex-col items-start gap-4 overflow-hidden rounded-[40px] p-6 backdrop-blur-sm md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
            >
              {/* Gradient border background */}
              <div className="absolute inset-0 rounded-[40px] bg-[linear-gradient(254.89deg,#B8F4F8_6.18%,#EDE3FE_70.53%)]" />

              {/* White background with slightly smaller radius */}
              <div className="absolute inset-[4px] rounded-[36px] bg-white" />

              {/* Content - now relative to appear above the backgrounds */}
              <div className="relative h-[40px] w-[40px] shrink-0 rounded-full bg-white p-1 md:h-16 md:w-16">
                <div className="h-[40px] w-[40px] rounded-full bg-ai-feature-gradient p-2 md:h-16 md:w-16">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={40}
                    height={40}
                    priority
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="relative flex-1">
                <p className="mcaption-semibold14 md:mcaption-semibold20 mb-1">{feature.title}</p>
                <h3 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-2">
                  {feature.subtitle}
                </h3>
              </div>
              {feature.isCommingSoon && (
                <div className="mcaption-regular10 absolute top-6 right-6 z-10 rounded-3xl border border-primary bg-primary-20 p-2 text-center text-primary">
                  {t('comingSoon')}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className=" mx-auto mt-4 w-full rounded-[40px] bg-[linear-gradient(180deg,#FBFBFF_0%,rgba(202,202,255,0)_100%)] p-6 text-center sm:w-[350px] lg:mt-8">
          <Link
            href={AI_ROUTES.chat}
            className="giant-iheading-semibold20 md:giant-iheading-semibold24 justify-center text-center text-center text-foreground hover:no-underline"
          >
            {t('andMore')}
          </Link>
        </div>
      </div>
    </section>
  );
}
