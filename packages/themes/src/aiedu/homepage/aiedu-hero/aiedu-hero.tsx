import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';

import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection, type InfoSectionProps } from '../../_components/info-section';

// Theme step 4: create sectionProps
export interface AieduHomepageHeroProps extends InfoSectionProps {
  banner?: FileType;
  partners?: FileType[];
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
          />
        </div>
      </div>
      {/* Partners */}
      <div className="bg-primary-foreground">
        <div className="container flex flex-wrap items-center justify-center gap-y-4 py-8 md:gap-x-[2%] md:gap-y-6 lg:h-[160px]">
          {props?.partners?.map((file, index) => (
            <div className="mx-0 h-[44px] w-[50%] sm:w-[33%] md:mx-0 md:w-[12%]" key={index.toString()}>
              <Image
                src={file?.url}
                height={file?.height}
                width={file?.width}
                alt="partners"
                className="h-[40px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// Theme step 22 : export this page
export { AieduHomepageHero };
