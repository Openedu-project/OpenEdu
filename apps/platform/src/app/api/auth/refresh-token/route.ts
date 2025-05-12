// // import { encode } from 'next-auth/jwt';
// import { type IToken, type SessionPayload, encodeJWT, getSession, getTokenExpiry, handleResponse } from '@oe/api';
// import { API_ENDPOINT } from '@oe/api';
// import { type NextRequest, NextResponse } from 'next/server';

// // Biến toàn cục để theo dõi refresh đang diễn ra
// // let refreshTokenPromise: Promise<Response> | null = null;

// // exportNextRequest,  const POST = auth(handlePOST) as any;

// export async function GET(request: NextRequest) {
//   const redirectUrl = new URL(request.url).searchParams.get('redirectUrl');

//   // Lấy session hiện tại
//   const session = await getSession();

//   if (!session?.refreshToken) {
//     // Không có refresh token, chuyển hướng đến trang đăng nhập
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   try {
//     const tokenResponse = await refreshAccessToken(session.refreshToken, session.origin, session.referrer);
//     // Tính thời gian hết hạn mới
//     const { accessTokenExpiry, refreshTokenExpiry } = getTokenExpiry();

//     // Tạo session mới với token đã làm mới
//     const sessionPayload: SessionPayload = {
//       id: session.id,
//       origin: session.origin,
//       referrer: session.referrer,
//       accessToken: tokenResponse?.access_token,
//       refreshToken: tokenResponse?.refresh_token || session.refreshToken,
//       accessTokenExpiry,
//       refreshTokenExpiry,
//     };

//     // Mã hóa session mới
//     const newSessionToken = await encodeJWT(sessionPayload);

//     // Tạo response chuyển hướng và cài đặt cookie mới
//     const response = NextResponse.redirect(redirectUrl ?? '/');
//     response.cookies.set(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY, newSessionToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: refreshTokenExpiry / 1000, // Chuyển đổi từ milliseconds sang seconds
//       path: '/',
//       sameSite: 'strict',
//     });

//     return response;
//   } catch (error) {
//     console.error('Lỗi khi làm mới token:', error);
//     // Chuyển hướng đến trang đăng nhập khi có lỗi
//     return NextResponse.redirect(new URL('/', request.url));
//   }
// }

// async function refreshAccessToken(refreshToken: string, origin?: string, referrer?: string): Promise<IToken | null> {
//   try {
//     console.info('[Auth.js] Refreshing token', refreshToken, origin, referrer);
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}${API_ENDPOINT.AUTH_REFRESH_TOKEN}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-referrer': referrer || '',
//         Origin: origin || '',
//       },
//       body: JSON.stringify({
//         refresh_token: refreshToken,
//       }),
//       cache: 'no-store',
//     });

//     const { data } = await handleResponse<IToken>(response);
//     console.info('[Auth.js] Token refreshed successfully', data);

//     return data;
//   } catch (error) {
//     console.error('[Auth.js] Token refresh failed', error);
//     // throw handleError(error);
//     return null;
//   }
// }

import {
  API_ENDPOINT,
  type HTTPResponse,
  type IToken,
  type SessionPayload,
  decodeJWT,
  encodeJWT,
  getTokenExpiry,
  parseJwt,
} from '@oe/api';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
// import { jwtVerify, SignJWT } from 'jose';

const createErrorResponse = ({
  isAjax,
  errorMessage,
  statusCode,
  redirectPath,
  baseUrl,
}: { isAjax: boolean; errorMessage: string; statusCode: number; redirectPath: string; baseUrl: string }) => {
  return isAjax
    ? NextResponse.json({ error: errorMessage }, { status: statusCode })
    : NextResponse.redirect(new URL(redirectPath, baseUrl));
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get('redirectUrl') || '/';
  const isAjax = searchParams.get('ajax') === 'true';

  const cookieStore = await cookies();

  // Lấy refresh token từ cookie
  const session = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY)?.value;

  if (!session) {
    return createErrorResponse({
      isAjax,
      errorMessage: 'Session not found',
      statusCode: 404,
      redirectPath: '/',
      baseUrl: request.url,
    });
  }

  const sessionPayload = await decodeJWT(session);
  const { refreshToken, origin, referrer } = sessionPayload as SessionPayload;

  if (!(refreshToken || origin || referrer)) {
    return createErrorResponse({
      isAjax,
      errorMessage: 'Unauthorized',
      statusCode: 401,
      redirectPath: '/',
      baseUrl: request.url,
    });
  }

  try {
    // Gọi API backend để refresh token
    const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}${API_ENDPOINT.AUTH_REFRESH_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-referrer': referrer as string, Origin: origin as string },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!refreshResponse.ok) {
      // Xóa cookie và redirect đến login
      cookieStore.delete(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY);

      return createErrorResponse({
        isAjax,
        errorMessage: 'Refresh failed',
        statusCode: 401,
        redirectPath: '/',
        baseUrl: request.url,
      });
    }

    const { data } = (await refreshResponse.json()) as HTTPResponse<IToken>;
    const access_token = data?.access_token;
    const refresh_token = data?.refresh_token;

    console.log('===============Refresh token================', data);

    // Phân tích JWT để lấy expiration
    const accessTokenPayload = parseJwt(access_token);
    // const maxAge = accessTokenPayload.exp ? accessTokenPayload.exp - Math.floor(Date.now() / 1000) : 0;

    // Tạo response
    const response = isAjax ? NextResponse.json(data, { status: 200 }) : NextResponse.redirect(redirectUrl);

    const { accessTokenExpiry, refreshTokenExpiry } = getTokenExpiry();
    const newSessionPayload: SessionPayload = {
      id: accessTokenPayload?.sub || sessionPayload?.id,
      origin: sessionPayload?.origin,
      referrer: sessionPayload?.referrer,
      accessToken: access_token,
      refreshToken: refresh_token,
      accessTokenExpiry,
      refreshTokenExpiry,
    };

    const newSessionToken = await encodeJWT(newSessionPayload);
    // Set cookie mới
    response.cookies.set({
      name: process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY,
      value: newSessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: refreshTokenExpiry / 1000,
    });

    return response;
  } catch (error) {
    console.error('Error refreshing token:', error);

    return createErrorResponse({
      isAjax,
      errorMessage: 'Refresh failed',
      statusCode: 500,
      redirectPath: '/',
      baseUrl: request.url,
    });
  }
}
