import { type IReferrerRoutes, REFERRER_ROUTES } from '@oe/core';
import { getUnlocalizedPathname } from '@oe/i18n';

const localhostPattern = /localhost(:\d+)?/g;
export function getReferrerAndOriginForAPIByUserUrl(userUrl: string) {
  const url =
    process.env.NODE_ENV === 'development'
      ? userUrl
          .replace(localhostPattern, `${process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME}`)
          .replace('http://', 'https://')
      : userUrl;
  const { pathname, origin, host } = new URL(url);
  const unlocalizedPathname = getUnlocalizedPathname(pathname);
  const [, segment1] = unlocalizedPathname.split('/');
  const dashboard = REFERRER_ROUTES[segment1 as IReferrerRoutes];
  const referrer = dashboard ? `${host}${dashboard}` : host;

  return { referrer, origin, host };
}

export async function getAPIReferrerAndOriginServer() {
  const { headers } = await import('next/headers');
  const headersList = await headers();

  // const { host: appHost, href } = new URL(headersList.get('referer') || '');
  // const xForwardedHost = headersList.get('x-forwarded-host');
  // const xOriginalHost = headersList.get('x-original-host');
  // const hostHeader = headersList.get('host');
  const userUrl = headersList.get('x-user-url');

  return getReferrerAndOriginForAPIByUserUrl(userUrl || '');
}

export function getAPIReferrerAndOriginClient() {
  if (typeof window === 'undefined') {
    return { origin: '', referrer: '', host: '' };
  }
  return getReferrerAndOriginForAPIByUserUrl(window.location.href);
}

export async function getAPIReferrerAndOrigin() {
  if (typeof window === 'undefined') {
    return await getAPIReferrerAndOriginServer();
  }
  return getReferrerAndOriginForAPIByUserUrl(window.location.href);
}
