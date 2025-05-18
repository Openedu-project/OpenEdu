import { handleGETRefreshToken, handlePOSTRefreshToken } from '@oe/api';
import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return handleGETRefreshToken(request, () => {
    revalidatePath('/');
  });
}

export async function POST(request: NextRequest) {
  return handlePOSTRefreshToken(request, () => {
    revalidatePath('/');
  });
}

// import {
//   API_ENDPOINT,
//   type HTTPResponse,
//   type IToken,
//   type SessionPayload,
//   decodeJWT,
//   encodeJWT,
//   getReferrerAndOriginForAPIByUserUrl,
//   refreshTokenExpiresIn,
// } from '@oe/api';
// import { cookieOptions, getCookieDomain } from '@oe/core';
// import { revalidatePath } from 'next/cache';
// import { type NextRequest, NextResponse } from 'next/server';

// type ErrorResponseParams = {
//   redirectUrl: string | null;
//   errorMessage: string;
//   statusCode: number;
//   redirectPath: string;
//   baseUrl: string;
//   domain?: string;
// };

// const createErrorResponse = ({
//   redirectUrl,
//   errorMessage,
//   statusCode,
//   redirectPath,
//   baseUrl,
//   domain,
// }: ErrorResponseParams) => {
//   const response = redirectUrl
//     ? NextResponse.redirect(new URL(redirectPath, baseUrl))
//     : NextResponse.json({ error: errorMessage }, { status: statusCode });
//   console.log('--------------------Error refresh token response--------------------', statusCode, response);
//   response.cookies.delete({
//     name: process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY,
//     domain: getCookieDomain(domain),
//   });
//   revalidatePath('/');
//   return response;
// };

// type RefreshParams = {
//   refreshToken: string;
//   origin?: string;
//   referrer?: string;
//   redirectUrl: string | null;
//   baseUrl: string;
//   // sessionId?: string;
//   domain?: string;
// };

// const handleTokenRefresh = async ({ refreshToken, origin, referrer, redirectUrl, baseUrl, domain }: RefreshParams) => {
//   if (!refreshToken) {
//     return createErrorResponse({
//       redirectUrl,
//       errorMessage: 'Refresh token not provided',
//       statusCode: 400,
//       redirectPath: '/',
//       baseUrl,
//       domain,
//     });
//   }

//   try {
//     // Gọi API backend để refresh token
//     const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}${API_ENDPOINT.AUTH_REFRESH_TOKEN}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-referrer': referrer || '',
//         Origin: origin || '',
//       },
//       body: JSON.stringify({ refresh_token: refreshToken }),
//     });

//     if (!refreshResponse.ok) {
//       return createErrorResponse({
//         redirectUrl,
//         errorMessage: 'Refresh failed',
//         statusCode: 401,
//         redirectPath: '/',
//         baseUrl,
//         domain,
//       });
//     }

//     const { data } = (await refreshResponse.json()) as HTTPResponse<IToken>;
//     const accessToken = data?.access_token;
//     const newRefreshToken = data?.refresh_token;

//     if (!(accessToken && newRefreshToken)) {
//       return createErrorResponse({
//         redirectUrl,
//         errorMessage: 'Invalid token data received',
//         statusCode: 500,
//         redirectPath: '/',
//         baseUrl,
//         domain,
//       });
//     }

//     // Phân tích JWT để lấy expiration
//     // const accessTokenPayload = parseJwt(accessToken);
//     const response = redirectUrl ? NextResponse.redirect(redirectUrl) : NextResponse.json(data, { status: 200 });

//     // const { accessTokenExpiry, refreshTokenExpiry } = getTokenExpiry();
//     const newSessionPayload: SessionPayload = {
//       // id: accessTokenPayload?.sub || sessionId,
//       // origin,
//       // referrer,
//       accessToken,
//       refreshToken: newRefreshToken,
//       // accessTokenExpiry,
//       // refreshTokenExpiry,
//     };

//     const newSessionToken = await encodeJWT(newSessionPayload);

//     // Set cookie mới
//     response.cookies.set({
//       name: process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY,
//       value: newSessionToken,
//       ...cookieOptions({
//         domain,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         path: '/',
//         maxAge: refreshTokenExpiresIn,
//       }),
//     });

//     return response;
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     return createErrorResponse({
//       redirectUrl,
//       errorMessage: 'Refresh failed',
//       statusCode: 500,
//       redirectPath: '/',
//       baseUrl,
//       domain,
//     });
//   }
// };

// const processRequest = async (request: NextRequest) => {
//   const { searchParams } = new URL(request.url);
//   const redirectUrl = searchParams.get('redirectUrl');
//   const session = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY)?.value;
//   const userUrl = request.headers.get('x-user-url') || undefined;
//   const { referrer, origin, host: domain } = getReferrerAndOriginForAPIByUserUrl(userUrl);

//   if (!session) {
//     return createErrorResponse({
//       redirectUrl,
//       errorMessage: 'Session not found',
//       statusCode: 404,
//       redirectPath: '/',
//       baseUrl: request.url,
//       domain,
//     });
//   }

//   try {
//     const sessionPayload = (await decodeJWT(session)) as SessionPayload;
//     const { refreshToken } = sessionPayload;

//     if (!refreshToken) {
//       return createErrorResponse({
//         redirectUrl,
//         errorMessage: 'Unauthorized',
//         statusCode: 401,
//         redirectPath: '/',
//         baseUrl: request.url,
//         domain,
//       });
//     }

//     return handleTokenRefresh({
//       refreshToken,
//       origin,
//       referrer,
//       redirectUrl,
//       baseUrl: request.url,
//       // sessionId: id,
//       domain,
//     });
//   } catch (error) {
//     console.error('Error processing session:', error);
//     return createErrorResponse({
//       redirectUrl,
//       errorMessage: 'Invalid session',
//       statusCode: 401,
//       redirectPath: '/',
//       baseUrl: request.url,
//       domain,
//     });
//   }
// };

// export async function GET(request: NextRequest) {
//   return await processRequest(request);
// }

// export async function POST(request: NextRequest) {
//   return await processRequest(request);
// }
