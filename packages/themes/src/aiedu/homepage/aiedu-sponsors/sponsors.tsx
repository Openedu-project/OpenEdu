import { type FileType, Image, cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { AieduLayoutSection } from '../../_components/layout-section';
import { Title, type TitleProps } from '../../_components/title';

export interface AieduHomepageSponsorsProps extends TitleProps {
  sponsorLabel?: string;
  sponsorImages?: FileType[];
  mediaLabel?: string;
  mediaImages?: FileType[];
}

const AieduHomepageSponsors: SectionComponent<'homepage', 'aieduSponsors'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduSponsors');

  return (
    <AieduLayoutSection className={cn('', className)} background="bg-primary-foreground">
      <Title title={t('title')} className="mb-8 text-center" />
      <div className="mb-4 flex flex-wrap">
        {/* Blue box on the left */}
        <div className="mb-2 w-full sm:mb-0 sm:w-1/4">
          <div className="flex h-full items-center justify-center rounded-lg bg-primary p-8 text-background sm:mr-2">
            <h3 className="text-center font-medium text-2xl">{t('sponsorLabel')}</h3>
          </div>
        </div>

        {/* Sponsors grid */}
        <div className="w-full sm:w-3/4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {props?.sponsorImages?.map((sponsor, index) => (
              <div
                key={index.toString()}
                className="flex h-16 items-center justify-center rounded-lg bg-card p-2 shadow-sm transition-shadow hover:shadow-md md:h-20"
              >
                <Image
                  alt="logo"
                  src={sponsor?.url}
                  width={sponsor?.width ?? 24}
                  height={sponsor?.height ?? 24}
                  className="h-12 w-full object-cover md:h-16"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {/* Blue box on the left */}
        <div className="mb-2 w-full sm:mb-0 sm:w-1/4">
          <div className="flex h-full items-center justify-center rounded-lg bg-primary p-8 text-background sm:mr-2">
            <h3 className="text-center font-medium text-2xl">{t('mediaLabel')}</h3>
          </div>
        </div>

        {/* Media grid */}
        <div className="w-full sm:w-3/4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {props?.mediaImages?.map((media, index) => (
              <div
                key={index.toString()}
                className="flex h-16 items-center justify-center rounded-lg bg-card p-2 shadow-sm transition-shadow hover:shadow-md md:h-20"
              >
                <Image
                  alt="logo"
                  src={media?.url}
                  width={media?.width ?? 24}
                  height={media?.height ?? 24}
                  className="h-12 w-full object-cover md:h-16"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AieduLayoutSection>
  );
};

export { AieduHomepageSponsors };
