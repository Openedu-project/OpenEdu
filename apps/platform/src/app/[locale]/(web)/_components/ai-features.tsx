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
      title: t('features.textToSlide.title'),
      subtitle: t('features.textToSlide.subtitle'),
      isCommingSoon: false,
    },
    {
      icon: IconTextToImage.src,
      title: t('features.textToImage.title'),
      subtitle: t('features.textToImage.subtitle'),
      isCommingSoon: true,
    },
    {
      icon: IconTextToVideo.src,
      title: t('features.textToVideo.title'),
      subtitle: t('features.textToVideo.subtitle'),
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
                href={AI_ROUTES.assistant}
                className="mcaption-regular16 lg:mcaption-regular24 mb-6 ml-1 inline-flex gap-1 p-0 lg:mb-10"
              >
                {t('discoverNow')}
                <MoveRight />
              </Link>
            </p>
          </div>
        </div>

        <div className="relative flex flex-wrap justify-center gap-8">
          <div className="-z-10 absolute w-full">
            <Image src={FeatureBg.src} alt="Background" fill containerHeight={450} className="w-full object-contain" />
          </div>
          {features.map(feature => (
            <div
              key={feature.icon}
              className="group relative flex w-full cursor-pointer flex-col items-start gap-4 rounded-[40px] border-[4px] border-white bg-gradient-to-b from-25% from-white to-100% to-[rgba(242,241,255,0.30)] p-6 backdrop-blur md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
            >
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white p-1 md:h-16 md:w-16">
                <div className="h-[40px] w-[40px] rounded-full bg-ai-feature-gradient p-2">
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
              <div className="flex-1">
                <p className="mcaption-semibold14 md:mcaption-semibold20 mb-1">{feature.title}</p>
                <h3 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-2">
                  {feature.subtitle}
                </h3>
              </div>
              {feature.isCommingSoon && (
                <div className="mcaption-regular10 absolute top-6 right-6 rounded-3xl border border-primary bg-[#F2F1FF] p-2 text-center text-primary">
                  {t('comingSoon')}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="giant-iheading-semibold20 md:giant-iheading-semibold24 mx-auto mt-8 w-[350px] rounded-[40px] border-[4px] border-white bg-gradient-to-b from-25% from-white to-100% to-[rgba(242,241,255,0.30)] p-6 text-center">
          {t('andMore')}
        </div>
      </div>
    </section>
  );
}
