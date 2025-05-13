import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';

import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection, type InfoSectionProps } from '../../_components/info-section';

// Theme step 4: create sectionProps
export interface AieduHomepageHeroProps extends InfoSectionProps {
  banner?: FileType;
  organization1?: FileType;
  organization2?: FileType;
  partner1?: FileType;
  partner2?: FileType;
  partner3?: FileType;
}

//Theme step 7: back to section - hero.tsx, create your code based on the props
const AieduHomepageHero: SectionComponent<'homepage', 'aieduHero'> = ({ className, props }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduHero');
  return (
    <div className={cn('bg-background lg:h-[calc(100vh-var(--header-height))]', className)}>
      <div className="container items-center space-y-8 pt-8 lg:flex lg:h-[calc(100vh-var(--header-height)-160px)] lg:gap-12 lg:pt-12">
        <InfoSection
          title={t('title')}
          description={t('description')}
          button={{ text: t?.('button.text'), link: props?.button?.link }}
          className="flex flex-col justify-center md:basis-1/2 md:px-4"
        />
        <div className="h-full md:flex md:basis-1/2 md:items-center">
          <Image
            alt="banner"
            src={props?.banner?.url}
            width={props?.banner?.width ?? 600}
            height={props?.banner?.height ?? 600}
            className="h-full max-h-[600px] w-full rounded-lg object-contain"
            quality={100}
          />
        </div>
      </div>
      {/* Partners */}
      <div className="bg-primary-foreground">
        <div className="container flex flex-col items-center justify-center gap-6 py-8 lg:h-[160px] lg:flex-row">
          <div className="flex items-center gap-4">
            <p className="hidden whitespace-nowrap font-semibold uppercase md:block">{t('org')}</p>
            <div className="flex gap-4">
              <Image
                src={props?.organization1?.url}
                height={props?.organization1?.height}
                width={props?.organization1?.width}
                alt="organization1"
                className="h-[64px] w-full object-contain"
              />
              <Image
                src={props?.organization2?.url}
                height={props?.organization2?.height}
                width={props?.organization2?.width}
                alt="organization2"
                className="h-[64px] w-full object-contain"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden whitespace-nowrap font-semibold uppercase md:block">{t('partner')}</p>
            <div className="flex h-[64px] gap-4">
              <Image
                src={props?.partner1?.url}
                height={props?.partner1?.height}
                width={props?.partner1?.width}
                alt="partner1"
                noContainer
                className="h-full w-fit object-contain"
              />
              <Image
                src={props?.partner2?.url}
                height={props?.partner2?.height}
                width={props?.partner2?.width}
                alt="partner2"
                className="h-full w-full object-contain"
              />
              <Image
                src={props?.partner3?.url}
                height={props?.partner3?.height}
                width={props?.partner3?.width}
                alt="partner3"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Theme step 22 : export this page
export { AieduHomepageHero };
