'use client';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { type LoginSchemaType, loginSchema } from '@oe/api/schemas/authSchema';
import type { HTTPError } from '@oe/api/utils/http-error';
import { AUTH_ROUTES, PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { InputPassword } from '@oe/ui/components/input-password';
import { Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Link } from '#common/navigation';
import { FormWrapper } from '#components/form-wrapper';
import { Alert, AlertDescription } from '#shadcn/alert';
import { Button } from '#shadcn/button';
import { loginAction } from '../_action/login-action';

export function LoginForm() {
  const tAuth = useTranslations('auth');
  const tErrors = useTranslations('errors');
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/';
  const loginError = searchParams.get('error');
  const [error, setError] = useState<string | null>(null);

  console.log('loginError', loginError);

  const handleError = useCallback((error: unknown) => {
    setError((error as HTTPError).message);
  }, []);

  const handleSubmit = useCallback(
    async (values: LoginSchemaType) => {
      await loginAction({ ...values, next_path: nextPath });
      toast.success(tAuth('signin.success'));
      router.replace(nextPath);
    },
    [tAuth, router.replace, nextPath]
  );

  return (
    <FormWrapper id="login" schema={loginSchema} onError={handleError} onSubmit={handleSubmit}>
      {({ loading }) => (
        <>
          <FormFieldWithLabel label={tAuth('email')} name="email">
            <Input
              type="email"
              placeholder={tAuth('emailPlaceholder')}
              autoComplete="email"
              prefixIcon={<Mail className="h-4 w-4" />}
            />
          </FormFieldWithLabel>
          <FormFieldWithLabel label={tAuth('password')} name="password">
            <InputPassword placeholder={tAuth('passwordPlaceholder')} />
          </FormFieldWithLabel>
          <Link href={`${AUTH_ROUTES.forgotPassword}?next=${nextPath}`} className="m-0 h-auto w-full justify-end p-0">
            {tAuth('forgotPassword.title')}
          </Link>
          {error || loginError ? (
            <Alert variant="destructive">
              <AlertDescription>{loginError ? tErrors(loginError) : tErrors(error)}</AlertDescription>
            </Alert>
          ) : null}
          <Button type="submit" className="w-full" loading={loading}>
            {tAuth('signin.title')}
          </Button>
          <div className="text-center text-muted-foreground text-sm">
            {tAuth('signin.terms')}
            <Link href={PLATFORM_ROUTES.terms} className="ml-1 h-auto p-0 font-medium">
              {tAuth('termsAndConditions')}
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm">{tAuth('signin.noAccount')}</p>
            <Link href={`${AUTH_ROUTES.signUp}?next=${nextPath}`} className="ml-1 h-auto p-0 font-medium">
              {tAuth('signup.title')}
            </Link>
          </div>
        </>
      )}
    </FormWrapper>
  );
}
