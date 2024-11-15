import { baseMiddleware } from '@oe/api/utils/base-middleware';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = await baseMiddleware(request);

  return response;
}

export const config = {
  matcher: ['/((?!api/|_next/|_proxy/|_static|_vercel|admin-static/|.*\\..*|[\\w-]+\\.\\w+).*)'],
};
