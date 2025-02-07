'use server';
import type { LoginSchemaType } from '@oe/api/schemas/authSchema';
import { loginService } from '@oe/api/services/auth';
import { setCookie } from '@oe/core/utils/cookie';
import { revalidatePath } from 'next/cache';

export async function loginAction({ email, password, next_path }: LoginSchemaType) {
  const res = await loginService(undefined, { payload: { email, password, next_path } });

  await Promise.all([
    setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, res.access_token),
    setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, res.refresh_token),
  ]);

  revalidatePath('/', 'layout');
}
