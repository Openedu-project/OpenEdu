import {
  API_ENDPOINT,
  type IToken,
  type SessionPayload,
  decodeJWT,
  getReferrerAndOriginForAPIByUserUrl,
  getTokenExpiry,
  isTokenExpiringSoon,
  parseJwt,
} from '@oe/api';
import { base64ToJson, isProtectedRoute } from '@oe/core';
import { i18nMiddleware } from '@oe/i18n';
import { NextRequest, NextResponse } from 'next/server';

let isRefreshingToken = false;

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

  const oauthToken = request.nextUrl.searchParams.get('oauth_token');
  if (oauthToken) {
    const authToken = base64ToJson(oauthToken);
    const { access_token, refresh_token } = authToken as unknown as IToken;
    request.nextUrl.pathname = new URL(request.nextUrl).pathname;
    request.nextUrl.searchParams.delete('oauth_token');
    const newRequest = new NextRequest(request.nextUrl, request.clone());
    const response = NextResponse.redirect(newRequest.nextUrl.toString());

    const { origin, referrer } = getReferrerAndOriginForAPIByUserUrl(userUrl);
    const { accessTokenExpiry, refreshTokenExpiry } = getTokenExpiry();
    const decodedAccessToken = parseJwt(access_token);
    const sessionPayload: SessionPayload = {
      id: decodedAccessToken?.sub || decodedAccessToken?.id,
      origin: origin,
      referrer: referrer,
      accessToken: access_token,
      refreshToken: refresh_token,
      accessTokenExpiry: accessTokenExpiry,
      refreshTokenExpiry: refreshTokenExpiry,
      nextPath: decodedAccessToken.next_path,
    };

    response.cookies.set({
      name: process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY,
      value: JSON.stringify(sessionPayload),
      httpOnly: true, // Cookie không thể truy cập bằng JavaScript
      secure: process.env.NODE_ENV === 'production', // Chỉ gửi qua HTTPS trong môi trường production
      sameSite: 'strict', // Bảo vệ khỏi tấn công CSRF
      maxAge: refreshTokenExpiry / 1000,
      path: '/', // Cookie khả dụng cho toàn bộ trang web,
      ...(process.env.NODE_ENV === 'development'
        ? { domain: undefined }
        : { domain: process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN }),
    });

    return response;
  }

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

  const response = i18nMiddleware(request);
  response.headers.set('x-user-url', userUrl);

  return response;
}

export const config = {
  matcher: ['/((?!api/|_next/|_proxy/|_static|_vercel|.*\\..*|[\\w-]+\\.\\w+).*)'],
};
