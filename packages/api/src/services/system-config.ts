import { createAPIUrl, fetchAPI, postAPI, putAPI } from '#utils/fetch';

import { getAPIReferrerAndOrigin } from '#utils/referrer-origin';
import type { ISystemConfigKey, ISystemConfigPayload, ISystemConfigRes } from '../types/system-config';
import { API_ENDPOINT } from '../utils/endpoints';

export async function getSystemConfig<T>(
  endpoint: string | null | undefined,
  { key, init }: { key: ISystemConfigKey; init?: RequestInit }
) {
  const { host } = await getAPIReferrerAndOrigin();
  const res = await fetchAPI<ISystemConfigRes<T>[]>(
    createAPIUrl({
      endpoint: endpoint ?? API_ENDPOINT.SYSTEM_CONFIGS,
      queryParams: {
        keys: key,
        domains: host,
      },
    }),
    init
  );

  return res.data?.[0];
}

export const createSystemConfig = async <T>(
  endpoint: string | null | undefined,
  { payload, init }: { payload: ISystemConfigPayload<T>; init?: RequestInit }
) => {
  const { key, data_type, value } = payload;
  const { host } = await getAPIReferrerAndOrigin();

  return await postAPI<ISystemConfigRes<T>, ISystemConfigPayload<T>>(
    endpoint ?? API_ENDPOINT.ADMIN_SYSTEM_CONFIGS,
    {
      key,
      data_type: data_type ?? 'jsonb',
      domain: host,
      value: JSON.stringify(value),
    },
    init
  );
};

export const updateSystemConfig = async <T>(
  endpoint: string | null | undefined,
  { id, payload, init }: { id: string; payload: ISystemConfigPayload<T>; init?: RequestInit }
) => {
  const { key, data_type, value } = payload;
  const { host } = await getAPIReferrerAndOrigin();

  return await putAPI<ISystemConfigRes<T>, ISystemConfigPayload<T>>(
    createAPIUrl({
      endpoint: endpoint ?? API_ENDPOINT.ADMIN_SYSTEM_CONFIGS_ID,
      params: {
        id,
      },
    }),
    {
      key,
      data_type: data_type ?? 'jsonb',
      domain: host,
      value: JSON.stringify(value),
    },
    init
  );
};

export const createOrUpdateSystemConfig = async <T>(
  endpoint: string | null | undefined,
  { id, payload, init }: { id?: string; payload: ISystemConfigPayload<T>; init?: RequestInit }
) => {
  if (id) {
    return await updateSystemConfig(endpoint, { id, payload, init });
  }
  return await createSystemConfig(endpoint, { payload, init });
};
