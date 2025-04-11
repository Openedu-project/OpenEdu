import forgotPasswordBanner from '@oe/assets/images/forgot-password-banner.png';
import { useTranslations } from 'next-intl';
import type { FileType } from '#components/uploader';
import { AuthLayout } from '../auth-layout';
import { ForgotPasswordForm } from './forgot-password-form';

interface ForgotPasswordProps {
  themeName?: string;
  banner?: FileType;
}
export function ForgotPasswordPage({ themeName = 'academia', banner }: ForgotPasswordProps) {
  const tAuth = useTranslations(`themePage.${themeName}.auth`);

  return (
    <AuthLayout
      title={tAuth('forgotPassword.title')}
      banner={{
        src: banner?.url || forgotPasswordBanner.src,
        alt: 'Forgot password background',
      }}
      slogan={tAuth('forgotPassword.slogan')}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
