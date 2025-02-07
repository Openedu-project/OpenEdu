import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { type AuthEventName, authEvents } from '@oe/api/utils/auth';
import loginBanner from '@oe/assets/images/login-banner.png';
import { base64ToJson } from '@oe/core/utils/decoded-token';
import { AUTH_ROUTES, PLATFORM_ROUTES } from '@oe/core/utils/routes';
import type { ThemeName } from '@oe/themes/types/theme-page/index';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Link } from '#common/navigation';
import type { FileType } from '#components/uploader';
import { AuthLayout } from '../auth-layout';
import { AuthConfirmForm } from './auth-confirm-form';

interface AuthConfirmProps {
  themeName?: ThemeName;
  banner?: FileType;
}
export async function AuthConfirmPage({ banner, themeName = 'academia' }: AuthConfirmProps) {
  const tAuth = await getTranslations('auth');
  const tThemeAuth = await getTranslations(`themePage.${themeName}.auth`);
  const tGeneral = await getTranslations('general');
  const tErrors = await getTranslations('errors');
  const headersList = await headers();
  const url = headersList.get('x-url');
  const queryParams = url ? new URL(url).searchParams : null;
  const token = queryParams?.get('token');
  const event = queryParams?.get('event') as AuthEventName;
  const nextPath = queryParams?.get('next_path') ?? PLATFORM_ROUTES.homepage;

  if (!(queryParams && token && event)) {
    redirect(nextPath);
  }

  let needRedirect = false;
  const decodedToken = base64ToJson(token);

  if (event !== authEvents.setPassword) {
    try {
      const response = {
        require_set_password: false,
        email: 'test@openedu.net',
      };

      if (response.require_set_password) {
        return (
          <AuthLayout
            title={tThemeAuth('authConfirm.title')}
            banner={{
              src: banner?.url ?? loginBanner.src,
              alt: 'Auth confirmation background',
            }}
            slogan={tThemeAuth('authConfirm.slogan')}
          >
            <>
              <p className="text-muted-foreground text-sm">{tAuth('authConfirm.setPasswordDescription')}</p>
              <AuthConfirmForm
                event={event}
                token={decodedToken.token}
                email={decodedToken.email}
                nextPath={nextPath}
              />
            </>
          </AuthLayout>
        );
      }
      const me = await getMeServiceWithoutError();
      if (me?.email === response.email) {
        needRedirect = true;
      } else {
        return (
          <AuthLayout
            title={tThemeAuth('authConfirm.title')}
            banner={{
              src: banner?.url ?? loginBanner.src,
              alt: 'Auth confirmation background',
            }}
            slogan={tThemeAuth('authConfirm.slogan')}
          >
            <div className="flex flex-col gap-y-4">
              <p className="text-muted-foreground text-sm">{tAuth('authConfirm.confirmDescriptionWithoutLogin')}</p>
              <div className="flex gap-x-2">
                <Link href={`${AUTH_ROUTES.login}?next_path=${nextPath}`} variant="default" replace className="w-full">
                  {tAuth('authConfirm.gotoLogin')}
                </Link>
                <Link href={PLATFORM_ROUTES.homepage} variant="outline" replace className="w-full">
                  {tGeneral('backToHomepage')}
                </Link>
              </div>
            </div>
          </AuthLayout>
        );
      }
    } catch (error) {
      return (
        <AuthLayout
          title={tAuth('authConfirm.failedTitle')}
          banner={{
            src: banner?.url ?? loginBanner.src,
            alt: 'Auth confirmation background',
          }}
          slogan={tThemeAuth('authConfirm.slogan')}
          className="text-destructive"
        >
          <div className="flex flex-col gap-y-4">
            <p className="text-destructive text-sm">{tErrors((error as Error).message)}</p>
            <Link href={PLATFORM_ROUTES.homepage} variant="destructive" replace>
              {tGeneral('backToHomepage')}
            </Link>
          </div>
        </AuthLayout>
      );
    }
  }

  if (needRedirect) {
    redirect(nextPath);
  }

  return (
    <AuthLayout
      title={tAuth('authConfirm.setPasswordTitle')}
      banner={{
        src: banner?.url ?? loginBanner.src,
        alt: 'Auth confirmation background',
      }}
      slogan={tThemeAuth('authConfirm.slogan')}
    >
      <AuthConfirmForm event={event} token={decodedToken.token} email={decodedToken.email} nextPath={nextPath} />
    </AuthLayout>
  );
}
