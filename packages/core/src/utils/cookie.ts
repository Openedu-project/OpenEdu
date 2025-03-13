import {
  type CookieValueTypes,
  getCookie as getCookieNextClient,
  getCookies as getCookiesNextClient,
  setCookie as setCookieNextClient,
} from 'cookies-next/client';
import type { NextRequest, NextResponse } from 'next/server';

export const stringify = (value: unknown) => {
  try {
    if (typeof value === 'string') {
      return value;
    }
    const stringifiedValue = JSON.stringify(value);
    return stringifiedValue;
  } catch {
    return value as string;
  }
};

export type AppRouterCookies = NextResponse['cookies'] | NextRequest['cookies'];
export interface CookieOptions {
  domain?: string | undefined;
  expires?: Date | undefined;
  httpOnly?: boolean | undefined;
  maxAge?: number | undefined;
  path?: string | undefined;
  priority?: 'low' | 'medium' | 'high' | undefined;
  sameSite?: true | false | 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean | undefined;
}

export const defaultExpiredTime = 7 * 86400; // 7 days for refresh token expired
// export const defaultExpiredTime = 40; // 40s
export const cookieOptions = (options?: CookieOptions): CookieOptions => {
  return {
    // secure: process.env.NODE_ENV !== 'development',
    sameSite: 'none',
    secure: true,
    path: '/',
    maxAge: defaultExpiredTime,
    ...(process.env.NODE_ENV === 'development'
      ? {}
      : { domain: options?.domain ?? process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN }),
    ...options,
  };
};

export const getCookieClient = (key: string, options?: CookieOptions) => {
  if (typeof window === 'undefined') {
    return '';
  }
  const domain = new URL(window.location.href).host;
  return getCookieNextClient(key, cookieOptions({ ...options, domain }));
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const setCookieClient = (key: string, value: any, options?: CookieOptions) => {
  if (typeof window === 'undefined') {
    return;
  }
  const domain = new URL(window.location.href).host;
  return setCookieNextClient(key, value, cookieOptions({ ...options, domain }));
};

export const getCookie = async (key: string, options?: CookieOptions): Promise<CookieValueTypes> => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const serverCookies = await cookies();
    return serverCookies.get(key)?.value;
  }
  const domain = new URL(window.location.href).host;
  return getCookieNextClient(key, cookieOptions({ ...options, domain }));
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const setCookie = async (key: string, value: any, options?: CookieOptions): Promise<void> => {
  if (typeof window === 'undefined') {
    const { cookies, headers } = await import('next/headers');
    const serverCookies = await cookies();
    const serverHeaders = await headers();
    const referer = serverHeaders.get('referer');
    const domain = referer ? new URL(referer).host : '';

    const payload = { name: key, value: stringify(value), ...cookieOptions({ ...options, domain }) };
    serverCookies.set(payload);
  } else {
    setCookieNextClient(key, value, cookieOptions(options));
  }
};

export const deleteCookie = async (key: string, options?: CookieOptions): Promise<void> => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const serverCookies = await cookies();
    serverCookies.delete(key);
  } else {
    const domain = new URL(window.location.href).host;
    await setCookie(key, '', { ...cookieOptions({ ...options, domain }), maxAge: 0 });
  }
};

export const getCookies = async (options?: CookieOptions) => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const serverCookies = await cookies();
    const cookiesMap = Object.fromEntries(serverCookies.getAll().map(({ name, value }) => [name, value]));
    return cookiesMap;
  }
  const domain = new URL(window.location.href).host;
  return getCookiesNextClient(cookieOptions({ ...options, domain }));
};
