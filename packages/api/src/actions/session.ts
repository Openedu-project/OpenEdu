'use server';
import { cookieOptions, getCookieDomain } from '@oe/core';
import { SignJWT, jwtVerify } from 'jose';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { getAPIReferrerAndOrigin } from '#utils/referrer-origin';
import { getTokenExpiry, refreshTokenExpiresIn } from '#utils/session';

// Định nghĩa interface cho SessionPayload
export type SessionPayload = {
  // id?: string;
  // origin?: string;
  // referrer?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiry?: number;
  refreshTokenExpiry?: number;
  // nextPath?: string;
};

// Bí mật để ký JWT - nên lưu trong biến môi trường
const AUTH_SECRET = process.env.AUTH_SECRET;
console.info('🚀 ~ AUTH_SECRET:', !!AUTH_SECRET, AUTH_SECRET?.length);
// Chuyển đổi secret string thành Uint8Array (yêu cầu cho jose)
const secretKey = new TextEncoder().encode(AUTH_SECRET);

/**
 * Mã hóa payload thành JWT được ký
 */
export async function encodeJWT(payload: SessionPayload): Promise<string> {
  try {
    const { accessTokenExpiry, refreshTokenExpiry } = getTokenExpiry();
    return await new SignJWT({ ...payload, accessTokenExpiry, refreshTokenExpiry })
      .setProtectedHeader({ alg: 'HS256' }) // Sử dụng thuật toán HS256
      .setIssuedAt() // Thời gian tạo token
      .setExpirationTime('7d') // Token hết hạn sau 1 giờ - có thể điều chỉnh
      .sign(secretKey);
  } catch (error) {
    console.error('Error encoding JWT:', error);
    throw new Error('Failed to encode session data');
  }
}

/**
 * Giải mã và xác thực JWT
 */
export async function decodeJWT(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

/**
 * Lưu trữ token phiên trong cookie HTTP-only
 */
export async function setSessionCookie(payload: SessionPayload): Promise<void> {
  try {
    const [token, cookiesStore, { host }] = await Promise.all([
      encodeJWT(payload),
      cookies(),
      getAPIReferrerAndOrigin(),
    ]);
    cookiesStore.set(
      process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY,
      token,
      cookieOptions({
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: refreshTokenExpiresIn,
        path: '/',
        domain: host,
      })
    );
  } catch (error) {
    console.error('Error setting session cookie:', error);
    throw new Error('Failed to save session');
  }
}

/**
 * Lấy và xác thực session từ cookie
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookiesStore = await cookies();
  const sessionCookie = cookiesStore.get(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY);

  if (!sessionCookie?.value) {
    return null;
  }

  return await decodeJWT(sessionCookie.value);
}

/**
 * Xóa cookie phiên đăng nhập
 */
export async function clearSession(): Promise<void> {
  const [{ host }, cookiesStore] = await Promise.all([getAPIReferrerAndOrigin(), cookies()]);
  const domain = getCookieDomain(host);
  cookiesStore.delete({
    name: process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY,
    domain,
  });
}

export async function setSessionRevalidatePath(payload: SessionPayload): Promise<SessionPayload | null> {
  await setSessionCookie(payload);
  revalidatePath('/');
  return payload;
}
