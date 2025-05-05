import type { IEventScheduleSchema, IScheduleSchema } from '#schemas/scheduleSchema';
import type { IFilter } from '#types/filter';
import type { ISchedule, IScheduleEvent, IScheduleEventRes } from '#types/schedule';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';

export async function getSchedulesService(
  url: string | null | undefined,
  { orgID, init }: { orgID: string; init?: RequestInit }
): Promise<ISchedule[] | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.SCHEDULES,
      queryParams: {
        preloads: 'EventSchedule',
        org_id: orgID,
      },
    });
  }

  try {
    const response = await fetchAPI<ISchedule[]>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export const postScheduleService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IScheduleSchema; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = API_ENDPOINT.SCHEDULES;
  }

  const response = await postAPI<ISchedule, IScheduleSchema>(endpointKey, payload, init);
  return response.data;
};

export const putScheduleService = async (
  endpoint: string | null | undefined,
  { id, payload, init }: { id: string; payload: IScheduleSchema; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.SCHEDULES_ID,
      params: {
        id: id,
      },
    });
  }

  const response = await putAPI<ISchedule, IScheduleSchema>(endpointKey, payload, init);
  return response.data;
};

export async function getSchedulesEventService(
  url: string | null | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IScheduleEventRes | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.EVENT_SCHEDULES,
      queryParams: { ...params },
    });
  }

  try {
    const response = await fetchAPI<IScheduleEventRes>(endpointKey, init);
    return response.data;
  } catch {
    return null;
  }
}

export const postScheduleEventService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IEventScheduleSchema; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = API_ENDPOINT.EVENT_SCHEDULES;
  }

  const response = await postAPI<IScheduleEvent, IEventScheduleSchema>(endpointKey, payload, init);
  return response.data;
};

export const putScheduleEventService = async (
  endpoint: string | null | undefined,
  { id, payload, init }: { id: string; payload: IEventScheduleSchema; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.EVENT_SCHEDULES_ID,
      params: {
        id: id,
      },
    });
  }

  const response = await putAPI<IScheduleEvent, IEventScheduleSchema>(endpointKey, payload, init);
  return response.data;
};

export const deleteScheduleEventService = async (
  endpoint: string | null | undefined,
  { id, init }: { id: string; init?: RequestInit }
) => {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.EVENT_SCHEDULES_ID,
      params: {
        id: id,
      },
    });
  }
  const response = await deleteAPI<IScheduleEvent, null>(endpointKey, null, init);

  return response.data;
};
