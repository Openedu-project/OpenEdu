import { cookieOptions } from '@oe/core/utils/cookie';
import { PLATFORM_ROUTES, isProtectedRoute } from '@oe/core/utils/routes';
import { DEFAULT_LOCALE } from '@oe/i18n/constants';
import { NextRequest, NextResponse } from 'next/server';
import { meMiddlewareService, refreshTokenMiddlewareService } from '#services/auth';
import { getI18nResponseMiddleware } from '#services/i18n';
import { getOrganizationByHostMiddleware } from '#services/organizations';
import { isTokenExpired } from './jwt';

import { base64ToJson } from '@oe/core/utils/decoded-token';
import { getLocaleFromPathname } from '@oe/i18n/utils';
import type { IToken } from '#types/auth';
import { getReferrerAndOriginForAPIByUserUrl } from './referrer-origin';

export async function baseMiddleware(request: NextRequest, host?: string | null) {
  const { host: appHost } = request.nextUrl;
  const appUrl = request.nextUrl.toString();
  const userHost = host ?? request.headers.get('x-forwarded-host') ?? appHost;
  const userUrl = appUrl.replace(appHost, userHost);
  const { origin, referrer } = getReferrerAndOriginForAPIByUserUrl(userUrl);
  const domain = new URL(userUrl).host;

  const oauthToken = request.nextUrl.searchParams.get('oauth_token');
  if (oauthToken) {
    const authToken = base64ToJson(oauthToken);
    const { access_token, refresh_token } = authToken as unknown as IToken;
    request.nextUrl.pathname = new URL(request.nextUrl).pathname;
    request.nextUrl.searchParams.delete('oauth_token');
    const newRequest = new NextRequest(request.nextUrl, request.clone());
    const response = NextResponse.redirect(newRequest.nextUrl.toString());

    response.cookies.set({
      name: process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY,
      value: access_token,
      ...cookieOptions({ domain }),
    });
    response.cookies.set({
      name: process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY,
      value: refresh_token,
      ...cookieOptions({ domain }),
    });

    return response;
  }

  let i18nResponse = await getI18nResponseMiddleware(referrer, origin, request);
  i18nResponse.cookies.set({
    name: process.env.NEXT_PUBLIC_COOKIE_API_ORIGIN_KEY,
    value: origin,
    ...cookieOptions({ domain }),
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  i18nResponse.cookies.set({
    name: process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY,
    value: referrer,
    ...cookieOptions({ domain }),
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  i18nResponse.headers.set('x-url', request.nextUrl.toString());

  // OpenEdu no need to check
  if (new URL(origin).host !== process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME) {
    const organization = await getOrganizationByHostMiddleware(referrer, origin);

    console.info('----------------------organization---------------------', organization);
    if (!organization) {
      return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}${PLATFORM_ROUTES.orgNotFound}`, appUrl));
    }
  }

  let accessToken = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY)?.value;
  const isAccessTokenExpired = isTokenExpired(accessToken);
  console.info(
    '================accessToken==============',
    accessToken,
    request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY)?.value
  );
  console.info('================isAccessTokenExpired==============', isAccessTokenExpired);
  if (accessToken && isAccessTokenExpired) {
    const { response, ...rest } = await refreshTokenMiddlewareService({
      referrer,
      origin,
      req: request,
      res: i18nResponse,
    });
    i18nResponse = response;

    accessToken = (rest as IToken).access_token;
  }

  const isProtected = isProtectedRoute(request.nextUrl.pathname);
  if (isProtected) {
    const me = await meMiddlewareService({ referrer, origin, accessToken, req: request, res: i18nResponse });
    if (!me) {
      const locale = getLocaleFromPathname(request.nextUrl.pathname);
      return NextResponse.rewrite(new URL(`/${locale}${PLATFORM_ROUTES.unauthorized}`, appUrl));
    }
  }

  return i18nResponse;
}
