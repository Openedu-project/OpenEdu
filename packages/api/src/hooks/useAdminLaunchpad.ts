import useSWR from 'swr';
import { getAdminLaunchpadDetailService, getAdminLaunchpadInvestmentService } from '#services/admin-launchpad';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetAdminLaunchpadDetail(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_ID,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAdminLaunchpadDetailService(endpoint, { params: { id } })
  );

  return {
    dataAdminLaunchpadDetail: data,
    errorAdminLaunchpadDetail: error,
    mutateAdminLaunchpadDetail: mutate,
    isLoadingAdminLaunchpadDetail: isLoading,
  };
}

export function useGetAdminLaunchpadInvestment(id: string) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_ID,
    params: { id },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getAdminLaunchpadInvestmentService(endpoint, { params: { id } })
  );

  return {
    dataAdminLaunchpadDetail: data,
    errorAdminLaunchpadDetail: error,
    mutateAdminLaunchpadDetail: mutate,
    isLoadingAdminLaunchpadDetail: isLoading,
  };
}
