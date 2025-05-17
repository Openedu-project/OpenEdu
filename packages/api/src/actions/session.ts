'use server';
import { SignJWT, jwtVerify } from 'jose';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { getAPIReferrerAndOrigin } from '#utils/referrer-origin';
import { getTokenExpiry, parseJwt, refreshTokenExpiresIn } from '#utils/session';

// Định nghĩa interface cho SessionPayload
export type SessionPayload = {
  id?: string;
  origin?: string;
  referrer?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiry?: number;
  refreshTokenExpiry?: number;
  nextPath?: string;
};

// Bí mật để ký JWT - nên lưu trong biến môi trường
const AUTH_SECRET = process.env.AUTH_SECRET;
console.log('🚀 ~ AUTH_SECRET:', !!AUTH_SECRET, AUTH_SECRET?.length);
// Chuyển đổi secret string thành Uint8Array (yêu cầu cho jose)
const secretKey = new TextEncoder().encode(AUTH_SECRET);

/**
 * Mã hóa payload thành JWT được ký
 */
export async function encodeJWT(payload: SessionPayload): Promise<string> {
  try {
    return await new SignJWT(payload)
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
    const token = await encodeJWT(payload);
    const cookiesStore = await cookies();
    // Thiết lập cookie với các tùy chọn bảo mật
    cookiesStore.set(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY, token, {
      httpOnly: true, // Cookie không thể truy cập bằng JavaScript
      secure: process.env.NODE_ENV === 'production', // Chỉ gửi qua HTTPS trong môi trường production
      sameSite: 'strict', // Bảo vệ khỏi tấn công CSRF
      maxAge: payload.refreshTokenExpiry ? payload.refreshTokenExpiry / 1000 : refreshTokenExpiresIn,
      path: '/', // Cookie khả dụng cho toàn bộ trang web,
      ...(process.env.NODE_ENV === 'development'
        ? { domain: undefined }
        : { domain: process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN }),
    });
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
  const cookiesStore = await cookies();
  cookiesStore.set(process.env.NEXT_PUBLIC_COOKIE_SESSION_KEY, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
}

export async function setSessionPayload(accessToken: string, refreshToken: string): Promise<SessionPayload | null> {
  const { origin, referrer } = await getAPIReferrerAndOrigin();
  const { accessTokenExpiry, refreshTokenExpiry } = getTokenExpiry();
  const decodedAccessToken = parseJwt(accessToken);
  const sessionPayload: SessionPayload = {
    id: decodedAccessToken?.sub || decodedAccessToken?.id,
    origin: origin,
    referrer: referrer,
    accessToken: accessToken,
    refreshToken: refreshToken,
    accessTokenExpiry: accessTokenExpiry,
    refreshTokenExpiry: refreshTokenExpiry,
    nextPath: decodedAccessToken.next_path,
  };
  await setSessionCookie(sessionPayload);
  revalidatePath('/');
  return sessionPayload;
}
