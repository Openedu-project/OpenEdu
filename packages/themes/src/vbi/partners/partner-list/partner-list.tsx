import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection, type InfoSectionProps } from '../../_components/info-section';
import { PartnerCard, type PartnerCardProps } from '../_components/partner-card';

export interface VbiPartnersListProps extends InfoSectionProps {
  labelFoundation?: string;
  labelEntrepreneur?: string;
  labelUniversity?: string;
  foundation?: PartnerCardProps[];
  entrepreneur?: PartnerCardProps[];
  university?: PartnerCardProps[];
}

const VbiPartnersList: SectionComponent<'partners', 'vbiPartnerList'> = ({ props, className }) => {
  const t = useTranslations('themePage.vbi.partners.vbiPartnerList');

  return (
    <div className={cn('space-y-4 bg-muted p-4 md:space-y-8 md:p-8 lg:p-12', className)}>
      <InfoSection
        title={t('title')}
        titleSub={t('titleSub')}
        button={undefined}
        className="flex flex-col items-center text-center"
      />
      <div className="space-y-2 md:space-y-4">
        <div className="flex flex-col gap-1 lg:flex-row">
          <h3 className="mb-0 flex w-full items-center justify-center rounded-lg bg-primary px-2 py-4 text-accent text-bold text-xl uppercase md:text-2xl lg:max-w-[240px]">
            {t('labelFoundation')}
          </h3>
          <div className="grid grid-cols-2 gap-1 lg:grid-cols-4">
            {props?.foundation?.map((p, index) => (
              <PartnerCard
                key={index.toString()}
                logo={p?.logo}
                content={t(`foundation.foundation-${index}.content`)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 lg:flex-row">
          <h3 className="mb-0 flex w-full items-center justify-center rounded-lg bg-primary px-2 py-4 text-accent text-bold text-xl uppercase md:text-2xl lg:max-w-[240px]">
            {t('labelEntrepreneur')}
          </h3>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
            {props?.entrepreneur?.map((p, index) => (
              <PartnerCard
                key={index.toString()}
                logo={p?.logo}
                content={t(`entrepreneur.entrepreneur-${index}.content`)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 lg:flex-row">
          <h3 className="mb-0 flex w-full items-center justify-center rounded-lg bg-primary px-2 py-4 text-accent text-bold text-xl uppercase md:text-2xl lg:max-w-[240px]">
            {t('labelUniversity')}
          </h3>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
            {props?.university?.map((p, index) => (
              <PartnerCard
                key={index.toString()}
                logo={p?.logo}
                content={t(`university.university-${index}.content`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { VbiPartnersList };
