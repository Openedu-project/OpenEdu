import forgotPasswordBanner from '@oe/assets/images/forgot-password-banner.png';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../auth-layout';
import { LoginForm } from './forgot-password-form';

export function ForgotPasswordPage() {
  const tAuth = useTranslations('auth');

  return (
    <AuthLayout
      title={tAuth('forgotPassword.title')}
      banner={{ src: forgotPasswordBanner.src, alt: 'Forgot password background' }}
      slogan={tAuth('forgotPassword.slogan')}
    >
      <LoginForm />
    </AuthLayout>
  );
}
