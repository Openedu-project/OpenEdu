import signupBanner from '@oe/assets/images/signup-banner.png';
import { useTranslations } from 'next-intl';
import type { FileType } from '#components/uploader';
import { AuthLayout } from '../auth-layout';
import { SignUpForm } from './signup-form';

interface SignUpPageProps {
  themeName?: string;
  banner?: FileType;
}

export function SignUpPage({ themeName = 'academia', banner }: SignUpPageProps) {
  const tAuth = useTranslations(`themePage.${themeName}.auth`);

  return (
    <AuthLayout
      title={tAuth('signup.title')}
      seperateText={tAuth('signup.seperate')}
      banner={{
        src: banner?.url || signupBanner.src,
        alt: 'Signup background',
      }}
      slogan={tAuth('signup.slogan')}
    >
      <SignUpForm tLoginTitle={tAuth('login.title')} tSignupTitle={tAuth('signup.title')} />
    </AuthLayout>
  );
}
