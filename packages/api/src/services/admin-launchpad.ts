import type { IAdminLaunchpadDetailRes, IAdminLaunchpadInvestmentRes } from '#types/admin-launchpad';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';

export async function getAdminLaunchpadDetailService(
  url: string | null,
  { params, queryParams = {}, init }: { params: { id: string }; queryParams?: IFilter; init?: RequestInit }
): Promise<IAdminLaunchpadDetailRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_ID,
      params: {
        id: params.id,
      },
      queryParams: { ...queryParams },
    });
  }

  try {
    const response = await fetchAPI<IAdminLaunchpadDetailRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}
export async function getAdminLaunchpadInvestmentService(
  url: string | null,
  { params, queryParams = {}, init }: { params: { id: string }; queryParams?: IFilter; init?: RequestInit }
): Promise<IAdminLaunchpadInvestmentRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_ID_INVESTMENTS,
      params: {
        id: params.id,
      },
      queryParams: { ...queryParams },
    });
  }

  try {
    const response = await fetchAPI<IAdminLaunchpadInvestmentRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}
