import loginBanner from '@oe/assets/images/login-banner.png';
import { Image } from '@oe/ui/components/image';
import { useTranslations } from 'next-intl';
import ForgotPasswordForm from './forgot-password-form';

export default function SignUp() {
  const t = useTranslations('forgotPassword');

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex w-full flex-col items-center bg-[#F2F1FF] p-[30px] md:p-[60px] lg:w-1/2 lg:p-[120px]">
        <div className="w-full max-w-md">
          <div className="block">
            <h1 className="giant-iheading-semibold20 mb-6 text-primary">{t('title')}</h1>
            <ForgotPasswordForm />
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
