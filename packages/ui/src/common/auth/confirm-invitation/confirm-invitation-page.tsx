import loginBanner from '@oe/assets/images/login-banner.png';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { AuthLayout } from '../auth-layout';
import { ConfirmInvitationForm } from './confirm-invitation-form';

export async function ConfirmInvitationPage() {
  const tAuth = await getTranslations('auth');
  const headersList = await headers();
  const url = headersList.get('x-url');
  console.info('----------------------url---------------------', url);

  return (
    <AuthLayout
      title={tAuth('confirmInvitation.title')}
      banner={{ src: loginBanner.src, alt: 'Set password background' }}
      slogan={tAuth('confirmInvitation.slogan')}
    >
      <ConfirmInvitationForm />
    </AuthLayout>
  );
}
