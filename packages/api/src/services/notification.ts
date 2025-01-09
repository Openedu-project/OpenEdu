import type { IFilter } from '#types/filter';
import type { INotificationDeletePayload, INotificationReadPayload, INotificationRes } from '#types/notification';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, deleteAPI, fetchAPI, putAPI } from '#utils/fetch';

export const getNotificationService = async (
  endpoint: string | null | undefined,
  { queryParams, init }: { queryParams: IFilter; init?: RequestInit }
) => {
  const response = await fetchAPI<INotificationRes>(
    endpoint ?? createAPIUrl({ endpoint: API_ENDPOINT.COM_NOTIFICATIONS, queryParams: { ...queryParams } }),
    init
  );

  return response.data;
};

export const putNotification = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: INotificationReadPayload; init?: RequestInit }
) => {
  const response = await putAPI<INotificationRes, INotificationReadPayload>(
    endpoint ?? API_ENDPOINT.COM_NOTIFICATIONS_READ,
    payload,
    init
  );

  return response.data;
};

export async function deleteNotificationService(
  url: string,
  { payload, init }: { payload: INotificationDeletePayload; init?: RequestInit }
): Promise<INotificationRes | null> {
  try {
    const response = await deleteAPI<INotificationRes, INotificationDeletePayload>(
      url ?? API_ENDPOINT.COM_NOTIFICATIONS,
      payload,
      init
    );

    return response.data;
  } catch {
    return null;
  }
}
