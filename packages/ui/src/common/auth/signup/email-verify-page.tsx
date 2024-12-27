import { verifyEmailService } from '@oe/api/services/auth';
import loginBanner from '@oe/assets/images/login-banner.png';
import { base64ToJson } from '@oe/core/utils/decoded-token';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cn } from '#utils/cn';
import { AuthLayout } from '../auth-layout';
import { EmailVerifyActions } from './email-verify-actions';

export const dynamic = 'force-static';

export async function EmailVerifyPage({ banner, slogan }: { banner?: { src: string; alt: string }; slogan?: string }) {
  const tAuth = await getTranslations('auth');
  const tErrors = await getTranslations('errors');
  const headersList = await headers();
  const url = headersList.get('x-url');
  const queryParams = url ? new URL(url).searchParams : null;
  const token = queryParams?.get('token');
  const nextPath = queryParams?.get('next_path') || PLATFORM_ROUTES.homepage;

  if (!token) {
    redirect(PLATFORM_ROUTES.homepage);
  }

  let title = '';
  let description = '';
  let isError = false;
  let accessToken = '';
  let refreshToken = '';

  try {
    const decodedToken = base64ToJson(token);
    const response = await verifyEmailService(undefined, {
      token: decodedToken.token,
      init: { cache: 'force-cache' },
    });

    isError = false;
    accessToken = response.access_token;
    refreshToken = response.refresh_token;

    title = tAuth('verifyEmail.successTitle');
    description = tAuth('verifyEmail.successDescription');
  } catch (error) {
    title = tAuth('verifyEmail.failedTitle');
    description = tErrors((error as Error).message);
    isError = true;
  }

  return (
    <AuthLayout
      banner={banner ?? { src: loginBanner.src, alt: 'verify email background' }}
      slogan={slogan ?? tAuth('verifyEmail.slogan')}
      className={cn(isError ? 'text-destructive' : '')}
    >
      <div className="flex flex-col gap-y-4">
        {title && <h3 className={cn('giant-iheading-semibold20', isError ? 'text-destructive' : '')}>{title}</h3>}
        <p className={cn('text-muted-foreground text-sm', isError ? 'text-destructive' : '')}>{description}</p>
        <EmailVerifyActions
          isError={isError}
          nextPath={nextPath}
          accessToken={accessToken}
          refreshToken={refreshToken}
        />
      </div>
    </AuthLayout>
  );
}
