import { setCookie } from '@oe/core/utils/cookie';
import type { NextRequest } from 'next/server';

function getCorsHeaders(origin: string | null) {
  // const allowedDomain = process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN;
  // const isAllowedOrigin = origin && (origin.endsWith(allowedDomain) || origin === process.env.NEXT_PUBLIC_APP_ORIGIN);

  return {
    'Access-Control-Allow-Origin': origin ?? '',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function POST(request: NextRequest) {
  const referer = request.headers.get('referer');
  const domain = referer ? new URL(referer).host : '';
  const corsHeaders = getCorsHeaders(referer ? new URL(referer).origin : '');
  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      for (const cookie of body) {
        const { key, value, options } = cookie;
        if (!key || value === undefined) {
          return Response.json({ error: 'key and value are required for all cookies' }, { status: 400 });
        }
        await setCookie(key, value, { ...options, domain });
      }
      return Response.json({ message: 'Multiple cookies set successfully' }, { status: 200, headers: corsHeaders });
    }
    const { key, value, options } = body;
    if (!key || value === undefined) {
      return Response.json({ error: 'key and value are required' }, { status: 400, headers: corsHeaders });
    }
    await setCookie(key, value, { ...options, domain });
    return Response.json({ message: 'Cookie set successfully' }, { status: 200, headers: corsHeaders });
  } catch {
    return Response.json({ error: 'An error occurred while setting cookie' }, { status: 500, headers: corsHeaders });
  }
}

// biome-ignore lint/suspicious/useAwait: <explanation>
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}
