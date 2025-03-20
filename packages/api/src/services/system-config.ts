import type { LanguageCode } from '@oe/i18n/languages';
import { createAPIUrl, fetchAPI, postAPI, putAPI } from '#utils/fetch';
import {
  getAPIReferrerAndOrigin,
  getAPIReferrerAndOriginClient,
  getAPIReferrerAndOriginServer,
} from '#utils/referrer-origin';
import { createThemeSystemConfigKeyClient } from '#utils/system-config';
import type { ISystemConfigKey, ISystemConfigPayload, ISystemConfigRes } from '../types/system-config';
import { API_ENDPOINT } from '../utils/endpoints';

export const createSystemConfigSWRKey = ({ key, locales }: { key: ISystemConfigKey; locales?: LanguageCode[] }) => {
  const { host } = getAPIReferrerAndOriginClient();
  console.info('host', host);
  return createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: {
      keys: key,
      domains: host,
      ...(locales ? { locales } : {}),
    },
  });
};

// USE key=theme_system_:themeName
export const createThemeSystemConfigSWRKey = ({ locales }: { locales?: LanguageCode[] }) => {
  const { host } = getAPIReferrerAndOriginClient();
  console.info('host', host);
  return createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: {
      keys: createThemeSystemConfigKeyClient(),
      domains: host,
      ...(locales ? { locales } : {}),
    },
  });
};

export async function getSystemConfigClient<T>(
  endpoint: string | null | undefined,
  { key, locales, init }: { key: ISystemConfigKey; locales?: LanguageCode[]; init?: RequestInit }
) {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createSystemConfigSWRKey({ key, locales });
  }
  const res = await fetchAPI<ISystemConfigRes<T>[]>(endpointKey, init);

  return res?.data;
}

export async function getSystemConfigServer<T>({
  key,
  locales,
  init,
}: { key: ISystemConfigKey; locales?: LanguageCode[]; init?: RequestInit }) {
  const { host } = await getAPIReferrerAndOriginServer();
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: {
      keys: key,
      domains: host,
      ...(locales ? { locales: locales.join(',') } : {}),
    },
  });
  const res = await fetchAPI<ISystemConfigRes<T>[]>(endpointKey, init);

  return res?.data;
}

export const createSystemConfig = async <T>(
  endpoint: string | null | undefined,
  { payload, init }: { payload: ISystemConfigPayload<T>; init?: RequestInit }
) => {
  const { key, data_type, value, ...rest } = payload;
  const { host } = await getAPIReferrerAndOrigin();

  return await postAPI<ISystemConfigRes<T>, ISystemConfigPayload<T>>(
    endpoint ?? API_ENDPOINT.ADMIN_SYSTEM_CONFIGS,
    {
      key,
      data_type: data_type ?? 'jsonb',
      domain: host,
      value: JSON.stringify(value),
      ...rest,
    },
    init
  );
};

export const updateSystemConfig = async <T>(
  endpoint: string | null | undefined,
  { id, payload, init }: { id: string; payload: ISystemConfigPayload<T>; init?: RequestInit }
) => {
  const { key, data_type, value, ...rest } = payload;
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
      ...rest,
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
