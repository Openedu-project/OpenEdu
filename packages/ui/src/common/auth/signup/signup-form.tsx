'use client';

import { type SignUpSchemaType, signUpSchema } from '@oe/api/schemas/authSchema';
import { signUpService } from '@oe/api/services/auth';
import { authEvents } from '@oe/api/utils/auth';
import type { HTTPError } from '@oe/api/utils/http-error';
import { AUTH_ROUTES, PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { InputPassword } from '@oe/ui/components/input-password';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { MailIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useState } from 'react';
import { SuccessDialog } from '#components/dialog';
import { FormWrapper } from '#components/form-wrapper';
import { Alert, AlertDescription } from '#shadcn/alert';
import { ResendButton } from '../resend-button';

interface SignUpFormProps {
  tLoginTitle: string;
  tSignupTitle: string;
}

export default function SignUpForm({ tLoginTitle, tSignupTitle }: SignUpFormProps) {
  const tAuth = useTranslations('auth');
  const tErrors = useTranslations('errors');
  const tGeneral = useTranslations('general');
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/';
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [resendEmailError, setResendEmailError] = useState<string | null>(null);

  const handleError = useCallback((error: unknown) => {
    setError((error as HTTPError).message);
  }, []);

  const onSubmit = useCallback(
    async (values: SignUpSchemaType) => {
      await signUpService(undefined, {
        payload: { ...values, next_path: nextPath, isAgree: true },
      });
      setOpen(true);
      setEmail(values.email);
    },
    [nextPath]
  );

  const handleResendEmailError = useCallback((error: HTTPError) => {
    setResendEmailError(error.message);
  }, []);

  return (
    <>
      <FormWrapper id="signup-form" schema={signUpSchema} onSubmit={onSubmit} onError={handleError}>
        {({ loading }) => (
          <>
            <FormFieldWithLabel label={tAuth('signup.displayName')} name="display_name">
              <Input
                placeholder={tAuth('signup.displayNamePlaceholder')}
                prefixIcon={<UserIcon className="size-4" />}
              />
            </FormFieldWithLabel>
            <FormFieldWithLabel label={tAuth('email')} name="email">
              <Input
                placeholder={tAuth('emailPlaceholder')}
                type="email"
                prefixIcon={<MailIcon className="size-4" />}
              />
            </FormFieldWithLabel>
            <FormFieldWithLabel label={tAuth('password')} name="password">
              <InputPassword placeholder={tAuth('passwordPlaceholder')} />
            </FormFieldWithLabel>
            <FormFieldWithLabel label={tAuth('confirmPassword')} name="confirmPassword">
              <InputPassword placeholder={tAuth('confirmPasswordPlaceholder')} autoComplete="confirmPassword" />
            </FormFieldWithLabel>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{tErrors(error)}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" loading={loading}>
              {tSignupTitle}
            </Button>
            <div className="text-center text-muted-foreground text-sm">
              {tAuth('signup.terms')}
              <Link href={PLATFORM_ROUTES.terms} className="ml-1 h-auto p-0 font-medium">
                {tAuth('termsAndConditions')}
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm">{tAuth('signup.noAccount')}</p>
              <Link href={`${AUTH_ROUTES.login}?next=${nextPath}`} className="ml-1 h-auto p-0 font-medium">
                {tLoginTitle}
              </Link>
            </div>
          </>
        )}
      </FormWrapper>

      <SuccessDialog
        title={tAuth('signup.successVerification')}
        description={tAuth('signup.verification')}
        open={open}
        setOpen={setOpen}
        renderActions={
          <div className="flex flex-col gap-2">
            {resendEmailError && (
              <Alert variant="destructive">
                <AlertDescription>{tErrors(resendEmailError)}</AlertDescription>
              </Alert>
            )}
            <div className="flex w-full justify-center gap-2">
              <ResendButton event={authEvents.register} email={email} onError={handleResendEmailError} />
              <Link href={PLATFORM_ROUTES.homepage} variant="outline">
                {tGeneral('backToHomepage')}
              </Link>
            </div>
          </div>
        }
      />
    </>
  );
}
