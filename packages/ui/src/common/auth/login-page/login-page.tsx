import loginBanner from '@oe/assets/images/login-banner.png';
import { useTranslations } from 'next-intl';
import type { FileType } from '#components/uploader';
import { AuthLayout } from '../auth-layout';
import { LoginForm } from './login-form';

interface LoginPageProps {
  themeName?: string;
  banner?: FileType;
}

export function LoginPage({ themeName = 'academia', banner }: LoginPageProps) {
  const tAuth = useTranslations(`themePage.${themeName}.auth`);

  return (
    <AuthLayout
      title={tAuth('login.title')}
      seperateText={tAuth('login.seperate')}
      banner={{ src: banner?.url || loginBanner.src, alt: 'Login background' }}
      slogan={tAuth('login.slogan')}
    >
      <LoginForm
        tLoginTitle={tAuth('login.title')}
        tSignupTitle={tAuth('signup.title')}
        tForgotpasswordTitle={tAuth('forgotPassword.title')}
      />
    </AuthLayout>
  );
}
