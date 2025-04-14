import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';

import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection, type InfoSectionProps } from '../../../vbi/_components/info-section';
export interface AvailHomepageHeroProps extends InfoSectionProps {
  banner?: FileType;
}

const AvailHomepageHero: SectionComponent<'homepage', 'availHero'> = ({ className, props }) => {
  const t = useTranslations('themePage.avail.homepage.availHero');
  return (
    <div className={cn('bg-accent py-8 md:py-12', className)}>
      <div className="container space-y-4 md:space-y-8">
        <InfoSection
          title={t('title')}
          titleSub={t('titleSub')}
          button={undefined}
          className="mx-auto my-0 flex max-w-[900px] flex-col items-center text-center md:px-4"
        />
        <Image
          alt="banner"
          src={props?.banner?.url}
          width={props?.banner?.width ?? 1127}
          height={props?.banner?.height ?? 530}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export { AvailHomepageHero };
