import HeroBanner from '@oe/assets/images/openedu-homepage/hero-banner/hero-banner.png';
import LogoOpenEdu from '@oe/assets/images/openedu-homepage/hero-banner/logo-openedu-blue.png';
import WhaleWelcome from '@oe/assets/images/openedu-homepage/hero-banner/whale-welcome.png';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import { Button } from '@oe/ui/shadcn/button';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import PartnerSection from './partners';

// Mark as server component
export default async function HeroSection() {
  // Move this to server-side
  const t = await getTranslations('homePageLayout.heroBannerSection');

  return (
    <section className="container mx-auto px-0 py-5 pt-3 pb-10 md:px-4 lg:py-10 lg:pt-5 lg:pb-20">
      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <div className="relative w-full lg:w-1/2">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#B8F4F8] from-[6.18%] to-[#EDE3FE] to-[70.53%] opacity-50 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6">
              <div className="flex w-[90px] items-center justify-center">
                <Image src={WhaleWelcome.src} alt={t('whale.alt')} width={81} height={90} className="object-contain" />
              </div>
              <div className="mt-6 flex max-w-[210px]">
                <Image src={LogoOpenEdu.src} alt={t('logo.alt')} width={280} height={42} className="object-contain" />
              </div>
            </div>

            <h1 className="mb-4 flex items-center gap-2">
              <span className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 text-primary">
                {t('tagline.learning')}
              </span>
              <span className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32">.</span>
              <span className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 text-[#09BEC9]">
                {t('tagline.sharing')}
              </span>
              <span className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32">.</span>
              <span className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 text-[#FD68F2]">
                {t('tagline.growing')}
              </span>
              <span className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32">.</span>
            </h1>

            <div className="mb-8 max-w-xl">
              <h2 className="mcaption-regular16 lg:mcaption-regular24">{t('description')}</h2>
            </div>
            <Link href={PLATFORM_ROUTES.courses} className="mb-8 p-0">
              <Button>{t('cta.button')}</Button>
            </Link>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2">
          <div className="relative mx-auto w-full max-w-[550px]">
            <Image
              src={HeroBanner.src}
              alt={t('hero.banner.alt')}
              width={554}
              height={582}
              priority
              className="relative z-10 object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"
            />
          </div>
        </div>
      </div>

      <Suspense>
        <PartnerSection />
      </Suspense>
    </section>
  );
}
