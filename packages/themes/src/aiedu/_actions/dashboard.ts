import {
  type AIEduLeaderBoards,
  type AIEduStatistics,
  type HTTPPagination,
  getAIEduSystemConfig,
  getOeRefferralLeaderBoardsAIEdu,
  getOeRefferralStatisticsAIEdu,
} from '@oe/api';

export const getStatistics = async (): Promise<AIEduStatistics | undefined> => {
  const [aieduConfig] = await Promise.all([getAIEduSystemConfig(undefined, {})]);
  try {
    const dataStatistics = await getOeRefferralStatisticsAIEdu(undefined, {
      id: aieduConfig?.[0]?.value?.campaign_key,
      params: {},
    });
    return dataStatistics as AIEduStatistics;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getLeaderBoards = async (): Promise<HTTPPagination<AIEduLeaderBoards> | undefined> => {
  const [aieduConfig] = await Promise.all([getAIEduSystemConfig(undefined, {})]);
  try {
    const dataStatistics = await getOeRefferralLeaderBoardsAIEdu(undefined, {
      id: aieduConfig?.[0]?.value?.campaign_key,
      params: { sort: 'percent_cert_on_reg desc', local_level: 1, per_page: 100 },
    });
    return dataStatistics as HTTPPagination<AIEduLeaderBoards>;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
