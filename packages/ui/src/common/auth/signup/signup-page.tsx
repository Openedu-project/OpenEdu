import SignUpForm from './signup-form';

import signupBanner from '@oe/assets/images/signup-banner.png';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../auth-layout';

export function SignUpPage({ banner, slogan }: { banner?: { src: string; alt: string }; slogan?: string }) {
  const tAuth = useTranslations('auth');

  return (
    <AuthLayout
      title={tAuth('signup.title')}
      seperateText={tAuth('signup.seperate')}
      banner={banner ?? { src: signupBanner.src, alt: 'Signup background' }}
      slogan={slogan ?? tAuth('signup.slogan')}
    >
      <SignUpForm />
    </AuthLayout>
  );
}
