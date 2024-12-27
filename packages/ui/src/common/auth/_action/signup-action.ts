'use server';
// import { setCookie } from '@oe/core/utils/cookie';
import type { SignUpSchemaType } from '@oe/api/schemas/authSchema';
import { signUpService } from '@oe/api/services/auth';

export async function signUpAction({ display_name, email, password, confirmPassword, next_path }: SignUpSchemaType) {
  await signUpService(undefined, {
    payload: { display_name, email, password, confirmPassword, isAgree: true, next_path },
  });

  // await Promise.all([
  //   setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, res.access_token),
  //   setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, res.refresh_token),
  // ]);

  // revalidatePath('/');

  //   return {
  //     status: 'SUCCESS',
  //     message: 'loginSuccess',
  //   };
  // } catch (error) {
  //   return fromErrorToFormState(error);
  // }
}
