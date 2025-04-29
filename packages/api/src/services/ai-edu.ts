import type { AIEduLeaderBoards, AIEduStatistics } from '#types/ai-edu';
import type { HTTPPagination } from '#types/fetch';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';

export const getOeRefferralStatisticsAIEdu = async (
  url: string | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
) => {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_STATISTICS_AI_EDU,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<AIEduStatistics>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
};

export const getOeRefferralLeaderBoardsAIEdu = async (
  url: string | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
) => {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_LEADER_BOARDS_AI_EDU,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<HTTPPagination<AIEduLeaderBoards>>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
};
