import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import { FeatureStat, type FeatureStatProps } from '../_components/feature-stat';
import { SectionTitle, type SectionTitleProps } from '../_components/section-title';

export interface FenetHomepageFeatureProps extends SectionTitleProps {
  image?: FileType;
  feature1: FeatureStatProps;
  feature2: FeatureStatProps;
  feature3: FeatureStatProps;
  feature4: FeatureStatProps;
}

const FenetHomepageFeature: SectionComponent<'homepage', 'fenetFeature'> = ({ className, props }) => {
  const t = useTranslations('themePage.fenet.homepage.fenetFeature');

  const features = [props?.feature1, props?.feature2, props?.feature3, props?.feature4]?.filter(Boolean);

  return (
    <div className={cn('bg-primary py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8 lg:flex lg:items-center lg:gap-8">
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          variant="secondary"
          centered={false}
          className="max-w-[430px]"
        />
        <div className="max-w-[320px]">
          <Image
            alt="image"
            height={props?.image?.height ?? 480}
            width={props?.image?.width ?? 320}
            src={props?.image?.url}
            className="h-full w-full max-w-[320px] rounded object-contain"
          />
        </div>

        <div className="space-y-2">
          {features?.map((f, index) => (
            <FeatureStat
              key={f?.title ?? index}
              title={f?.title ?? ''}
              description={f?.description}
              borderBottom={(features?.length ?? 0) !== index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { FenetHomepageFeature };
