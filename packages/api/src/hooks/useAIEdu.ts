import useSWR from 'swr';
import { getOeRefferralLeaderBoardsAIEdu, getOeRefferralStatisticsAIEdu } from '#services/index';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetOeRefferralStatisticsAIEdu() {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_STATISTICS_AI_EDU,
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) =>
    getOeRefferralStatisticsAIEdu(url, { params: {} })
  );

  return {
    dataOeRefferralStatisticsAIEdu: data,
    isLoadingOeRefferralStatisticsAIEdu: isLoading,
    errorOeRefferralStatisticsAIEdu: error,
    mutateOeRefferralStatisticsAIEdu: mutate,
  };
}

export function useGetOeRefferralLeaderBoardsAIEdu(params?: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_LEADER_BOARDS_AI_EDU,
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (url: string) =>
    getOeRefferralLeaderBoardsAIEdu(url, { params: params ?? {} })
  );

  return {
    dataOeRefferralLeaderBoardsAIEdu: data,
    isLoadingOeRefferralLeaderBoardsAIEdu: isLoading,
    errorOeRefferralLeaderBoardsAIEdu: error,
    mutateOeRefferralLeaderBoardsAIEdu: mutate,
  };
}
