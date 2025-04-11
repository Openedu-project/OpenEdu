import coreValue from '@oe/assets/images/theme/core-value.png';
import map from '@oe/assets/images/theme/map-2.png';

import { Image } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection, type InfoSectionProps } from '../../_components/info-section';

export interface VbiAboutUsCoreProps extends InfoSectionProps {}

const VbiAboutUsCore: SectionComponent<'about-us', 'vbiCore'> = ({ className }) => {
  const t = useTranslations('themePage.vbi.about-us.vbiCore');

  return (
    <div className={cn('relative h-full bg-white/80', className)}>
      <div className="container relative flex h-full flex-col items-center justify-between px-4 py-14 py-8 md:flex-row md:p-8 md:py-12 lg:px-12">
        <InfoSection
          title={t('title')}
          titleSub={t('titleSub')}
          button={undefined}
          className="z-10 mb-6 max-w-[500px] basis-1/1 md:basis-1/2 lg:mb-0 lg:w-1/2"
        />
        <div className="z-10 flex h-full w-full basis-1/2 justify-center sm:w-2/3 md:w-1/2 md:basis-1/2">
          <Image
            src={coreValue?.src}
            alt="coreValue"
            className="h-full w-full object-contain"
            // fill
            // noContainer
            height={coreValue?.height}
            width={coreValue?.width}
          />
        </div>
      </div>
      <div className="-z-8 absolute top-0 left-0 h-full w-full">
        <Image src={map?.src} alt="map" className="h-full w-full object-contain" fill noContainer />
      </div>
    </div>
  );
};

export { VbiAboutUsCore };
