import IconCourseLaunchpad from '@oe/assets/images/openedu-homepage/icon-course-launchpad.png';
import { Image } from '@oe/ui/components/image';
import { getTranslations } from 'next-intl/server';

interface Feature {
  id: number;
  title: string;
  description: string;
}

export default async function LaunchpadSection() {
  const t = await getTranslations('homePageLayout.launchpadSection');

  const features: Feature[] = [
    {
      id: 1,
      title: t('features.secureFunding.title'),
      description: t('features.secureFunding.description'),
    },
    {
      id: 2,
      title: t('features.empowerEducation.title'),
      description: t('features.empowerEducation.description'),
    },
    {
      id: 3,
      title: t('features.communitySupport.title'),
      description: t('features.communitySupport.description'),
    },
    {
      id: 4,
      title: t('features.marketing.title'),
      description: t('features.marketing.description'),
    },
    {
      id: 5,
      title: t('features.collaboration.title'),
      description: t('features.collaboration.description'),
    },
    {
      id: 6,
      title: t('features.valueSharing.title'),
      description: t('features.valueSharing.description'),
    },
  ];

  return (
    <div className="relative mt-10 w-full rounded-[40px] bg-launchpad-gradient pt-16">
      <div className="-top-14 -translate-x-1/2 absolute left-1/2">
        <Image src={IconCourseLaunchpad.src} alt={t('iconAlt')} width={120} height={120} priority />
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="mt-10 text-center">
          <h1 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-5">{t('title')}</h1>
          <p className="giant-iheading-bold20 md:giant-iheading-bold24 mb-6">{t('subtitle')}</p>
          <h2 className="giant-iheading-semibold20 md:giant-iheading-semibold28 mb-6 text-primary md:mb-10">
            {t('whyTitle')}
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {features.map(feature => (
            <div
              key={feature.id}
              className="flex items-start gap-6 rounded-2xl bg-white/50 p-5 backdrop-blur-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex h-[80px] w-[80px] flex-shrink-0 items-center justify-center rounded-2xl bg-ai-feature-gradient">
                <span className="giant-iheading-bold24 lg:giant-iheading-bold44 text-primary">{feature.id}</span>
              </div>

              <div>
                <h3 className="giant-iheading-bold20 md:giant-iheading-bold24 mb-2">{feature.title}</h3>
                <p className="mcaption-regular16">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
