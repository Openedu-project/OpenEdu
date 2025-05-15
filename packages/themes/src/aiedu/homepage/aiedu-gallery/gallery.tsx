import { type FileType, Image, cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { AieduLayoutSection } from '../../_components/layout-section';
import { Title, type TitleProps } from '../../_components/title';

export interface AieduHomepageGalleryProps extends TitleProps {
  image1?: FileType;
  image2?: FileType;
  image3?: FileType;
  image4?: FileType;
  image5?: FileType;
  image6?: FileType;
  image7?: FileType;
  image8?: FileType;
}

const AieduHomepageGallery: SectionComponent<'homepage', 'aieduGallery'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduGallery');

  return (
    <AieduLayoutSection className={cn('space-y-6', className)}>
      <Title title={t('title')} className="text-center" />
      <div className="grid-col-1 mb-4 grid gap-4 lg:grid-cols-5">
        <Image
          alt="image"
          src={props?.image1?.url}
          width={props?.image1?.width ?? 240}
          height={props?.image1?.height ?? 240}
          className="max-h-[240px] w-full rounded-3xl object-cover transition-all duration-300 hover:scale-105"
        />
        <Image
          alt="image"
          src={props?.image2?.url}
          width={props?.image2?.width ?? 240}
          height={props?.image2?.height ?? 240}
          className="max-h-[240px] w-full rounded-3xl object-cover transition-all duration-300 hover:scale-105"
        />
        <Image
          alt="image"
          src={props?.image3?.url}
          width={props?.image3?.width ?? 240}
          height={props?.image3?.height ?? 240}
          className="max-h-[240px] w-full rounded-3xl object-cover transition-all duration-300 hover:scale-105"
        />
        <Image
          alt="image"
          src={props?.image4?.url}
          width={props?.image4?.width ?? 240}
          height={props?.image4?.height ?? 240}
          className="max-h-[240px] w-full rounded-3xl object-cover transition-all duration-300 hover:scale-105"
        />
        <Image
          alt="image"
          src={props?.image5?.url}
          width={props?.image5?.width ?? 240}
          height={props?.image5?.height ?? 240}
          className="max-h-[240px] w-full rounded-3xl object-cover transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="grid-col-1 mb-4 grid gap-4 lg:grid-cols-2">
        <Image
          alt="image"
          src={props?.image6?.url}
          width={props?.image6?.width ?? 630}
          height={props?.image6?.height ?? 280}
          className="max-h-[280px] w-full rounded-3xl object-cover transition-all duration-300 hover:scale-105"
        />
        <Image
          alt="image"
          src={props?.image7?.url}
          width={props?.image7?.width ?? 630}
          height={props?.image7?.height ?? 280}
          className="max-h-[280px] w-full rounded-3xl object-cover transition-all duration-300 hover:scale-105"
        />
      </div>
      <div>
        <Image
          alt="image"
          src={props?.image8?.url}
          width={props?.image8?.width ?? 1280}
          height={props?.image8?.height ?? 520}
          className="max-h-[520px] w-full rounded-3xl object-cover transition-all duration-300 hover:scale-105"
          quality={100}
        />
      </div>
    </AieduLayoutSection>
  );
};

export { AieduHomepageGallery };
