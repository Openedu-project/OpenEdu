import loginBanner from '@oe/assets/images/login-banner.png';
import type { ThemeName } from '@oe/themes/types';
import type { FileType } from '@oe/ui/components/uploader';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../auth-layout';
import { LoginForm } from './login-form';

interface LoginPageProps {
  themeName?: ThemeName;
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
