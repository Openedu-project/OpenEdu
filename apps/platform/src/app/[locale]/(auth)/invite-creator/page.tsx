import loginBanner from '@oe/assets/images/login-banner.png';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

import { Image } from '@oe/ui/components/image';
import AuthCard from '../_components/auth-card';
import AcceptInvitationContent from './_component/accept-invitation-content';

export const metadata: Metadata = {
  title: 'Become a Creator | Start Your Creative Journey',
};

export default function AcceptInvitation() {
  const t = useTranslations('acceptCreatorInvite');

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex w-full flex-col items-center bg-[#F2F1FF] p-[30px] md:p-[60px] lg:w-1/2 lg:p-[120px]">
        <div className="w-full max-w-md">
          <div className="block">
            <AuthCard title={t('title')}>
              <AcceptInvitationContent />
            </AuthCard>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center lg:h-svh lg:w-1/2">
        <div className="mb-4 w-[359px]">
          <Image src={loginBanner.src} alt="Login background" objectFit="contain" priority height={363} width={359} />
        </div>
        <h3 className="giant-iheading-bold24 lg:giant-iheading-bold40 max-w-[80%] text-center text-primary">
          {t('slogan')}
        </h3>
      </div>
    </div>
  );
}
