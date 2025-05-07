import useSWR from 'swr';
import { getAIEduSystemConfig, getOeRefferralLeaderBoardsAIEdu, getOeRefferralStatisticsAIEdu } from '#services/index';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import { systemConfigQueryByKeys } from '#utils/system-config';

export function useGetOeRefferralStatisticsAIEdu(id?: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_STATISTICS_ID,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (url: string) =>
    getOeRefferralStatisticsAIEdu(url, { id, params: {} })
  );

  return {
    dataOeRefferralStatisticsAIEdu: data,
    isLoadingOeRefferralStatisticsAIEdu: isLoading,
    errorOeRefferralStatisticsAIEdu: error,
    mutateOeRefferralStatisticsAIEdu: mutate,
  };
}

export function useGetOeRefferralLeaderBoardsAIEdu(id?: string, params?: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_LEADER_BOARDS_ID,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (url: string) =>
    getOeRefferralLeaderBoardsAIEdu(url, { id, params: params ?? {} })
  );

  return {
    dataOeRefferralLeaderBoardsAIEdu: data,
    isLoadingOeRefferralLeaderBoardsAIEdu: isLoading,
    errorOeRefferralLeaderBoardsAIEdu: error,
    mutateOeRefferralLeaderBoardsAIEdu: mutate,
  };
}

export function useGetAIEduSystemConfig(shouldFetch = true) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: { keys: systemConfigQueryByKeys.aiedu },
  });

  const { data, isLoading, error, mutate } = useSWR(shouldFetch ? endpointKey : null, (endpoint: string) =>
    getAIEduSystemConfig(endpoint, { keys: systemConfigQueryByKeys.aiedu })
  );

  return {
    dataAIEduSystemConfig: data,
    isLoadingAIEduSystemConfig: isLoading,
    errorAIEduSystemConfig: error,
    mutateAIEduSystemConfig: () => mutate,
  };
}
