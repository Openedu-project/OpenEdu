import { getCookieClient } from '@oe/core/utils/cookie';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  getOrgByDomainService,
  getOrgByIdService,
  organizationsService,
  postCreateOrganizationService,
  putUpdateOrganizationService,
} from '#services/organizations';
import type { IFilter } from '#types/filter';
import type { IOrganization, IOrganizationPayload } from '#types/organizations';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
// import { getCookie } from '@oe/core/utils/cookie';

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

export function useGetOrganizationById({ id, init = undefined }: { id: string; init?: RequestInit }) {
  const endpointKey = `${API_ENDPOINT.ADMIN_ORGANIZATIONS}/${id}`;
  const { data, isLoading, error, mutate } = useSWR(endpointKey, () =>
    getOrgByIdService(API_ENDPOINT.ADMIN_ORGANIZATIONS, { id, init })
  );

  return {
    dataListOrganizationById: data,
    errorOrganizationById: error,
    mutateListOrganizationById: mutate,
    isLoadingOrganizationById: isLoading,
  };
}

export function useGetOrganizationByDomain(init?: RequestInit) {
  const domain = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)?.split('/')?.[0] ?? '';
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.ADMIN_ORGANIZATIONS, queryParams: { domain } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, () =>
    getOrgByDomainService(API_ENDPOINT.ADMIN_ORGANIZATIONS, { domain, init })
  );

  return {
    organizationByDomain: data,
    errorOrganizationByDomain: error,
    mutateOrganizationByDomain: mutate,
    isLoadingOrganizationByDomain: isLoading,
  };
}

export function useCreateOrganization() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ADMIN_ORGANIZATIONS,
    async (endpoint: string, { arg }: { arg: IOrganizationPayload }): Promise<IOrganization> =>
      postCreateOrganizationService(endpoint, { payload: arg })
  );
  return {
    triggerCreateOrganiation: trigger,
    isLoadingCreateOrganiation: isMutating,
    errorCreateOrganiation: error,
  };
}

export function useUpdateOrganization(id: string) {
  const endpointKey = `${API_ENDPOINT.ADMIN_ORGANIZATIONS}/${id}`;

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (_endpoint: string, { arg }: { arg: IOrganizationPayload }): Promise<IOrganization> =>
      putUpdateOrganizationService(endpointKey, { payload: arg })
  );
  return {
    triggerUpdateOrganiation: trigger,
    isLoadingUpdateOrganiation: isMutating,
    errorUpdateOrganiation: error,
  };
}
