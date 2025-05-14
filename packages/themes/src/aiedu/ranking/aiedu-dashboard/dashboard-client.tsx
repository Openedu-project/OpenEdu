'use client';

import { useGetAIEduSystemConfig, useGetOeRefferralLeaderBoardsAIEdu, useGetOeRefferralStatisticsAIEdu } from '@oe/api';
import type { SectionComponent } from '#types';
import { AieduDashboardSection } from '../../_components/dashboard-section';

const AieduRankingDashboardClient: SectionComponent<'ranking', 'aieduDashboard'> = ({ props, className }) => {
  const { dataAIEduSystemConfig } = useGetAIEduSystemConfig();

  const { dataOeRefferralStatisticsAIEdu } = useGetOeRefferralStatisticsAIEdu(
    dataAIEduSystemConfig?.[0]?.value?.campaign_key
  );
  const { dataOeRefferralLeaderBoardsAIEdu } = useGetOeRefferralLeaderBoardsAIEdu(
    dataAIEduSystemConfig?.[0]?.value?.campaign_key,
    {
      // sort: 'percent_cert_on_reg desc',
      local_level: 1,
      per_page: 100,
    }
  );
  return (
    <AieduDashboardSection
      props={props}
      className={className}
      type="detail"
      statisticsData={dataOeRefferralStatisticsAIEdu ?? undefined}
      leaderBoardsData={dataOeRefferralLeaderBoardsAIEdu?.results ?? undefined}
    />
  );
};

export { AieduRankingDashboardClient };
