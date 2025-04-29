'use client';

import { useGetOeRefferralLeaderBoardsAIEdu, useGetOeRefferralStatisticsAIEdu } from '@oe/api';
import type { SectionComponent } from '#types';
import { AieduDashboardSection } from '../../_components/dashboard-section';

const AieduHomepageDashboardClient: SectionComponent<'homepage', 'aieduDashboard'> = ({ props, className }) => {
  const { dataOeRefferralStatisticsAIEdu } = useGetOeRefferralStatisticsAIEdu();
  const { dataOeRefferralLeaderBoardsAIEdu } = useGetOeRefferralLeaderBoardsAIEdu({
    sort: 'percent_cert_on_ref desc',
    local_level: 1,
  });
  return (
    <AieduDashboardSection
      props={props}
      className={className}
      type="simple"
      statisticsData={dataOeRefferralStatisticsAIEdu ?? undefined}
      leaderBoardsData={dataOeRefferralLeaderBoardsAIEdu?.results ?? undefined}
    />
  );
};

export { AieduHomepageDashboardClient };
