import { buildUrl } from '@oe/core';
import type { IFilter } from '#types/filter';
import type { IPaymentMethodRes } from '#types/payment';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI } from '#utils/fetch';

export async function getPaymentMethodListService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IPaymentMethodRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.PAYMENT_METHODS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IPaymentMethodRes>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}
