import SignUpForm from './signup-form';

import loginBanner from '@oe/assets/images/login-banner.png';
import { Image } from '@oe/ui/components/image';
import { useTranslations } from 'next-intl';
import AuthSocial from '../_components/auth-social';

export default function SignUp() {
  const tAuth = useTranslations('auth');

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col items-center bg-[#F2F1FF] p-[30px] md:p-[60px] lg:w-1/2 lg:p-[120px]">
        <div className="w-full max-w-md">
          <div className="block">
            <h1 className="giant-iheading-semibold20 mb-6 text-primary">{tAuth('signUp')}</h1>
            <SignUpForm />
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-gray-300 border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="mcaption-regular16 bg-[#F2F1FF] px-6 text-[#5D5A6F]">{tAuth('loginSeperate')}</span>
              </div>
            </div>
            <AuthSocial />
          </div>
        </div>
      </div>
      <div className="relative hidden flex-col items-center justify-center lg:flex lg:h-svh lg:w-1/2">
        <div className="mb-4 w-[359px]">
          <Image src={loginBanner.src} alt="Login background" objectFit="contain" priority height={363} width={359} />
        </div>
        <h3 className="giant-iheading-bold40 max-w-[80%] text-center text-primary">{tAuth('slogan')}</h3>
      </div>
    </div>
  );
}
