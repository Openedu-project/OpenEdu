import { isLogin } from '@oe/api/utils/auth';
import { getTranslations } from 'next-intl/server';
import { Link } from '#common/navigation';
import { DescText, H2Text, LaunchpadDialog } from '../components';

export async function HeroSection() {
  const [t, isLoggedIn] = await Promise.all([getTranslations('launchpadHomepage'), isLogin()]);

  return (
    <section className="-mt-10 mx-auto flex min-h-screen max-w-[840px] items-center">
      <div className="-mt-4 sm:-mt-5 md:-mt-6 mx-auto w-full rounded-3xl border-4 border-white bg-[linear-gradient(236deg,_#FFF_38.4%,_rgba(244,245,246,0.50)_97%)] px-4 py-6 backdrop-blur-[2px] sm:px-8 sm:py-8 md:w-auto md:px-[60px] md:py-[40px]">
        {/* Content */}
        <div className="flex h-full flex-col items-center justify-center gap-[40px] text-center">
          <div className="max-w-full space-y-[20px]">
            <p className="mt-2 text-sm sm:mt-3 sm:text-base md:mt-4">{t('heroSection.tagline')}</p>

            <H2Text>{t('heroSection.title')}</H2Text>

            <DescText>{t('heroSection.description')}</DescText>
            <Link href="#" className="whitespace-normal font-normal text-sm leading-tight sm:text-base md:text-xl">
              {t('heroSection.linkText')}
            </Link>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            {isLoggedIn && <LaunchpadDialog />}
            {/* <Button
              variant="outline"
              className="h-fit w-full rounded-[12px] border-primary font-semibold text-primary text-sm hover:bg-primary/10 sm:w-auto sm:px-4 sm:py-3 sm:text-base md:px-8"
            >
              Explore Our Launchpad
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
