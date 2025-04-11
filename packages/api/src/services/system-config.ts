import { getCookie } from '@oe/core';
import type { LanguageCode } from '@oe/i18n';
import { createAPIUrl, fetchAPI, postAPI, putAPI } from '#utils/fetch';
import {
  getAPIReferrerAndOrigin,
  getAPIReferrerAndOriginClient,
  getAPIReferrerAndOriginServer,
} from '#utils/referrer-origin';
import type { ISystemConfigKey, ISystemConfigPayload, ISystemConfigRes } from '../types/system-config';
import { API_ENDPOINT } from '../utils/endpoints';
import { getOrgByDomainService } from './organizations';

export const createSystemConfigSWRKey = ({
  key,
  locales,
  domain,
}: { key: ISystemConfigKey; locales?: LanguageCode[]; domain?: string }) => {
  const { host } = getAPIReferrerAndOriginClient();
  console.info('host', host, 'domain', domain);
  return createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: {
      keys: key,
      domains: domain ?? host,
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

// OK
export async function getSystemConfigServer<T>({
  key,
  locales,
  init,
}: { key: ISystemConfigKey; locales?: LanguageCode[]; init?: RequestInit }) {
  const { host } = await getAPIReferrerAndOriginServer();
  const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  const [orgData] = await Promise.all([
    getOrgByDomainService(undefined, {
      domain: domain?.split('/')?.[0] ?? domain,
    }),
  ]);

  console.info('org', orgData?.domain);
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: {
      keys: key,
      domains: orgData?.domain || host,
      // domains: host,

      ...(locales ? { locales: locales.join(',') } : {}),
    },
  });
  const res = await fetchAPI<ISystemConfigRes<T>[]>(endpointKey, init);

  return res?.data;
}

//TODO: get domain based on host (call api get org by domain)
export const createSystemConfig = async <T>(
  endpoint: string | null | undefined,
  { payload, init, domain }: { payload: ISystemConfigPayload<T>; init?: RequestInit; domain?: string }
) => {
  const { key, data_type, value, ...rest } = payload;
  const { host } = await getAPIReferrerAndOrigin();
  // const domain = (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? '';
  // const [orgData] = await Promise.all([
  //   getOrgByDomainService(undefined, {
  //     domain: domain?.split('/')?.[0] ?? domain,
  //   }),
  // ]);

  return await postAPI<ISystemConfigRes<T>, ISystemConfigPayload<T>>(
    endpoint ?? API_ENDPOINT.ADMIN_SYSTEM_CONFIGS,
    {
      key,
      data_type: data_type ?? 'jsonb',
      domain: domain ?? host,
      value: JSON.stringify(value),
      ...rest,
    },
    init
  );
};

//TODO: get domain based on host (call api get org by domain)
export const updateSystemConfig = async <T>(
  endpoint: string | null | undefined,
  { id, payload, init, domain }: { id: string; payload: ISystemConfigPayload<T>; init?: RequestInit; domain?: string }
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
      domain: domain ?? host,
      value: JSON.stringify(value),
      ...rest,
    },
    init
  );
};

export const createOrUpdateSystemConfig = async <T>(
  endpoint: string | null | undefined,
  { id, payload, init, domain }: { id?: string; payload: ISystemConfigPayload<T>; init?: RequestInit; domain?: string }
) => {
  if (id) {
    return await updateSystemConfig(endpoint, { id, payload, init, domain });
  }
  return await createSystemConfig(endpoint, { payload, init, domain });
};
