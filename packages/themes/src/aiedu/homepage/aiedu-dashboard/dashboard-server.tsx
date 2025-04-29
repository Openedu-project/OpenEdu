import { getOeRefferralLeaderBoardsAIEdu, getOeRefferralStatisticsAIEdu } from '@oe/api';
import type { SectionComponent } from '#types';
import { AieduDashboardSection } from '../../_components/dashboard-section';

const AieduHomepageDashboardServer: SectionComponent<'homepage', 'aieduDashboard'> = async ({ props, className }) => {
  const [statisticsData, leaderBoardsData] = await Promise.all([
    getOeRefferralStatisticsAIEdu(undefined, { params: {} }),
    getOeRefferralLeaderBoardsAIEdu(undefined, {
      params: { sort: 'percent_cert_on_ref desc', local_level: 1 },
    }),
  ]);
  return (
    <AieduDashboardSection
      props={props}
      className={className}
      type="simple"
      statisticsData={statisticsData ?? undefined}
      leaderBoardsData={leaderBoardsData?.results ?? undefined}
    />
  );
};

export { AieduHomepageDashboardServer };
