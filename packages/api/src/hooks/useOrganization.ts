import useSWR from 'swr';
import { getOrgByDomainService, organizationsService } from '#services/organizations';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetOrganization({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.ADMIN_ORGANIZATIONS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    organizationsService(endpoint, params as unknown as { queryParams: Record<string, unknown>; init?: RequestInit })
  );

  return {
    dataListOrganization: data,
    errorOrganization: error,
    mutateListOrganization: mutate,
    isLoadingOrganization: isLoading,
  };
}

export function useGetOrganizationByDomain({ domain, init = undefined }: { domain: string; init?: RequestInit }) {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.ADMIN_ORGANIZATIONS, queryParams: { domain } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, () =>
    getOrgByDomainService(API_ENDPOINT.ADMIN_ORGANIZATIONS, { domain, init })
  );

  return {
    dataListOrganizationByDomain: data,
    errorOrganizationByDomain: error,
    mutateListOrganizationByDomain: mutate,
    isLoadingOrganizationByDomain: isLoading,
  };
}
