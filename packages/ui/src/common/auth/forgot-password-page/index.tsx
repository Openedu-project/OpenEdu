import forgotPasswordBanner from '@oe/assets/images/forgot-password-banner.png';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../auth-layout';
import { LoginForm } from './forgot-password-form';

export function ForgotPasswordPage({ banner, slogan }: { banner?: { src: string; alt: string }; slogan?: string }) {
  const tAuth = useTranslations('auth');

  return (
    <AuthLayout
      title={tAuth('forgotPassword.title')}
      banner={banner ?? { src: forgotPasswordBanner.src, alt: 'Forgot password background' }}
      slogan={slogan ?? tAuth('forgotPassword.slogan')}
    >
      <LoginForm />
    </AuthLayout>
  );
}
