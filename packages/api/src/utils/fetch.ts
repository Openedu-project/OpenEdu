import { Mutex } from 'async-mutex';
import { cache } from 'react';
import type { IToken } from '#types/auth';
import type { HTTPResponse } from '#types/fetch';
import { getSession } from '../actions/session';
import { API_ENDPOINT } from './endpoints';
import { handleError, handleResponse } from './error-handling';
import { getAPIReferrerAndOrigin } from './referrer-origin';
import { isTokenExpiringSoon } from './session';
export type FetchOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  referrer?: string;
  origin?: string;
  timeout?: number;
};

const tokenRenewalMutex = new Mutex();
const isServer = () => typeof window === 'undefined';
const MAX_RETRY_ATTEMPTS = 1; // Giới hạn số lần thử lại
const DEFAULT_TIMEOUT = 30000; // 30 giây

const safeDecodeURIComponent = (str: string): string => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

const refreshToken = async (): Promise<IToken | null> => {
  if (tokenRenewalMutex.isLocked()) {
    await tokenRenewalMutex.waitForUnlock();
  }

  const session = await getSession();
  if (session?.accessToken && !isTokenExpiringSoon(session)) {
    return {
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
    } as IToken;
  }

  const release = await tokenRenewalMutex.acquire();
  try {
    const latestSession = await getSession();
    if (latestSession?.accessToken && !isTokenExpiringSoon(latestSession)) {
      return {
        access_token: latestSession.accessToken,
        refresh_token: latestSession.refreshToken,
      } as IToken;
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_ORIGIN;
    const refreshUrl = baseUrl ? `${baseUrl}${API_ENDPOINT.REFRESH_TOKEN}` : `${API_ENDPOINT.REFRESH_TOKEN}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

    const response = await fetch(`${refreshUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const tokens = await response.json();

    return tokens;
  } catch {
    return null;
  } finally {
    release();
  }
};

/**
 * Client component fetch with auth
 */
async function isomorphicFetch<T>(url: string, options: FetchOptions = {}): Promise<HTTPResponse<T>> {
  const start = performance.now();
  const timeout = options.timeout || DEFAULT_TIMEOUT;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Lấy session data từ client
    const session = await getSession();

    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    } as Record<string, string>;

    if (!(headers?.referrer || headers?.origin)) {
      const { referrer, origin } = await getAPIReferrerAndOrigin();
      headers['X-referrer'] = safeDecodeURIComponent(referrer);
      headers.Origin = safeDecodeURIComponent(origin);
    }

    if (headers?.origin) {
      headers.Origin = safeDecodeURIComponent(headers.origin);
    }

    if (headers?.referrer) {
      headers['X-referrer'] = safeDecodeURIComponent(headers.referrer);
    }

    const fetchOptions = {
      ...options,
      headers,
      signal: controller.signal,
    };

    if (session?.accessToken) {
      if (isTokenExpiringSoon(session)) {
        const tokens = await refreshToken();

        fetchOptions.headers = {
          ...headers,
          Authorization: `Bearer ${tokens?.access_token || session.accessToken}`,
        };
      } else {
        fetchOptions.headers = {
          ...headers,
          Authorization: `Bearer ${session.accessToken}`,
        };
      }
    }

    async function performRequest<T>(retryCount = 0): Promise<Response> {
      try {
        const fetchResponse = await fetch(url, fetchOptions);

        if (fetchResponse.status === 401 && session?.refreshToken && retryCount < MAX_RETRY_ATTEMPTS) {
          const tokens = await refreshToken();

          fetchOptions.headers = {
            ...headers,
            Authorization: `Bearer ${tokens?.access_token || session.accessToken}`,
          };

          return await performRequest<T>(retryCount + 1);
        }

        return fetchResponse;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error(`Request timeout after ${timeout}ms`);
        }
        throw error;
      }
    }

    const response = await performRequest();
    const res = await handleResponse(response);
    return res as HTTPResponse<T>;
  } catch (error) {
    throw handleError(error);
  } finally {
    clearTimeout(timeoutId);
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
      console.info('🚀 - isomorphicFetch total time', url, performance.now() - start);
    }
  }
}

const serverFetch = cache(isomorphicFetch);

export const fetchAPI = async <T>(url: string, options: FetchOptions = {}): Promise<HTTPResponse<T>> => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}${url}`;

  // Sử dụng phương thức fetch phù hợp dựa trên môi trường
  return isServer() ? await serverFetch(fullUrl, options) : await isomorphicFetch(fullUrl, options);
};
export const postAPI = <T, D>(
  url: string,
  data?: D,
  options?: Omit<FetchOptions, 'method' | 'body'>
): Promise<HTTPResponse<T>> => {
  const body = JSON.stringify(data);
  return fetchAPI(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body,
  });
};
export const putAPI = <T, D>(
  url: string,
  data?: D,
  options?: Omit<FetchOptions, 'method' | 'body'>
): Promise<HTTPResponse<T>> => {
  const body = JSON.stringify(data);
  return fetchAPI(url, { ...options, method: 'PUT', body });
};

export const patchAPI = <T, D>(
  url: string,
  data?: D,
  options?: Omit<FetchOptions, 'method' | 'body'>
): Promise<HTTPResponse<T>> => {
  const body = JSON.stringify(data);
  return fetchAPI(url, { ...options, method: 'PATCH', body });
};

export const deleteAPI = <T, D>(
  url: string,
  data?: D,
  options?: Omit<FetchOptions, 'method'>
): Promise<HTTPResponse<T>> => {
  const body = JSON.stringify(data);
  return fetchAPI(url, { ...options, method: 'DELETE', body });
};
