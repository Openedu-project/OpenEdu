'use server';

import { setCookie } from '@oe/core/utils/cookie';
import { PLATFORM_ROUTES, isProtectedRoute } from '@oe/core/utils/routes';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  // revalidatePath('/', 'layout');
  await Promise.all([
    setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, '', { maxAge: 0 }),
    setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, '', { maxAge: 0 }),
  ]);
  const headersList = await headers();
  const url = headersList.get('x-url') || '';
  const { pathname } = new URL(url);

  redirect(isProtectedRoute(pathname) ? PLATFORM_ROUTES.homepage : pathname);
}
