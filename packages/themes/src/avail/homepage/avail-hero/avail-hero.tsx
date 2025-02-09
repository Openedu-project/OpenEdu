import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';

import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection, type InfoSectionProps } from '../../../vbi/_components/info-section';
export interface AvailHomepageHeroProps extends InfoSectionProps {
  banner?: FileType;
}

const AvailHomepageHero: SectionComponent<'homepage', 'availHero'> = ({ className, props }) => {
  const t = useTranslations('themePage.avail.homepage.availHero');
  return (
    <div className={cn('space-y-4 bg-accent p-4 md:space-y-8 md:p-8 lg:min-h-[80vh] lg:p-12', className)}>
      <InfoSection
        title={t('title')}
        titleSub={t('titleSub')}
        button={undefined}
        className="flex flex-col items-center text-center"
      />
      <Image
        alt="banner"
        src={props?.banner?.url}
        width={props?.banner?.width ?? 1127}
        height={props?.banner?.height ?? 530}
        className="rounded-lg object-cover"
      />
    </div>
  );
};

export default AvailHomepageHero;
