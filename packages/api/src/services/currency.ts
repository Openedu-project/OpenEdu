import type { ICurrencyListResponse } from '#types/currency';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';

export async function getCurrencyService(
  url: string,
  { keys, init }: { keys: string; init?: RequestInit }
): Promise<ICurrencyListResponse[] | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
      queryParams: {
        keys,
      },
    });
  }

  try {
    const response = await fetchAPI<ICurrencyListResponse[]>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}
