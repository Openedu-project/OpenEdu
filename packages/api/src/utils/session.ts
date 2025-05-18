import type { SessionPayload } from '#actions/session';

// export const accessTokenExpiresIn = 90; // 90 seconds để test - buffer time 60s
export const accessTokenExpiresIn = 24 * 60 * 60; // 1 day
export const refreshTokenExpiresIn = 7 * 24 * 60 * 60; // 7 days

export interface JWT {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
  exp?: number;
  next_path?: string;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  nbf?: number;
  iat?: number;
  jti?: string;
}

export function parseJwt(token: string) {
  const [_, payloadEncoded] = token.split('.');
  return payloadEncoded ? (JSON.parse(Buffer.from(payloadEncoded as string, 'base64').toString()) as JWT) : {};
}

// Hàm helper để tính thời gian hết hạn - đảm bảo tính toán nhất quán
export function getTokenExpiry() {
  return {
    accessTokenExpiry: Date.now() + accessTokenExpiresIn * 1000,
    refreshTokenExpiry: Date.now() + refreshTokenExpiresIn * 1000,
  };
}

export const isTokenExpiringSoon = (session: SessionPayload | null): boolean => {
  if (!(session?.accessTokenExpiry && session.refreshTokenExpiry)) {
    return false;
  }
  // Thêm một khoảng thời gian đệm (60 giây) để tránh trường hợp token hết hạn trong quá trình request
  const bufferTime = 60 * 1000;
  return !!(
    Date.now() >= session.accessTokenExpiry - bufferTime &&
    session.refreshToken &&
    Date.now() < session.refreshTokenExpiry
  );
};
