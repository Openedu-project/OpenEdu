import { API_ENDPOINT, decodeJWT, isTokenExpiringSoon } from '@oe/api';
import { isProtectedRoute } from '@oe/core';
import { i18nMiddleware } from '@oe/i18n';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

let isRefreshingToken = false;

// TODO: remove this after testing
// const aiOrg = ['aigov', 'phocap.ai', 'localhost'];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY)?.value;
  if (session) {
    const decodedSession = await decodeJWT(session);
    console.info('🚀 ~ middleware ~ decodedSession:', decodedSession, isRefreshingToken);
    if (isTokenExpiringSoon(decodedSession) && !isRefreshingToken) {
      isRefreshingToken = true;
      return NextResponse.redirect(new URL(`${API_ENDPOINT.REFRESH_TOKEN}?redirectUrl=${request.url}`, request.url));
    }
  } else if (!session && isProtectedRoute(request.nextUrl.pathname)) {
    request.nextUrl.pathname = '/unauthorized';
  }

  isRefreshingToken = false;

  const headersList = request.headers;
  const { host: appHost, href } = request.nextUrl;
  const xForwardedHost = headersList.get('x-forwarded-host');
  const xOriginalHost = headersList.get('x-original-host');
  const hostHeader = headersList.get('host');
  const userUrl = href.replace(appHost, xForwardedHost || xOriginalHost || hostHeader || '');
  const isAiOrg = appHost.includes('aigov') || appHost.includes('phocap.ai');
  console.info('🚀 ~ middleware ~ userUrl:', userUrl, isAiOrg);
  const response = isAiOrg
    ? createMiddleware({
        locales: ['vi'],
        defaultLocale: 'vi',
        localeCookie: {
          name: process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY,
          maxAge: 60 * 60 * 24 * 365,
        },
        localeDetection: false,
      })(request)
    : i18nMiddleware(request);
  response.headers.set('x-user-url', userUrl);

  return response;
}

export const config = {
  matcher: ['/((?!api/|_next/|_proxy/|_static|_vercel|.*\\..*|[\\w-]+\\.\\w+).*)'],
};
