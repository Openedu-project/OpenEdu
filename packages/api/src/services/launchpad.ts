import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';
import type { IBackerData, ILaunchpad, ILaunchpadResponse, LaunchpadStatus } from '../types/launchpad';

export const getLaunchpadsService = async (
  url: string | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<ILaunchpadResponse | undefined> => {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ILaunchpadResponse>(endpointKey, init);
    return response.data;
  } catch {
    return undefined;
  }
};

export async function getLaunchpadService(
  url: string | undefined,
  { id, init, preloads }: { id: string; init?: RequestInit; preloads?: string[] }
): Promise<ILaunchpad | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_ID,
      params: {
        id,
      },
      queryParams: {
        preloads: preloads,
      },
    });
  }

  try {
    const response = await fetchAPI<ILaunchpad>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function getBackerService(
  url: string,
  { id, init, preloads }: { id: string; init?: RequestInit; preloads?: string[] }
): Promise<IBackerData | null> {
  let endpointKey = url;

  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_INVESTMENTS,
      params: {
        id,
      },
      queryParams: {
        preloads: preloads,
      },
    });
  }

  try {
    const response = await fetchAPI<IBackerData>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function getLaunchpadConfigService<T>(
  url: string,
  { keys, init }: { keys?: string[]; init?: RequestInit }
): Promise<T | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LAUNCHPADS_CREATE,
      queryParams: {
        keys,
      },
    });
  }

  try {
    const response = await fetchAPI<T[]>(endpointKey, init);

    return response.data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getMyLaunchpadService({
  init,
  params,
}: {
  init?: RequestInit;
  params?: {
    page?: number;
    per_page?: number;
    sort?: string;
    status?: LaunchpadStatus;
  };
}): Promise<ILaunchpadResponse | null> {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LAUNCHPADS_MY_LAUNCHPAD,
    queryParams: {
      page: params?.page || 1,
      per_page: params?.per_page || 10,
      sort: params?.sort || 'create_at desc',
      status: params?.status,
    },
  });

  try {
    const response = await fetchAPI<{
      results: Array<{
        launchpad: ILaunchpad;
        investment: {
          id: string;
          create_at: number;
          update_at: number;
          delete_at: number;
          user_id: string;
          amount: string;
          revenue_amount: string;
          refunded_amount: string;
          currency: string;
          status: LaunchpadStatus;
        };
      }>;
      pagination: {
        page: number;
        per_page: number;
        total_pages: number;
        total_items: number;
      };
    }>(endpointKey, init);

    return {
      results: response.data.results.map(item => ({
        ...item.launchpad,
        investment: item.investment,
      })),
      pagination: response.data.pagination,
    };
  } catch {
    return null;
  }
}
