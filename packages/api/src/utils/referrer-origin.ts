import { type IReferrerRoutes, REFERRER_ROUTES } from '@oe/core';
import { getUnlocalizedPathname } from '@oe/i18n';

const localhostPattern = /localhost(:\d+)?/g;
export function getReferrerAndOriginForAPIByUserUrl(userUrl: string) {
  const url =
    process.env.NODE_ENV === 'development'
      ? userUrl.replace(localhostPattern, `${process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME}`)
      : userUrl;
  const { pathname, origin, host } = new URL(url);
  const unlocalizedPathname = getUnlocalizedPathname(pathname);
  const [, segment1] = unlocalizedPathname.split('/');
  const dashboard = REFERRER_ROUTES[segment1 as IReferrerRoutes];
  const referrer = dashboard ? `${host}${dashboard}` : host;

  return { referrer, origin, host };
}

export async function getAPIReferrerAndOriginServer() {
  const { cookies } = await import('next/headers');
  const cookiesList = await cookies();

  const origin = cookiesList.get(process.env.NEXT_PUBLIC_COOKIE_API_ORIGIN_KEY)?.value;
  const referrer = cookiesList.get(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)?.value;

  return { origin, referrer, host: origin ? new URL(origin).host : '' };
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
