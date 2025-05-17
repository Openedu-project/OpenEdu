import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { buildUrl } from '@oe/core';
import { deleteNotificationService, getNotificationService, putNotification } from '#services/notification';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import type { INotificationDeletePayload, INotificationReadPayload, INotificationRes } from '../types/notification';

export function useGetNotification(params: IFilter) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.COM_NOTIFICATIONS,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getNotificationService(endpoint, { queryParams: params })
  );

  return {
    dataNotification: data,
    isLoadingNotification: isLoading,
    errorNotificationList: error,
    mutateNotificationList: mutate,
  };
}

export function useUpdateNotification() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.COM_NOTIFICATIONS_READ,
    async (endpoint: string, { arg }: { arg: INotificationReadPayload }): Promise<INotificationRes> =>
      putNotification(endpoint, { payload: arg })
  );

  return {
    triggerUpdateNotification: trigger,
    isLoadingUpdateNotification: isMutating,
    errorUpdateNotification: error,
  };
}

export function useDeleteNotification() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.COM_NOTIFICATIONS,
    async (endpoint: string, { arg }: { arg: INotificationDeletePayload }): Promise<INotificationRes | null> =>
      deleteNotificationService(endpoint, { payload: arg })
  );

  return {
    triggerDeleteNotification: trigger,
    isLoadingDeleteNotification: isMutating,
    errorDeleteNotification: error,
  };
}
