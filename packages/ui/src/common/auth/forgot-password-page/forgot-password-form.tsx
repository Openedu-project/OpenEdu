'use client';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';

import type { HTTPError } from '@oe/api';
import { forgotPasswordService } from '@oe/api';
import { type ForgotPasswordSchemaType, forgotPasswordSchema } from '@oe/api';
import { PLATFORM_ROUTES } from '@oe/core';
import { Mail } from 'lucide-react';
import { Link } from '#common/navigation';
import { FormWrapper } from '#components/form-wrapper';
import { Alert, AlertDescription } from '#shadcn/alert';
import { ForgotPasswordButton } from './forgot-password-button';

export function ForgotPasswordForm() {
  const tAuth = useTranslations('auth');
  const tErrors = useTranslations('errors');
  const tGeneral = useTranslations('general');
  const [error, setError] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState<string>('');

  const handleError = useCallback((error: unknown) => {
    setError((error as HTTPError).message);
  }, []);

  const handleSubmit = useCallback(async (values: ForgotPasswordSchemaType) => {
    await forgotPasswordService(undefined, {
      payload: { email: values.email },
    });
    setSentEmail(values.email);
  }, []);

  const handleResendEmailError = useCallback((error: HTTPError) => {
    setError(error.message);
  }, []);

  return (
    <>
      <FormWrapper id="forgot-password" schema={forgotPasswordSchema} onError={handleError} onSubmit={handleSubmit}>
        {({ loading, form }) => (
          <>
            <FormFieldWithLabel label={tAuth('email')} name="email">
              <Input
                type="email"
                placeholder={tAuth('emailPlaceholder')}
                autoComplete="email"
                prefixIcon={<Mail className="h-4 w-4" />}
              />
            </FormFieldWithLabel>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{tErrors(error)}</AlertDescription>
              </Alert>
            )}
            <div className="flex w-full justify-center gap-2">
              <ForgotPasswordButton
                sentEmail={sentEmail}
                handleResendEmailError={handleResendEmailError}
                loading={loading}
                form={form}
              />
              <Link href={PLATFORM_ROUTES.homepage} variant="outline">
                {tGeneral('backToHomepage')}
              </Link>
            </div>
          </>
        )}
      </FormWrapper>
    </>
  );
}
