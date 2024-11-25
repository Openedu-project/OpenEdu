// import authBanner from '@oe/assets/svg/auth-banner';

// import { OpenEduAuthBanner } from '@oe/assets/icons/openedu-auth-banner';
import { OpenEduLoginLogo } from '@oe/assets/icons/openedu-login-logo';
import authBanner from '@oe/assets/images/auth-banner.png';
import { Image } from '@oe/ui/components/image';

import type { ReactNode } from 'react';

import { useTranslations } from 'next-intl';
import AuthSocial from './_components/auth-social';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const tAuth = useTranslations('auth');

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden bg-[linear-gradient(153.69deg,#5055D7_3.65%,#4B3178_176.07%)] lg:block lg:h-svh lg:w-1/2 lg:max-w-[790px]">
        <Image src={authBanner.src} alt="Login background" objectFit="contain" priority height={1066} width={720} />
      </div>
      <div className="flex grow items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <OpenEduLoginLogo />
          </div>
          {children}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-gray-300 border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">{tAuth('loginSeperate')}</span>
              </div>
            </div>
            <AuthSocial />
          </div>
        </div>
      </div>
    </div>
  );
}
