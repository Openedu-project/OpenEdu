import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { AieduButton, type AieduButtonProps } from '../../_components/button';
import { AieduLayoutSection } from '../../_components/layout-section';
import StatisticsBanner from '../../_components/statistics-banner';
import { Title, type TitleProps } from '../../_components/title';
import { TrophyCard, type TrophyCardProps, type TrophyType } from '../../_components/trophy-card';
export interface AieduHomepageDashboardProps extends TitleProps {
  totalStats?: {
    registrations?: number;
    certificates?: number;
  };
  topCities?: {
    silver: TrophyCardProps;
    gold: TrophyCardProps;
    bronze: TrophyCardProps;
  };

  otherCities?: TrophyCardProps[];

  button?: AieduButtonProps;
}

const AieduHomepageDashboard: SectionComponent<'homepage', 'aieduDashboard'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduDashboard');

  const topCitites = [
    {
      type: 'silver',
      name: t('topCities.silver.name'),
      registrations: props?.topCities?.silver?.registrations,
      certificates: props?.topCities?.silver?.certificates,
    },
    {
      type: 'gold',
      name: t('topCities.gold.name'),
      registrations: props?.topCities?.gold?.registrations,
      certificates: props?.topCities?.gold?.certificates,
    },
    {
      type: 'bronze',
      name: t('topCities.bronze.name'),
      registrations: props?.topCities?.bronze?.registrations,
      certificates: props?.topCities?.bronze?.certificates,
    },
  ];

  return (
    <AieduLayoutSection className={cn('space-y-6', className)}>
      <Title title={t('title')} className="text-center" />

      {/* Total Stats Section */}
      <StatisticsBanner
        data={{
          registrations: {
            count: props?.totalStats?.registrations ?? 0,
            label: t('registerCount'),
          },
          certificates: {
            count: props?.totalStats?.certificates ?? 0,
            label: t('certCount'),
          },
        }}
      />

      {/* Top Cities Section */}
      <div className="mb-6 space-y-2 lg:flex lg:gap-4 lg:space-y-0">
        {topCitites?.map(city => (
          <TrophyCard
            key={city?.type}
            type={city?.type as TrophyType}
            name={city?.name}
            registrations={city.registrations}
            certificates={city?.certificates}
          />
        ))}
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-secondary">
        <table className="w-full">
          <thead>
            <tr className="border-secondary border-b">
              <th className="px-2 py-3 text-left text-sm sm:text-normal md:px-4">{t('province')}</th>
              <th className="px-2 py-3 text-center text-sm sm:text-normal md:px-4">{t('registerCount')}</th>
              <th className="px-2 py-3 text-right text-sm sm:text-normal md:px-4">{t('certCount')}</th>
            </tr>
          </thead>
          <tbody>
            {props?.otherCities?.map((city, index) => (
              <tr key={index.toString()} className="border-secondary border-b hover:bg-primary-foreground">
                <td className="px-2 py-3 md:px-4">
                  <div className="flex items-center">
                    <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-background text-sm sm:mr-4 sm:h-8 sm:w-8 sm:text-normal">
                      {Number(index) + 3}
                    </div>
                    <span className="font-bold text-sm sm:text-normal ">{t(`otherCities.city${index + 3}.name`)}</span>
                  </div>
                </td>
                <td className="px-2 py-3 text-center font-bold text-sm sm:text-normal md:px-4">{city.registrations}</td>
                <td className="px-2 py-3 text-right font-bold text-sm sm:text-normal md:px-4">{city.certificates}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* View Details Button */}
        <div className="flex justify-center p-4">
          <AieduButton text={t('button.text')} link={props?.button?.link} variant="outline" />
        </div>
      </div>
    </AieduLayoutSection>
  );
};

export { AieduHomepageDashboard };
