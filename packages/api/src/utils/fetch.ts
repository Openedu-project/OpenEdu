import { getCookies } from '@oe/core/utils/cookie';

import { clientConfig } from '@oe/core/utils/rollbar';
import { DEFAULT_LOCALE } from '@oe/i18n/constants';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import Rollbar, { type LogArgument } from 'rollbar';
import { refreshTokenService } from '#services/auth';
import type { IToken } from '#types/auth';
import type { HTTPResponse } from '#types/fetch';
import { handleError, handleResponse } from './error-handling';
import { getReferrerAndOriginForAPIByUserUrl } from './referrer-origin';

interface ICreateAPIUrl {
  endpoint: string;
  params?: Record<string, unknown>;
  queryParams?: Record<string, unknown>;
  checkEmptyParams?: boolean;
}

export type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  shouldRefreshToken?: boolean;
  referrer?: string;
  origin?: string;
};

export interface RequestInitAPI extends RequestInit {
  host?: string;
  token?: string;
  cookies?: () => ReadonlyRequestCookies;
  [key: string]: unknown;
}

let isRefreshing = false;
let refreshPromise: Promise<IToken | null> | null = null;

export const createQueryParams = <T extends Record<string, unknown>>(obj: T): string =>
  Object.entries(obj)
    .flatMap(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        return [];
      }
      if (Array.isArray(value)) {
        return value.map(item => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
      }
      return [`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`];
    })
    .join('&');

export const createAPIUrl = ({ endpoint, params, queryParams, checkEmptyParams = false }: ICreateAPIUrl) => {
  let url = endpoint;

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      // Check empty params turn-of and params was undefined
      url = checkEmptyParams && !value ? url.replace(`/:${key}`, '') : url.replace(`:${key}`, value as string);
    }
  }

  if (queryParams) {
    url += `?${createQueryParams(queryParams)}`;
  }

  return url;
};

export async function fetchAPI<T>(url: string, options: FetchOptions = {}): Promise<HTTPResponse<T>> {
  const urlAPI = url.startsWith('https://') ? url : `${process.env.NEXT_PUBLIC_API_ORIGIN}${url}`;
  const defaultOptions: FetchOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const shouldRefreshToken = options.shouldRefreshToken ?? true;

  const cookies = await getCookies();
  let origin = options.origin;
  let referrer = options.referrer;

  if (typeof window !== 'undefined') {
    const urlInfo = getReferrerAndOriginForAPIByUserUrl(window.location.href);
    origin = origin ?? urlInfo.origin;
    referrer = referrer ?? urlInfo.referrer;
  } else {
    origin = origin ?? cookies?.[process.env.NEXT_PUBLIC_COOKIE_API_ORIGIN_KEY];
    referrer = referrer ?? cookies?.[process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY];
  }
  const accessToken = cookies?.[process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY];
  const locale = cookies?.[process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY];

  const urlAPIWithLocale = new URL(urlAPI);
  urlAPIWithLocale.searchParams.set('locale', urlAPIWithLocale.searchParams.get('locale') ?? locale ?? DEFAULT_LOCALE);
  const queryParams = urlAPIWithLocale.searchParams.toString();
  const tag = `${urlAPIWithLocale.pathname}${queryParams ? `?${queryParams}` : ''}`;
  const rollbar = new Rollbar(clientConfig);

  const headers = {
    ...defaultOptions.headers,
    ...options.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(referrer ? { 'X-referrer': decodeURIComponent(referrer) } : {}),
    ...(origin ? { Origin: decodeURIComponent(origin) } : {}),
  };
  const mergedOptions: FetchOptions = {
    // cache: 'force-cache',
    next: {
      ...options.next,
      tags: [...(options.next?.tags || []), tag],
    },
    ...defaultOptions,
    ...options,
    headers,
    referrer: origin,
  };

  let retryCount = 0;
  const MAX_RETRIES = 1;

  async function attemptFetch(): Promise<Response> {
    const response = await fetch(urlAPIWithLocale, mergedOptions);
    if (response.status === 401 && shouldRefreshToken && retryCount < MAX_RETRIES) {
      retryCount++;
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshTokenService({
          origin: origin,
          referrer: referrer,
          refreshToken: cookies?.[process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY],
        }).finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      }

      const token = await refreshPromise;
      if (token) {
        mergedOptions.headers = {
          ...mergedOptions.headers,
          Authorization: `Bearer ${token.access_token}`,
        };
      }
      return attemptFetch();
    }
    return response;
  }
  try {
    const response = await attemptFetch();
    const res = await handleResponse(response);
    return res as HTTPResponse<T>;
  } catch (error) {
    rollbar.error(error as LogArgument);

    console.error('--------------Fetch Error--------------------', (error as Error).message);
    throw handleError(error);
  }
}

export const postAPI = async <Data, Payload>(endpoint: string, payload: Payload, init: FetchOptions = {}) =>
  await fetchAPI<Data>(endpoint, {
    cache: 'no-cache',
    ...init,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    ...(payload && { body: JSON.stringify(payload) }),
  });

export const putAPI = async <Data, Payload>(endpoint: string, payload: Payload, init: FetchOptions = {}) =>
  await fetchAPI<Data>(endpoint, {
    cache: 'no-store',
    ...init,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    ...(payload && { body: JSON.stringify(payload) }),
  });
export const patchAPI = async <Data, Payload>(endpoint: string, payload: Payload, init: FetchOptions = {}) =>
  await fetchAPI<Data>(endpoint, {
    cache: 'no-store',
    ...init,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    ...(payload && { body: JSON.stringify(payload) }),
  });

export const deleteAPI = async <Data, Payload>(endpoint: string, payload?: Payload, init: FetchOptions = {}) =>
  await fetchAPI<Data>(endpoint, {
    cache: 'no-store',
    ...init,
    method: 'DELETE',
    ...(payload && { body: JSON.stringify(payload) }),
  });
