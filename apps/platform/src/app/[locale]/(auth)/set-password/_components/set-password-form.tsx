'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ILoginPayload } from '@oe/api/types/auth';
import type { ISetPasswordPayload } from '@oe/api/types/set-password';
import { setCookie } from '@oe/core/utils/cookie';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { SendHorizonal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useResetPassword, useSetPassword } from '@oe/api/hooks/useAuth';
import { type SetPasswordSchemaType, setPasswordSchema } from '@oe/api/schemas/authSchema';
import { loginService } from '@oe/api/services/auth';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { decodedToken } from '@oe/core/utils/decoded-token';
import { InputPassword } from '@oe/ui/components/input-password';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from 'sonner';

// const getPageType = (url: string): 'admin' | 'creator' | 'homepage' => {
//   try {
//     const path = new URL(url).pathname;

//     return path.endsWith('admin') ? 'admin' : path.endsWith('creator') ? 'creator' : 'homepage';
//   } catch {
//     return 'homepage';
//   }
// };

export default function SetPasswordForm() {
  const t = useTranslations('setPassword');
  const tError = useTranslations('errors');
  const router = useRouter();
  const form = useForm<SetPasswordSchemaType>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });
  const [isLoading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const { triggerResetPassword } = useResetPassword();
  const { triggerSetPassword } = useSetPassword();

  useEffect(() => {
    // void logOut();
    // deleteCookie(ACCESS_TOKEN_KEY, { sameSite: 'lax', domain: COOKIE_BASE_URL, path: '/' });
    // deleteCookie(REFRESH_TOKEN_KEY, { sameSite: 'lax', domain: COOKIE_BASE_URL, path: '/' });
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // TODO
  // const loginFunc = async (email: string, password: string, redirectUrl: string) => {
  const loginFunc = async (email: string, password: string) => {
    try {
      const payload: ILoginPayload = {
        email,
        password,
      };

      const res = await loginService(undefined, { payload });

      await Promise.all([
        setCookie(process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_KEY, res.access_token),
        setCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY, res.refresh_token),
      ]);

      // const redirectPage = getPageType(redirectUrl);
      // const routeKey = redirectPage as keyof WebRoutesType;

      // router.prefetch(webRoutes?.[routeKey]);
      // router.replace(webRoutes?.[routeKey]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      return error;
    }
  };

  const onSubmit = async (data: SetPasswordSchemaType) => {
    setLoading(true);
    const paramsToken = decodedToken(searchParams.get('token') as string);
    const isNewUser = searchParams.get('new_user');
    // TODO
    // const redirectUrl = searchParams.get('redirect_url');
    const { password } = data;
    const email = paramsToken?.email ?? '';

    try {
      const newData: ISetPasswordPayload = {
        password,
        token: paramsToken?.token ?? '',
        email,
      };
      const resSetPassword = isNewUser ? await triggerSetPassword(newData) : await triggerResetPassword(newData);

      if (resSetPassword) {
        // await loginFunc(email, password, redirectUrl ?? '');
        // TODO
        await loginFunc(email, password);
      }
      // router.push(webRoutes.setPasswordSuccess);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);

      return error;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>{t('password')}</FormLabel>
                <div className="relative space-y-1">
                  <FormControl>
                    <InputPassword className="!mt-0 h-14 py-4 pr-4 pl-12" placeholder={t('password')} {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>{t('confirmPassword')}</FormLabel>
                <div className="relative space-y-1">
                  <FormControl>
                    <InputPassword
                      className="!mt-0 h-14 py-4 pr-4 pl-12"
                      placeholder={t('confirmPassword')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button variant="default" className="mt-[32px]" type="submit" loading={isLoading}>
            <SendHorizonal className="mr-[12px]" />
            {t('submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
