import { decodeJWT, isTokenExpiringSoon } from '@oe/api';
import { i18nMiddleware } from '@oe/i18n';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY)?.value;
  if (session) {
    const decodedSession = await decodeJWT(session);
    if (isTokenExpiringSoon(decodedSession)) {
      return NextResponse.redirect(new URL(`/api/auth/refresh-token?redirectUrl=${request.url}`, request.url));
    }
  }

  const headersList = request.headers;
  const { host: appHost, href } = request.nextUrl;
  const xForwardedHost = headersList.get('x-forwarded-host');
  const xOriginalHost = headersList.get('x-original-host');
  const hostHeader = headersList.get('host');
  const userUrl = href.replace(appHost, xForwardedHost || xOriginalHost || hostHeader || '');
  console.info('🚀 ~ middleware ~ userUrl:', userUrl);
  const response = i18nMiddleware(request);
  response.headers.set('x-user-url', userUrl);

  return response;
}

export const config = {
  matcher: ['/((?!api/|_next/|_proxy/|_static|_vercel|.*\\..*|[\\w-]+\\.\\w+).*)'],
};
