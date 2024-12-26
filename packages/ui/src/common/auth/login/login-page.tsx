import loginBanner from '@oe/assets/images/login-banner.png';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../auth-layout';
import { LoginForm } from './login-form';

export function LoginPage() {
  const tAuth = useTranslations('auth');

  return (
    <AuthLayout
      title={tAuth('signin.title')}
      seperateText={tAuth('signin.seperate')}
      banner={{ src: loginBanner.src, alt: 'Login background' }}
      slogan={tAuth('signin.slogan')}
    >
      <LoginForm />
    </AuthLayout>
  );
}
