import { useTranslations } from 'next-intl';

import loginBanner from '@oe/assets/images/login-banner.png';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import { cn } from '@oe/ui/utils/cn';
import type { Metadata } from 'next';
import AuthCard from '../_components/auth-card';
import ResendButton from '../_components/resend-button';

export const metadata: Metadata = {
  title: 'Forgot Password Successfull',
};
export default function ForgotPasswordSuccessfull() {
  const t = useTranslations('forgotPasswordSuccess');
  const tAuth = useTranslations('auth');

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex w-full flex-col items-center bg-[#F2F1FF] p-[30px] md:p-[60px] lg:w-1/2 lg:p-[120px]">
        <div className="w-full max-w-md">
          <div className="block">
            <AuthCard title={t('title')}>
              <div className="flex flex-col">
                <p>{t('successDesc')}</p>
                <div className={cn('flex gap-[20px] py-5 align-center ')}>
                  <ResendButton event="RESET_PASSWORD" />
                  <Link className="flex items-center" href={PLATFORM_ROUTES.homepage}>
                    {t('backToHome')}
                  </Link>
                </div>
              </div>
            </AuthCard>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center lg:h-svh lg:w-1/2">
        <div className="mb-4 w-[359px]">
          <Image src={loginBanner.src} alt="Login background" objectFit="contain" priority height={363} width={359} />
        </div>
        <h3 className="giant-iheading-bold24 lg:giant-iheading-bold40 max-w-[80%] text-center text-primary">
          {tAuth('slogan')}
        </h3>
      </div>
    </div>
  );
}
