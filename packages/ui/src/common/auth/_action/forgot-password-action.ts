'use server';
import type { ForgotPasswordSchemaType } from '@oe/api/schemas/authSchema';
import { forgotPasswordService } from '@oe/api/services/auth';

export async function forgotPasswordAction({ email }: ForgotPasswordSchemaType) {
  await forgotPasswordService(undefined, { payload: { email } });

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
