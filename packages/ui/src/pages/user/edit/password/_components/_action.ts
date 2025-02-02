'use server';

import { setCookie } from '@oe/core/utils/cookie';
import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function logoutProfileAction(isLogin: boolean) {
  await Promise.all([
    setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, '', { maxAge: 0 }),
    setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, '', { maxAge: 0 }),
  ]);

  revalidatePath('/', 'layout');
  redirect(isLogin ? AUTH_ROUTES.login : AUTH_ROUTES.forgotPassword);
}
