import SignUpForm from './signup-form';

import signupBanner from '@oe/assets/images/signup-banner.png';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../auth-layout';

export function SignUpPage() {
  const tAuth = useTranslations('auth');

  return (
    <AuthLayout
      title={tAuth('signup.title')}
      seperateText={tAuth('signup.seperate')}
      banner={{ src: signupBanner.src, alt: 'Signup background' }}
      slogan={tAuth('signup.slogan')}
    >
      <SignUpForm />
    </AuthLayout>
  );
}
