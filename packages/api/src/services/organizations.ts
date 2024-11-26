import type { HTTPPagination, HTTPResponse } from '#types/fetch';
import type { IOrganization } from '#types/organizations';

import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI } from '#utils/fetch';

export const organizationsService = async (
  endpoint: string | null | undefined,
  { queryParams, init }: { queryParams: Record<string, unknown>; init?: RequestInit }
) => {
  const response = await fetchAPI<HTTPPagination<IOrganization>>(
    createAPIUrl({ endpoint: endpoint ?? API_ENDPOINT.ADMIN_ORGANIZATIONS, queryParams }),
    init
  );

  return response.data;
};

export const getOrgByDomainService = async (
  endpoint: string | null | undefined,
  { domain, init }: { domain: string; init?: RequestInit }
) => {
  const response = await organizationsService(endpoint, { queryParams: { domain }, init });

  return response.results?.[0];
};

export const checkDomainService = async (
  endpoint: string | null | undefined,
  { domain, init }: { domain: string; init?: RequestInit }
) => {
  try {
    const response = await postAPI<HTTPResponse<boolean>, { domain: string }>(
      endpoint ?? API_ENDPOINT.ADMIN_ORGANIZATIONS,
      { domain },
      init
    );

    return response.data;
  } catch {
    return false;
  }
};

export const getOrganizationByHostMiddleware = async (referrer: string, origin: string) => {
  const { host } = new URL(origin);
  try {
    const endpoint = `${API_ENDPOINT.ADMIN_ORGANIZATIONS}?domain=${host}`;
    const apiURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}${endpoint}`;
    const organizationResponse = await fetch(apiURL, {
      headers: {
        'X-referrer': referrer,
        Origin: origin,
      },
    });
    const organization = (await organizationResponse.json()) as HTTPResponse<HTTPPagination<IOrganization>>;

    return organization?.data?.results?.[0];
  } catch {
    return undefined;
  }
};
