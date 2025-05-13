import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { IEventScheduleSchema, IScheduleSchema } from '#schemas/scheduleSchema';
import {
  deleteScheduleEventService,
  getSchedulesEventService,
  getSchedulesService,
  postScheduleEventService,
  postScheduleService,
  putScheduleEventService,
  putScheduleService,
} from '#services/schedule';
import type { IFilter } from '#types/filter';
import type { ISchedule, IScheduleEvent } from '#types/schedule';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetSchedules(orgID: string) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.SCHEDULES,
    queryParams: {
      preloads: 'EventSchedule',
      org_id: orgID,
    },
  });

  const { data, isLoading, error, mutate } = useSWR(orgID ? endpointKey : null, (endpoint: string) =>
    getSchedulesService(endpoint, { orgID })
  );

  return {
    dataSchedules: data,
    errorSchedules: error,
    mutateSchedules: mutate,
    isLoadingSchedules: isLoading,
  };
}

export const usePostSchedule = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.SCHEDULES,
    async (_endpoint: string, { arg }: { arg: IScheduleSchema }): Promise<ISchedule> =>
      postScheduleService(null, { payload: arg })
  );

  return {
    triggerPostSchedule: trigger,
    isLoadingPostSchedule: isMutating,
    errorPostSchedule: error,
  };
};

export const usePutSchedule = (id: string) => {
  const url = buildUrl({
    endpoint: API_ENDPOINT.SCHEDULES_ID,
    params: {
      id,
    },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string, { arg }: { arg: IScheduleSchema }): Promise<ISchedule> =>
      putScheduleService(endpoint, { id, payload: arg })
  );

  return {
    triggerPutSchedule: trigger,
    isLoadingPutSchedule: isMutating,
    errorPutSchedule: error,
  };
};

export function useGetSchedulesEvent(queryParams: IFilter) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.EVENT_SCHEDULES,
    queryParams: { ...queryParams },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getSchedulesEventService(endpoint, { params: queryParams })
  );

  return {
    dataSchedulesEvent: data,
    errorSchedulesEvent: error,
    mutateSchedulesEvent: mutate,
    isLoadingSchedulesEvent: isLoading,
  };
}

export const usePostScheduleEvent = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.EVENT_SCHEDULES,
    async (_endpoint: string, { arg }: { arg: IEventScheduleSchema }): Promise<IScheduleEvent> =>
      postScheduleEventService(null, { payload: arg })
  );

  return {
    triggerPostScheduleEvent: trigger,
    isLoadingPostScheduleEvent: isMutating,
    errorPostScheduleEvent: error,
  };
};

export const usePutScheduleEvent = (id: string) => {
  const url = buildUrl({
    endpoint: API_ENDPOINT.EVENT_SCHEDULES_ID,
    params: {
      id,
    },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string, { arg }: { arg: IEventScheduleSchema }): Promise<IScheduleEvent> =>
      putScheduleEventService(endpoint, { id, payload: arg })
  );

  return {
    triggerPutScheduleEvent: trigger,
    isLoadingPutScheduleEvent: isMutating,
    errorPutScheduleEvent: error,
  };
};

export const useDeleteScheduleEvent = (id: string) => {
  const url = buildUrl({
    endpoint: API_ENDPOINT.EVENT_SCHEDULES_ID,
    params: {
      id,
    },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    url,
    async (endpoint: string): Promise<IScheduleEvent> => deleteScheduleEventService(endpoint, { id })
  );

  return {
    triggerDeleteScheduleEvent: trigger,
    isLoadingDeleteScheduleEvent: isMutating,
    errorDeleteScheduleEvent: error,
  };
};
