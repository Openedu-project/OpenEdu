import { setCookie } from '@oe/core/utils/cookie';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, options } = body;

    if (!key || value === undefined) {
      return Response.json({ error: 'key and value are required' }, { status: 400 });
    }

    await setCookie(key, value, options);

    return Response.json({ message: 'Cookie set successfully' }, { status: 200 });
  } catch {
    return Response.json({ error: 'An error occurred while setting cookie' }, { status: 500 });
  }
}
