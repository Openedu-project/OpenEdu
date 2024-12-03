import { verifyEmailService } from '@oe/api/services/auth';
import loginBanner from '@oe/assets/images/login-banner.png';
import { base64ToJson } from '@oe/core/utils/decoded-token';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import type { ThemeName } from '@oe/themes/types/theme-page';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { FileType } from '#components/uploader';
import { cn } from '#utils/cn';
import { AuthLayout } from '../auth-layout';
import { EmailVerifyActions } from './email-verify-actions';

export const dynamic = 'force-static';

interface EmailVerifyProps {
  themeName?: ThemeName;
  banner?: FileType;
}

export async function EmailVerifyPage({ themeName, banner }: EmailVerifyProps) {
  const tThemeAuth = await getTranslations(`themePage.${themeName}.auth`);

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

    title = tAuth('emailVerify.successTitle');
    description = tAuth('emailVerify.successDescription');
  } catch (error) {
    title = tAuth('emailVerify.failedTitle');
    description = tErrors((error as Error).message);
    isError = true;
  }

  return (
    <AuthLayout
      banner={{ src: banner?.url ?? loginBanner.src, alt: 'verify email background' }}
      slogan={tThemeAuth('emailVerify.slogan')}
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
