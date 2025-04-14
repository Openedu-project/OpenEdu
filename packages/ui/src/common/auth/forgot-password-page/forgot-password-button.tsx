import type { HTTPError } from '@oe/api';
import type { z } from '@oe/api';
import type { forgotPasswordSchema } from '@oe/api';
import { authEvents } from '@oe/api';
import { useTranslations } from 'next-intl';
import { type UseFormReturn, useWatch } from 'react-hook-form';
import { Button } from '#shadcn/button';
import { ResendButton } from '../resend-button';

export function ForgotPasswordButton({
  sentEmail,
  handleResendEmailError,
  loading,
  form,
}: {
  sentEmail: string;
  handleResendEmailError: (error: HTTPError) => void;
  loading: boolean;
  form: UseFormReturn<z.infer<typeof forgotPasswordSchema>>;
}) {
  const tAuth = useTranslations('auth');
  const email = useWatch({ name: 'email', control: form.control });

  return sentEmail && email && sentEmail === email ? (
    <ResendButton event={authEvents.resetPassword} email={email} onError={handleResendEmailError} />
  ) : (
    <Button type="submit" className="w-full" loading={loading}>
      {tAuth('forgotPassword.sendEmail')}
    </Button>
  );
}
