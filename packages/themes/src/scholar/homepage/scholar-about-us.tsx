import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { cn } from '@oe/ui/utils/cn';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../_types/theme-page';
import { FeatureItem, type FeatureItemProps, StatItem, type StatItemProps } from './_components/about-us-component';

export interface ScholarHomepageAboutUsProps {
  titleSection?: string;
  titleMain?: string;
  titleSub?: string;
  image?: FileType;
  features?: {
    feature1: FeatureItemProps;
    feature2: FeatureItemProps;
    feature3: FeatureItemProps;
  };
  stats: {
    stat1: StatItemProps;
    stat2: StatItemProps;
    stat3: StatItemProps;
    stat4: StatItemProps;
  };
}

const ScholarAboutUsPage: SectionComponent<'homepage', 'scholarAboutUs'> = ({ props, className }) => {
  const t = useTranslations('themePage.scholar.homepage.scholarAboutUs');

  const features = [
    {
      title: t('features.feature1.title'),
      description: t('features.feature1.description'),
    },
    {
      title: t('features.feature2.title'),
      description: t('features.feature2.description'),
    },
    {
      title: t('features.feature3.title'),
      description: t('features.feature2.description'),
    },
  ];

  const stats = [
    { value: props?.stats?.stat1?.value, label: t('stats.stat1.label') },
    { value: props?.stats?.stat2?.value, label: t('stats.stat2.label') },
    { value: props?.stats?.stat3?.value, label: t('stats.stat3.label') },
    { value: props?.stats?.stat4?.value, label: t('stats.stat4.label') },
  ];

  return (
    <section className={cn('py-16', className)}>
      <div className="container mx-auto max-w-7xl px-4">
        {/* Main Content */}
        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 font-semibold text-lg text-primary uppercase">{t('titleSection')}</h2>
              <h1 className="mb-4 font-bold text-4xl text-foreground/80">{t('titleMain')}</h1>
              <p className="text-gray-600">{t('titleSub')}</p>
            </div>

            {/* Features List */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <FeatureItem key={index.toString()} title={feature.title} description={feature.description} />
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <Image
            src={props?.image?.url}
            alt="Team collaboration"
            priority
            height={props?.image?.height}
            width={props?.image?.width}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatItem key={index.toString()} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarAboutUsPage;
