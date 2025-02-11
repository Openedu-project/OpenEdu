import { setCookie } from '@oe/core/utils/cookie';
import type { NextRequest } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      for (const cookie of body) {
        const { key, value, options } = cookie;
        if (!key || value === undefined) {
          return Response.json({ error: 'key and value are required for all cookies' }, { status: 400 });
        }
        await setCookie(key, value, options);
      }
      return Response.json({ message: 'Multiple cookies set successfully' }, { status: 200, headers: corsHeaders });
    }
    const { key, value, options } = body;
    if (!key || value === undefined) {
      return Response.json({ error: 'key and value are required' }, { status: 400, headers: corsHeaders });
    }
    await setCookie(key, value, options);
    return Response.json({ message: 'Cookie set successfully' }, { status: 200, headers: corsHeaders });
  } catch {
    return Response.json({ error: 'An error occurred while setting cookie' }, { status: 500, headers: corsHeaders });
  }
}
