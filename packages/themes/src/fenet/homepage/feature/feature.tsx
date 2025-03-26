import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
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
      <div className="container space-y-8 lg:flex lg:items-center lg:gap-4">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} variant="secondary" centered={false} />
        <Image
          alt="image"
          height={props?.image?.height ?? 320}
          width={props?.image?.width ?? 480}
          src={props?.image?.url}
          className="h-full w-full max-w-[480px] rounded object-contain"
        />

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

export default FenetHomepageFeature;
