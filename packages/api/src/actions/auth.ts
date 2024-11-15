'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { loginSchema } from '#schemas/loginSchema';
import { loginService } from '#services/auth';
import { fromErrorToFormState } from '#utils/form';

import { setCookie } from '@oe/core/utils/cookie';
import type { FormActionState } from '#utils/form';

export async function loginAction(_: FormActionState, formData: FormData): Promise<FormActionState> {
  try {
    const input = loginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const res = await loginService(undefined, { payload: input });

    await Promise.all([
      setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, res.access_token),
      setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, res.refresh_token),
    ]);

    revalidatePath('/');

    return {
      status: 'SUCCESS',
      message: 'loginSuccess',
    };
  } catch (error) {
    return fromErrorToFormState(error);
  }
}

export async function logoutAction() {
  const headersList = await headers();
  const url = headersList.get('referer') || '';
  const { pathname } = new URL(url);

  await Promise.all([
    setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, '', { maxAge: 0 }),
    setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, '', { maxAge: 0 }),
  ]);

  revalidatePath(pathname);
}
