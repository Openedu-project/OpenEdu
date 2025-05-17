import { buildUrl } from '@oe/core';
import type {
  AIEduLeaderBoards,
  AIEduStatistics,
  AIEduSystemConfigRes,
  IAIEduProvince,
  IAIEduStatisticLearnersRes,
  IAIEduStatisticLearningGrowth,
  IAIEduStatisticProvince,
  IAIEduStatisticProvinceDetail,
  IAIEduStatisticWidget,
  IAIStatisticSectionCompletion,
} from '#types/ai-edu';
import type { HTTPPagination } from '#types/fetch';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';
import { systemConfigQueryByKeys } from '#utils/system-config';

export const getOeRefferralStatisticsAIEdu = async (
  url: string | undefined,
  { id, params, init }: { id?: string; params: IFilter; init?: RequestInit }
) => {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
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
    endpointKey = buildUrl({
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
    endpointKey = buildUrl({
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

export async function getAIEduProvinceService(
  url: string | null | undefined,
  { key, init }: { key: string; init?: RequestInit }
): Promise<IAIEduProvince[] | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_PROVINCES,
      params: {
        key,
      },
    });
  }

  try {
    const response = await fetchAPI<IAIEduProvince[]>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getAIEduStatisticWidgetService(
  url: string | null | undefined,
  { key, queryParams, init }: { key: string; queryParams?: IFilter; init?: RequestInit }
): Promise<IAIEduStatisticWidget | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_WIDGET,
      params: {
        key,
      },
      queryParams: {
        ...queryParams,
      },
    });
  }

  try {
    const response = await fetchAPI<IAIEduStatisticWidget>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getAIEduStatisticLearningGrowthService(
  url: string | null | undefined,
  { key, queryParams, init }: { key: string; queryParams?: IFilter; init?: RequestInit }
): Promise<IAIEduStatisticLearningGrowth | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_LEARNER_GROWTH,
      params: {
        key,
      },
      queryParams: {
        ...queryParams,
      },
    });
  }

  try {
    const response = await fetchAPI<IAIEduStatisticLearningGrowth>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}
export async function getAIEduStatisticSectionCompletionService(
  url: string | null | undefined,
  { key, queryParams, init }: { key: string; queryParams?: IFilter; init?: RequestInit }
): Promise<IAIStatisticSectionCompletion[] | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_SECTION_COMPLETION,
      params: {
        key,
      },
      queryParams: {
        ...queryParams,
      },
    });
  }

  try {
    const response = await fetchAPI<IAIStatisticSectionCompletion[]>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}
export async function getAIEduStatisticProvincesService(
  url: string | null | undefined,
  { key, queryParams, init }: { key: string; queryParams?: IFilter; init?: RequestInit }
): Promise<IAIEduStatisticProvince[] | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_PROVINCES,
      params: {
        key,
      },
      queryParams: {
        ...queryParams,
      },
    });
  }

  try {
    const response = await fetchAPI<IAIEduStatisticProvince[]>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getAIEduStatisticProvincesDetailService(
  url: string | null | undefined,
  { key, queryParams, init }: { key: string; queryParams?: IFilter; init?: RequestInit }
): Promise<IAIEduStatisticProvinceDetail[] | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_PROVINCES_DETAIL,
      params: {
        key,
      },
      queryParams: {
        ...queryParams,
      },
    });
  }

  try {
    const response = await fetchAPI<IAIEduStatisticProvinceDetail[]>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export async function getAIEduStatisticLearnersService(
  url: string | null | undefined,
  { key, queryParams, init }: { key: string; queryParams?: IFilter; init?: RequestInit }
): Promise<IAIEduStatisticLearnersRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_LEARNERS,
      params: {
        key,
      },
      queryParams: {
        ...queryParams,
      },
    });
  }

  try {
    const response = await fetchAPI<IAIEduStatisticLearnersRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}
