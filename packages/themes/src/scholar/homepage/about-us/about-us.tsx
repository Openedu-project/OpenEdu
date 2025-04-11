import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types';
import { FeatureItem, type FeatureItemProps, StatItem, type StatItemProps } from '../_components/about-us-component';
import { SectionHeader, type SectionHeaderProps } from '../_components/section-header';

export interface ScholarHomepageAboutUsProps extends SectionHeaderProps {
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

const ScholarHomepageAboutUs: SectionComponent<'homepage', 'scholarAboutUs'> = ({ props, className }) => {
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
    <section className={cn('py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8 md:space-y-12">
        {/* Main Content */}
        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <SectionHeader
              title={t('title')}
              subtitle={t('subtitle')}
              description={t('description')}
              centered={false}
            />

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

export { ScholarHomepageAboutUs };
