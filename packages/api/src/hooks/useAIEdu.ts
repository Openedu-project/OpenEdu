import useSWR from 'swr';
import {
  getAIEduProvinceService,
  getAIEduStatisticLearnersService,
  getAIEduStatisticLearningGrowthService,
  getAIEduStatisticProvincesDetailService,
  getAIEduStatisticProvincesService,
  getAIEduStatisticSectionCompletionService,
  getAIEduStatisticWidgetService,
  getAIEduSystemConfig,
  getOeRefferralLeaderBoardsAIEdu,
  getOeRefferralStatisticsAIEdu,
} from '#services/index';
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

export function useGetAIEduProvinces(key: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_PROVINCES,
    params: { key },
  });

  const { data, isLoading, error, mutate } = useSWR(key ? endpointKey : null, (url: string) =>
    getAIEduProvinceService(url, { key })
  );

  return {
    dataAIEduProvinces: data,
    isLoadingAIEduProvinces: isLoading,
    errorAIEduProvinces: error,
    mutateAIEduProvinces: mutate,
  };
}

export function useGetAIEduStatisticWidget(key: string, queryParams?: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_WIDGET,
    params: { key },
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(key ? endpointKey : null, (url: string) =>
    getAIEduStatisticWidgetService(url, { key, queryParams })
  );

  return {
    dataAIEduStatisticWidget: data,
    isLoadingAIEduStatisticWidget: isLoading,
    errorAIEduStatisticWidget: error,
    mutateAIEduStatisticWidget: mutate,
  };
}

export function useGetAIEduStatisticLearningGrowth(key: string, queryParams?: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_LEARNER_GROWTH,
    params: { key },
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(key ? endpointKey : null, (url: string) =>
    getAIEduStatisticLearningGrowthService(url, { key, queryParams })
  );

  return {
    dataAIEduStatisticLearningGrowth: data,
    isLoadingAIEduStatisticLearningGrowth: isLoading,
    errorAIEduStatisticLearningGrowth: error,
    mutateAIEduStatisticLearningGrowth: mutate,
  };
}

export function useGetAIEduStatisticSectionCompletion(key: string, queryParams?: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_SECTION_COMPLETION,
    params: { key },
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(key ? endpointKey : null, (url: string) =>
    getAIEduStatisticSectionCompletionService(url, { key, queryParams })
  );

  return {
    dataAIEduStatisticSectionCompletion: data,
    isLoadingAIEduStatisticSectionCompletion: isLoading,
    errorAIEduStatisticSectionCompletion: error,
    mutateAIEduStatisticSectionCompletion: mutate,
  };
}

export function useGetAIEduStatisticProvinces(key: string, queryParams?: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_PROVINCES,
    params: { key },
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(key ? endpointKey : null, (url: string) =>
    getAIEduStatisticProvincesService(url, { key, queryParams })
  );

  return {
    dataAIEduStatisticProvinces: data,
    isLoadingAIEduStatisticProvinces: isLoading,
    errorAIEduStatisticProvinces: error,
    mutateAIEduStatisticProvinces: mutate,
  };
}

export function useGetAIEduStatisticProvincesDetail(key: string, queryParams?: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_STATISTIC_PROVINCES_DETAIL,
    params: { key },
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(key ? endpointKey : null, (url: string) =>
    getAIEduStatisticProvincesDetailService(url, { key, queryParams })
  );

  return {
    dataAIEduStatisticProvincesDetail: data,
    isLoadingAIEduStatisticProvincesDetail: isLoading,
    errorAIEduStatisticProvincesDetail: error,
    mutateAIEduStatisticProvincesDetail: mutate,
  };
}

export function useGetAIEduStatisticLearners(key: string, queryParams?: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.OE_REFFERRAL_KEY_LEARNERS,
    params: { key },
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(key ? endpointKey : null, (url: string) =>
    getAIEduStatisticLearnersService(url, { key, queryParams })
  );

  return {
    dataAIEduStatisticLearners: data,
    isLoadingAIEduStatisticLearners: isLoading,
    errorAIEduStatisticLearners: error,
    mutateAIEduStatisticLearners: mutate,
  };
}
