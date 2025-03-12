import { baseMiddleware } from '@oe/api/utils/base-middleware';
import { ZONE_ROUTES } from '@oe/core/utils/routes';
import { getUnlocalizedPathname } from '@oe/i18n/utils';
// import { orgMiddleware } from '@oe/api/utils/org-middleware';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const unlocalizedPathname = getUnlocalizedPathname(request.nextUrl.pathname);

  const isZonePath = Object.entries(ZONE_ROUTES).some(
    ([zone, path]) => zone !== 'platform' && unlocalizedPathname.startsWith(path)
  );

  if (isZonePath) {
    return NextResponse.next();
  }

  // lỗi typecheck nên e chuyển thành any (tường)
  return await baseMiddleware(request, request.headers.get('host') || '');
}

export const config = {
  matcher: ['/((?!api/|_next/|_proxy/|_static|_vercel|admin/|.*\\..*|[\\w-]+\\.\\w+).*)'],
};
