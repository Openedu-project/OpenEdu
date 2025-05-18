import { API_ENDPOINT, decodeJWT, isTokenExpiringSoon } from '@oe/api';
import { isProtectedRoute } from '@oe/core';
import { i18nMiddleware } from '@oe/i18n';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

let isRefreshingToken = false;

// TODO: remove this after testing
// const aiOrg = ['aigov', 'phocap.ai', 'localhost'];

export async function middleware(request: NextRequest) {
  const headersList = request.headers;
  // const { host: appHost, href } = request.nextUrl;
  const xForwardedHost = headersList.get('x-forwarded-host');
  const xOriginalHost = headersList.get('x-original-host');
  const hostHeader = headersList.get('host');

  // Lấy host từ header của request gốc
  // Trong AWS Lambda, x-forwarded-host thường chứa host thực tế của request
  const actualHost = xForwardedHost || xOriginalHost || hostHeader || '';

  // Tạo URL đầy đủ dựa trên protocol và host
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const userUrl = `${protocol}://${actualHost}${request.nextUrl.pathname}${request.nextUrl.search}`;

  // Log để kiểm tra
  console.info('🚀 ~ middleware ~ request headers:', {
    xForwardedHost,
    xOriginalHost,
    hostHeader,
    actualHost,
    userUrl,
  });

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

  const isAiOrg = actualHost.includes('aigov') || actualHost.includes('phocap.ai');
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
