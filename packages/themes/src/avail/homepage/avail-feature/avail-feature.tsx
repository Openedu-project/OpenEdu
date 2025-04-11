import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';

import type { FileType } from '@oe/ui';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection, type InfoSectionProps } from '../../../vbi/_components/info-section';
import { FeatureCard, type FeatureCardProps } from '../_components/feature-card';

export interface AvailHomepageFeatureProps extends InfoSectionProps {
  banner?: FileType;
  features?: {
    da: FeatureCardProps;
    nexus: FeatureCardProps;
    fusion: FeatureCardProps;
  };
}

const AvailHomepageFeature: SectionComponent<'homepage', 'availFeature'> = ({ className, props }) => {
  const t = useTranslations('themePage.avail.homepage.availFeature');

  return (
    <div className={cn('bg-accent/80 p-4 md:p-8 lg:p-12', className)}>
      <div className="container space-y-4 md:space-y-8">
        <InfoSection
          title={t('title')}
          titleSub={t('titleSub')}
          button={undefined}
          className="flex flex-col items-center text-center max-w-[900px] my-0 mx-auto"
        />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
          {props?.features &&
            Object.entries(props?.features)?.map(([key, value]) => {
              return (
                <FeatureCard
                  key={key}
                  image={value?.image}
                  textImg={value?.textImg}
                  description={t(`features.${key}.description`)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export { AvailHomepageFeature };
