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
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: unknown) => {
    setError((error as HTTPError).message);
  }, []);

  const handleSubmit = useCallback(
    async (values: LoginSchemaType) => {
      await loginAction(values);
      toast.success(tAuth('signin.success'));
      router.replace(searchParams.get('next') ?? '/');
    },
    [tAuth, router.replace, searchParams.get]
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
          <Link href={AUTH_ROUTES.forgotPassword} className="m-0 h-auto w-full justify-end p-0">
            {tAuth('forgotPassword.title')}
          </Link>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{tErrors(error)}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" loading={loading}>
            {tAuth('login')}
          </Button>
          <div className="text-center text-muted-foreground text-sm">
            {tAuth('signin.terms')}
            <Link href={PLATFORM_ROUTES.terms} className="ml-1 h-auto p-0 font-medium">
              {tAuth('termsAndConditions')}
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm">{tAuth('signin.noAccount')}</p>
            <Link href={AUTH_ROUTES.signUp} className="ml-1 h-auto p-0 font-medium">
              {tAuth('signup.title')}
            </Link>
          </div>
        </>
      )}
    </FormWrapper>
  );
}
