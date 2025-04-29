import {
  getOeRefferralLeaderBoardsAIEdu,
  getOeRefferralStatisticsAIEdu,
} from "@oe/api";
import { AieduDashboardSection } from "@oe/themes";
const RankingDetailOutline = async ({ id }: { id: string }) => {
  const [statisticsData, leaderBoardsData] = await Promise.all([
    getOeRefferralStatisticsAIEdu(undefined, { params: {} }),
    getOeRefferralLeaderBoardsAIEdu(undefined, {
      params: {
        sort: "percent_cert_on_ref desc",
        local_level: 2,
        parent_id: id,
        per_page: 100,
      },
    }),
  ]);

  return (
    <AieduDashboardSection
      type="detail"
      statisticsData={statisticsData ?? undefined}
      leaderBoardsData={leaderBoardsData?.results ?? undefined}
    />
  );
};

export default RankingDetailOutline;
