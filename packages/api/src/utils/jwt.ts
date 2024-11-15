export interface JWT {
  exp?: number;
}

export function parseJwt(token: string) {
  const [_, payloadEncoded] = token.split('.');
  return payloadEncoded ? (JSON.parse(Buffer.from(payloadEncoded as string, 'base64').toString()) as JWT) : {};
}

export function isTokenExpired(token?: string) {
  if (!token) {
    return false;
  }
  const payload = parseJwt(token);

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    return true;
  }
  return false;
}
