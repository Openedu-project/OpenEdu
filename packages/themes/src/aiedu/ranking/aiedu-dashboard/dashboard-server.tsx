import type { SectionComponent } from '#types';
import { getLeaderBoards, getStatistics } from '../../_actions/dashboard';
import { AieduDashboardSection } from '../../_components/dashboard-section';

const AieduRankingDashboardServer: SectionComponent<'ranking', 'aieduDashboard'> = async ({ props, className }) => {
  const [statisticsData, leaderBoardsData] = await Promise.all([getStatistics(), getLeaderBoards()]);
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
