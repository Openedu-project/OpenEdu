import loginBanner from '@oe/assets/images/login-banner.png';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../auth-layout';
import { EmailVerifyContent } from './email-verify-content';

export function EmailVerifyPage() {
  const tAuth = useTranslations('auth');

  return (
    <AuthLayout
      title={tAuth('verifyEmail.title')}
      banner={{ src: loginBanner.src, alt: 'verify email background' }}
      slogan={tAuth('verifyEmail.slogan')}
    >
      <EmailVerifyContent />
    </AuthLayout>
  );
}
