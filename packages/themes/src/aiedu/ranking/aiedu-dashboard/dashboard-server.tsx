import { getOeRefferralLeaderBoardsAIEdu, getOeRefferralStatisticsAIEdu } from '@oe/api';
import type { SectionComponent } from '#types';
import { AieduDashboardSection } from '../../_components/dashboard-section';

const AieduRankingDashboardServer: SectionComponent<'ranking', 'aieduDashboard'> = async ({ props, className }) => {
  const [statisticsData, leaderBoardsData] = await Promise.all([
    getOeRefferralStatisticsAIEdu(undefined, { params: {} }),
    getOeRefferralLeaderBoardsAIEdu(undefined, {
      params: {
        sort: 'percent_cert_on_ref desc',
        local_level: 1,
        per_page: 100,
      },
    }),
  ]);
  return (
    <AieduDashboardSection
      props={props}
      className={className}
      type="detail"
      statisticsData={statisticsData ?? undefined}
      leaderBoardsData={leaderBoardsData?.results ?? undefined}
    />
  );
};

export { AieduRankingDashboardServer };
