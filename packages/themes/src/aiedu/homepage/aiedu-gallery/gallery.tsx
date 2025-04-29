import { type FileType, Image, cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { AieduLayoutSection } from '../../_components/layout-section';
import { Title, type TitleProps } from '../../_components/title';

export interface AieduHomepageGalleryProps extends TitleProps {
  image?: FileType;
}

const AieduHomepageGallery: SectionComponent<'homepage', 'aieduGallery'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduGallery');

  return (
    <AieduLayoutSection className={cn('space-y-6', className)}>
      <Title title={t('title')} className="text-center" />
      <Image
        alt="image"
        src={props?.image?.url}
        width={props?.image?.width ?? 673}
        height={props?.image?.height ?? 378}
        className="h-[80vh] w-full rounded-lg object-contain"
      />
    </AieduLayoutSection>
  );
};

export { AieduHomepageGallery };
