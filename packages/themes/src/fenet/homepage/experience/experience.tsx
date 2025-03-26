import { cn } from '@oe/ui/utils/cn';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { SectionTitle, type SectionTitleProps } from '../_components/section-title';

export interface FenetHomepageExperienceProps extends SectionTitleProps {
  image?: FileType;
}

const FenetHomepageExperience: SectionComponent<'homepage', 'fenetExperience'> = ({ props, className }) => {
  const t = useTranslations('themePage.fenet.homepage.fenetExperience');

  return (
    <div className={cn('bg-accent py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <SectionTitle title={t('title')} />
        <Image
          alt="image"
          height={props?.image?.height ?? 320}
          width={props?.image?.width ?? 480}
          src={props?.image?.url}
          className="h-full w-full rounded object-contain"
        />
      </div>
    </div>
  );
};

export default FenetHomepageExperience;
