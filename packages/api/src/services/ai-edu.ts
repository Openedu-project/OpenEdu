import type { AIEduLeaderBoards, AIEduStatistics, AIEduSystemConfigRes } from '#types/ai-edu';
import type { HTTPPagination } from '#types/fetch';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';
import { systemConfigQueryByKeys } from '#utils/system-config';

export const getOeRefferralStatisticsAIEdu = async (
  url: string | undefined,
  { id, params, init }: { id?: string; params: IFilter; init?: RequestInit }
) => {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_STATISTICS_ID,
      params: { id },
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
  { id, params, init }: { id?: string; params: IFilter; init?: RequestInit }
) => {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_LEADER_BOARDS_ID,
      params: { id },
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

export async function getAIEduSystemConfig(
  url: string | undefined,
  { keys, init }: { keys?: string; init?: RequestInit }
): Promise<AIEduSystemConfigRes[] | undefined> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
      queryParams: {
        keys: keys || systemConfigQueryByKeys.aiedu,
      },
    });
  }

  try {
    const response = await fetchAPI<AIEduSystemConfigRes[]>(endpointKey, init);

    return response.data;
  } catch {
    return undefined;
  }
}
