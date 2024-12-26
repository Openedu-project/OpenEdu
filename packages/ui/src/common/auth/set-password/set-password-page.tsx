import loginBanner from '@oe/assets/images/login-banner.png';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../auth-layout';
import { SetPasswordForm } from './set-password-form';

export function SetPasswordPage() {
  const tAuth = useTranslations('auth');

  return (
    <AuthLayout
      title={tAuth('setPassword.title')}
      banner={{ src: loginBanner.src, alt: 'Set password background' }}
      slogan={tAuth('setPassword.slogan')}
    >
      <SetPasswordForm />
    </AuthLayout>
  );
}
