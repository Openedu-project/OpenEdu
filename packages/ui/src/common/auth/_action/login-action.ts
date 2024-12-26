'use server';
import type { LoginSchemaType } from '@oe/api/schemas/authSchema';
import { loginService } from '@oe/api/services/auth';
import { setCookie } from '@oe/core/utils/cookie';

export async function loginAction({ email, password }: LoginSchemaType) {
  const res = await loginService(undefined, { payload: { email, password } });

  await Promise.all([
    setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, res.access_token),
    setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, res.refresh_token),
  ]);

  // revalidatePath('/');

  //   return {
  //     status: 'SUCCESS',
  //     message: 'loginSuccess',
  //   };
  // } catch (error) {
  //   return fromErrorToFormState(error);
  // }
}
