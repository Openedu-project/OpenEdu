import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';

import type { AIEduLeaderBoards, AIEduStatistics } from '@oe/api';
import { AieduButton, type AieduButtonProps } from './button';
import { AieduLayoutSection } from './layout-section';
import { RankingTable } from './ranking-table';
import StatisticsBanner from './statistics-banner';
import { Title, type TitleProps } from './title';
import { TrophyCard, type TrophyType } from './trophy-card';

export interface AieduDashboardConfigProps extends TitleProps {
  button?: AieduButtonProps;
}

interface AieduDashboardProps {
  type: 'simple' | 'detail';
  leaderBoardsData?: AIEduLeaderBoards[];
  statisticsData?: AIEduStatistics;
  props?: AieduDashboardConfigProps;
  className?: string;
}

const AieduDashboardSection = ({ leaderBoardsData, type, statisticsData, props, className }: AieduDashboardProps) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduDashboard');

  const topCitites = [
    {
      type: 'silver',
      name: leaderBoardsData?.[1]?.display_name,
      registrations: leaderBoardsData?.[1]?.register_count,
      certificates: leaderBoardsData?.[1]?.cert_count,
    },
    {
      type: 'gold',
      name: leaderBoardsData?.[0]?.display_name,
      registrations: leaderBoardsData?.[0]?.register_count,
      certificates: leaderBoardsData?.[0]?.cert_count,
    },
    {
      type: 'bronze',
      name: leaderBoardsData?.[2]?.display_name,
      registrations: leaderBoardsData?.[2]?.register_count,
      certificates: leaderBoardsData?.[2]?.cert_count,
    },
  ];

  return (
    <AieduLayoutSection className={cn('space-y-6', className)}>
      <Title title={t('title')} className="text-center" />

      {/* Total Stats Section */}
      <StatisticsBanner data={statisticsData} />

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

      {type === 'detail' ? (
        <RankingTable leaderBoardsData={leaderBoardsData} />
      ) : (
        <div className="mb-6 overflow-hidden rounded-lg border border-secondary">
          <table className="w-full">
            <thead>
              <tr className="border-secondary border-b">
                <th className="px-2 py-3 text-left md:px-4">{t('province')}</th>
                <th className="px-2 py-3 text-center md:px-4">{t('registerCount')}</th>
                <th className="px-2 py-3 text-right md:px-4">{t('certCount')}</th>
              </tr>
            </thead>
            <tbody>
              {leaderBoardsData
                ?.splice(3, 10)
                ?.filter(Boolean)
                .map((city, index) => (
                  <tr key={index.toString()} className="border-secondary border-b hover:bg-primary-foreground">
                    <td className="px-2 py-3 md:px-4">
                      <div className="flex items-center">
                        <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-background text-sm sm:mr-4 sm:h-8 sm:w-8 sm:text-normal">
                          {Number(index) + 4}
                        </div>
                        <span className="font-bold ">{city?.display_name ?? '-'}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center font-bold md:px-4">{city.register_count}</td>
                    <td className="px-2 py-3 text-right font-bold md:px-4">{city.cert_count}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* View Details Button */}
          <div className="flex justify-center p-4">
            <AieduButton text={t('button.text')} link={props?.button?.link} variant="outline" />
          </div>
        </div>
      )}
    </AieduLayoutSection>
  );
};

export { AieduDashboardSection };
