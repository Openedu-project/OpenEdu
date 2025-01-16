import FeatureBg from '@oe/assets/images/openedu-homepage/features/bg-feature.png';
import IconChat from '@oe/assets/images/openedu-homepage/features/icon-ai-chat.png';
import IconGenerator from '@oe/assets/images/openedu-homepage/features/icon-ai-generator.png';
import IconRewrite from '@oe/assets/images/openedu-homepage/features/icon-ai-rewrite.png';
import IconAffiliate from '@oe/assets/images/openedu-homepage/features/icon-course-affiliate.png';
import IconFunding from '@oe/assets/images/openedu-homepage/features/icon-course-launchpad.png';
import { Image } from '@oe/ui/components/image';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import HighlightTitle from './commons/highlight-title';

export default function FeatureSection() {
  const t = useTranslations('homePageLayout.featureSection');
  const features = useMemo(
    () => [
      {
        icon: IconGenerator.src,
        title: t('features.aiGenerator.title'),
        subtitle: t('features.aiGenerator.subtitle'),
      },
      {
        icon: IconChat.src,
        title: t('features.aiChat.title'),
        subtitle: t('features.aiChat.subtitle'),
      },
      {
        icon: IconRewrite.src,
        title: t('features.aiRewrite.title'),
        subtitle: t('features.aiRewrite.subtitle'),
      },
      {
        icon: IconFunding.src,
        title: t('features.courseFunding.title'),
        subtitle: t('features.courseFunding.subtitle'),
      },
      {
        icon: IconAffiliate.src,
        title: t('features.courseAffiliate.title'),
        subtitle: t('features.courseAffiliate.subtitle'),
      },
    ],
    [t]
  );
  return (
    <section className="py-5 lg:py-10">
      {/* Background */}

      <div className="container mx-auto px-0 md:px-4">
        <div className="mb-3 text-center lg:mb-6">
          <HighlightTitle text={t('highlight')} className="mb-1 justify-center" />
          <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-6">{t('title')}</h2>
          <p className="mcaption-regular16 lg:mcaption-regular24 mx-auto max-w-4xl">{t('description')}</p>
        </div>

        <div className="relative flex flex-wrap justify-center gap-8">
          <div className="-z-10 absolute w-full">
            <Image src={FeatureBg.src} alt="Background" fill containerHeight={450} className="w-full object-contain" />
          </div>
          {features.map(feature => (
            <div
              key={feature.icon}
              className="group relative flex w-full cursor-pointer flex-col items-start gap-4 rounded-[40px] border-[4px] border-white bg-gradient-to-b from-25% from-white to-[rgba(242,241,255,0.30)] p-6 backdrop-blur md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
            >
              <div className="h-10 w-10 flex-shrink-0 rounded-full md:h-16 md:w-16">
                <Image src={feature.icon} alt={feature.title} width={64} height={64} />
              </div>
              <div className="flex-1">
                <p className="mcaption-semibold14 md:mcaption-semibold20 mb-1">{feature.title}</p>
                <h3 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-2">
                  {feature.subtitle}
                </h3>
              </div>
              <ArrowRight className="absolute top-6 right-6 h-6 w-6 text-primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
